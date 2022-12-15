<?php

namespace App\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
//use Illuminate\Support\Facades\Cookie;
use Storage;

class LogSuccessfulLogin
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
      //It's here you can add cookies on login
      //old security for responsive file manager replaces by laravel file manager
      /*$role = $event->user->role;
      if($role == 'admin' || $role == 'maintainer'){
        $theme = config('modules.theme');
        Cookie::queue('modth', $theme, 720, "", "", 0, 0);
        Cookie::queue('modus', $event->user->username, 720, "", "", 0, 0);
        $value = md5(uniqid());
        Cookie::queue('fmk', $value, 720, "", "", 0, 0);
        Storage::put($event->user->username.'.key', $value);
      }*/
    }
}
