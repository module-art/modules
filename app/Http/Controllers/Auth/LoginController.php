<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Repositories\FooterRepository;
use App\Repositories\MenusRepository;
use App\Models\Page;

class LoginController extends Controller
{
  /*
  |--------------------------------------------------------------------------
  | Login Controller
  |--------------------------------------------------------------------------
  |
  | This controller handles authenticating users for the application and
  | redirecting them to your home screen. The controller uses a trait
  | to conveniently provide its functionality to your applications.
  |
  */

  use AuthenticatesUsers;

  /**
   * Where to redirect users after login.
   *
   * @var string
   */
  protected $redirectTo = '/coulisses';
  /*protected function redirectTo()
  {
    if(Auth::check()){
      //return redirect()->route('articleSalle.index', Auth::id());
      return '/coulisses/accueil/';
    }else{
      return '/accueil';
    }
  }*/

  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct(FooterRepository $footerRepository, MenusRepository $menusRepository)
  {
    $this->middleware('guest')->except('logout');
    $this->footerRepository = $footerRepository;
    $this->menusRepository = $menusRepository;
  }

  /*disable default login by email
  public function username()
  {
    return 'username';
  }*/

  public function showLoginForm(){

    //nav data
    $menus = $this->menusRepository->makeMenus();
    $footer = $this->footerRepository->makeFooter();

    return view('common.auth.login', compact('menus', 'footer'));
  }
}
