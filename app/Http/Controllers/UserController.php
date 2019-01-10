<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Http\Requests\UserUpdateRequest;

use App\Repositories\UserRepository;
use App\Repositories\FooterRepository;
use App\Repositories\MenusRepository;
use App\Repositories\ControlRepository;
use App\Models\Page;
use App\Models\User;

class UserController extends Controller
{

    public function __construct(UserRepository $userRepository, FooterRepository $footerRepository, MenusRepository $menusRepository, ControlRepository $controlRepository)
    {
      $this->userRepository = $userRepository;
      $this->footerRepository = $footerRepository;
      $this->menusRepository = $menusRepository;
      $this->middleware('auth');
      $this->middleware('authAsAdmin');
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
        $menus = $this->menusRepository->makeAdminMenus();
        $footer = $this->footerRepository->makeFooter();
        $users = $this->userRepository->getPaginate($this->nbrPerPage);
        $links = $users->render();

        return view('common.user.index', compact('users', 'links', 'menus', 'operation', 'footer'));
    }

    /**
     * Show the form for creating the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $operation = 'create';
        $title_tag = 'Ajouter un utilisateur';
        $menus = $this->menusRepository->makeAdminMenus();
        $footer = $this->footerRepository->makeFooter();

        return view('common.auth.register', compact( 'title_tag', 'menus', 'operation', 'footer'));
    }

    public function store(UserUpdateRequest $request) {
     
     //return redirect()->action('Auth\RegisterController@register');

      $inputs = array_merge($request->except(['password']), [
        'password' => Hash::make( $request->password ),
      ]);

     User::create($inputs);

     return redirect()->route('user.index')->with('info', 'l\'utilisateur est enregistré.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $operation = 'edit';
        $menus = $this->menusRepository->makeAdminMenus();
        $footer = $this->footerRepository->makeFooter();
        $user = $this->userRepository->getById($id);
        $title_tag = 'Compte de ' . $user->name;

        return view('common.user.edit',  compact('title_tag', 'user', 'menus', 'operation', 'footer'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, $id)
    {
      if($this->userRepository->isLastAdmin($id) && $this->userRepository->roleChange($id, $request->input('role'))){
        return redirect()->route('user.index')->withError("Vous ne pouvez pas supprimer le dernier administrateur.");
      }else{
        if($request->password != null){

          $inputs = array_merge($request->except(['password']), [
            'password' => Hash::make( $request->password ),
          ]);

        }else{
          $inputs = $request->except(['password']);
        }
        $this->userRepository->update($id, $inputs);
        return redirect()->route('user.index')->withInfo("L'utilisateur " . $request->input('name') . " a été modifié.");
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      if($this->userRepository->isLastAdmin($id)){
        return redirect()->route('user.index')->withError("Vous ne pouvez pas supprimer le dernier administrateur.");
      }else{
        $this->userRepository->destroy($id);
        return redirect()->route('user.index')->withInfo("L'utilisateur est supprimé");
      }
    }
}
