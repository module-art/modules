<?php

namespace App\Http\Controllers;

use Mail;
use Auth;
use Illuminate\Http\Request;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\PageRequest;
use App\Repositories\FooterRepository;
use App\Repositories\MenusRepository;
use App\Repositories\ControlRepository;
use App\Models\Page;
use App\Models\Rubrique;
use App\Models\Bloc;
use App\Models\User;
use App\Models\Type;

class PageController extends Controller
{
  
  public function __construct(FooterRepository $footerRepository, MenusRepository $menusRepository, ControlRepository $controlRepository)
  {
    $this->footerRepository = $footerRepository;
    $this->menusRepository = $menusRepository;
    $this->middleware('authAsAdmin', ['except' => ['show', 'mailFromContact']]);
    $this->middleware('ajax', ['only' => ['switchPublication']]);
    $this->nbrPerPage = $controlRepository->nbrPerPage;
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $operation = 'index';
    $menus = MenusRepository::makeAdminMenus();
    //$pages = page::where('place', 0)->paginate($this->nbrPerPage);
    $pages = page::orderBy('place')->paginate($this->nbrPerPage);

    return view('common.back.pageIndex', compact('pages', 'menus', 'operation'));
  }

  public function show($slug)
  {
    if(Auth::check()){
      $page = Page::where('slug', $slug)->firstOrFail();
      $menus = MenusRepository::makeAdminMenus();
    }else{
      $page = Page::where('slug', $slug)->where('publie', 1)->firstOrFail();
      $menus = $this->menusRepository->makeMenus();
    }

    $footer = $this->footerRepository->makeFooter();
    $first_rubrique = $page->rubriques()->first();
    $bg_img = [ $first_rubrique->background_img_url, $first_rubrique->background_hd_url ];
    $types = Type::all();

    if(Auth::check()){
      return view('themes.'.env('APP_THEME', 'module-art').'.back.page', compact('menus', 'page', 'footer', 'bg_img','types'));
    }

    return view('themes.'.env('APP_THEME', 'module-art').'.front.page', compact('menus', 'page', 'footer', 'bg_img','types'));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create(){
    $operation = 'create';
    $menus = $this->menusRepository->makeAdminMenus();
    $model = 'page';
    return view('common.back.form', compact('menus', 'operation', 'model'));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(PageRequest $request){

    $maxplace = Page::max('place');
    //return response($maxplace);

    $inputs = array_merge($request->all(), [
      'place' => $maxplace+1,
      'slug' => str_slug($request->menu_title),
      'publie' => 0,
    ]);

    $page = Page::create($inputs);

    $default_attr = array(
      'contenu' => '<h1>' . $request->menu_title . '</h1>',
      'place' => 1,
      'cols' => 2,
      'ascendant' => 1,
      'page_id' => $page->id
    );

    Rubrique::create($default_attr);

    return redirect()->route('back_page.show', $page->slug);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id){
    $operation = 'edit';
    $page = Page::findOrFail($id);
    $menus = $this->menusRepository->makeAdminMenus();
    $model = 'page';
    return view('common.back.form', compact('menus', 'page', 'operation', 'model'));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(PageRequest $request, $id){

    $page = Page::findOrFail($id);

    $from_menu = (boolean)$page->place;
    $to_menu = (boolean)$request->place;

    //dd($request);
    //return response('from : ' . $from_menu . ' , to : ' . $to_menu);

    if($from_menu && $to_menu){

      if($page->place < $request->place){
        $places_to_move = Page::where('place', '>', $page->place)->where('place', '<=', $request->place)->get();
        //dd($places_to_move);

        foreach($places_to_move as $newplace){
          $newplace->place = $newplace->place - 1;
          $newplace->save();
        }
      }else{
        $places_to_move = Page::where('place', '>=', $request->place)->where('place', '<', $page->place)->get();
        //dd($places_to_move);

        foreach($places_to_move as $newplace){
          $newplace->place = $newplace->place + 1;
          $newplace->save();
        }
      }

    }elseif(!$from_menu && $to_menu){

      $places_to_move = Page::where('place', '>=', $request->place)->get();
      if($places_to_move){
        foreach($places_to_move as $newplace){
          $newplace->place = $newplace->place + 1;
          $newplace->save();
        }
      }

    }elseif($from_menu && !$to_menu){

      $places_to_move = Page::where('place', '>=', $page->place)->get();
      if($places_to_move){
        foreach($places_to_move as $newplace){
          $newplace->place = $newplace->place - 1;
          $newplace->save();
        }
      }
    }

    //si on veut modifier le slug à l'update
    $inputs = array_merge($request->all(), [
      'slug' => str_slug($request->menu_title),
    ]);
    //$inputs = $request->all();

    $page->update($inputs);

    return redirect()->route('back_page.show', $page->slug);
  }

  public function mailFromContact(ContactRequest $request)
  {

    $frommail = $request->email;
    $subject = $request->subject;
    $to = env('MAIL_DEST', 'sylvestre@module-art.fr');
    $is_sent = Mail::send('themes.gitedhote46.back.email_contact', $request->all(), function($message) use ($subject,$to,$frommail)
    {
      $message->from($frommail, 'module-art.fr');
      $message->to($to)->subject('Message du site : '.$subject);
    });
 
    return response()->json(['response' => 'Le message est bien envoyé.']);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request, $id)
  {
    $page = Page::findOrFail($id);

    $places_to_move = Page::where('place', '>', $page->place)->get();

    if($places_to_move){
      foreach($places_to_move as $newplace){
        $newplace->place = $newplace->place - 1;
        $newplace->save();
      } 
    } 
    
    $page->delete();

    if ($request->ajax()){
      return response('La page '.$id . ' et ce qu\'elle contient viennent d\'être effacés.' );
    }

    return redirect()->back()->withInfo('La page '.$id . ' et ce qu\'elle contient viennent d\'être effacés.');
  }

  public function switchPublication($id)
  {
    $page = Page::findOrFail($id);
    $state = $page->publie;

    if($state){
      $state = 0;
      $verbe = " n'est plus ";
    }else{
      $state = 1;
      $verbe = " est ";
    }
    
    $page->publie = $state;
    $page->save();

    return response('La page '. $page->menu_title . $verbe . 'accessible aux visiteurs.');
  }
}
