<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;
use App\Http\Requests\MailRequest;
use App\Repositories\MenusRepository;
use App\Repositories\ControlRepository;
use App\Models\MailDomain;
use App\Models\MailUser;

class MailController extends Controller
{

  public function __construct(ControlRepository $controlRepository, Request $request)
  {
    $this->middleware('auth');
    $this->middleware('authAsAdmin');
    $this->nbrPerPage = $controlRepository->nbrPerPage;
    $this->domain = MailDomain::where('name', $request->getHttpHost())->first();
    //$this->domain = MailDomain::where('name', 'lebaramots.fr')->first();
  }

  public function index(Request $request)
  {
    $operation = 'index';
    $menus = MenusRepository::makeAdminMenus();
    $domain = $this->domain;
    $failed_connexion = is_null($domain) ? true : false;
    if(!$failed_connexion){
      $mails = $domain->mailUsers()->paginate($this->nbrPerPage);
    }else{
      $mails = false;
    }
    //dd($this->nbrPerPage);

    return view('common.back.mailIndex', compact('mails', 'menus', 'operation', 'failed_connexion'));
  }

    /**
     * Show the settings for mail client.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
  public function show($id, Request $request){

    $menus = MenusRepository::makeAdminMenus();
    $mail = MailUser::findOrFail($id);
    $server_name = 'mail.'. $this->domain->name;
    $username = $mail->email;
    //dd($username);
    return view('common.back.mailSettings', compact('menus', 'username', 'server_name'));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create(Request $request){
    $operation = 'create';
    //$domain_name = $request->getHttpHost();
    $domain_name = $this->domain->name;
    $menus = MenusRepository::makeAdminMenus();
    $model = 'mail';
    return view('common.back.form', compact('menus', 'operation', 'model', 'domain_name'));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(MailRequest $request){

    $domain = $this->domain;
    $salt = substr(str_shuffle("./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), 0, 16);

    $inputs = [
      'domain_id' => $domain->id,
      'password' => crypt($request->password, '$6$'.$salt),
      'email' => $request->username . '@' . $domain->name,
    ];

    //dd($inputs);

    $mail = MailUser::create($inputs);

    return redirect()->route('mail.index');
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id){
    $operation = 'edit';
    $mail = MailUser::findOrFail($id);
    $menus = MenusRepository::makeAdminMenus();
    $model = 'mail';
    return view('common.back.form', compact('menus', 'mail', 'operation', 'model'));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(MailRequest $request, $id){

    $mail = MailUser::findOrFail($id);
    $salt = substr(str_shuffle("./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), 0, 16);
    $mail->update(['password' => crypt($request->password, '$6$'.$salt)]);
    return redirect()->route('mail.index')->withInfo('Le mot de passe est modifié.');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $mail = MailUser::findOrFail($id);
    
    $mail->delete();

    return redirect()->back()->withInfo('L\'adresse mail est supprimée');
  }
}
