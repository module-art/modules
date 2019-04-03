<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use App\Repositories\FooterRepository;
use App\Repositories\MenusRepository;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(FooterRepository $footerRepository, MenusRepository $menusRepository)
    {
        $this->middleware('guest');
    $this->footerRepository = $footerRepository;
    $this->menusRepository = $menusRepository;
    }

    public function showLinkRequestForm(){

    //nav data
    $menus = $this->menusRepository->makeMenus();
    $footer = $this->footerRepository->makeFooter();

      $token = csrf_token();
      return view('auth.passwords.reset', compact('menus', 'footer', 'token'));
    }
}
