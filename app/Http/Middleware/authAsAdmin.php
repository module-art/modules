<?php

namespace App\Http\Middleware;

use Closure;
use Storage;

class authAsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
      $role = $request->user()->role;
      if($role == 'admin' || $role == 'maintainer'){
        Storage::put('rfm.key', config('modules.rfm_key'));
        if ( ! session_id() ) @ session_start();
        if ( ! isset($_SESSION['fmanager-ts'])) $_SESSION['fmanager-ts'] = time();
        $_SESSION['fmanager'] = md5($_SESSION['fmanager-ts'].config('modules.rfm_key'));
        return $next($request);
      }
      abort(403);
    }
}
