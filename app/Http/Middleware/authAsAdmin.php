<?php

namespace App\Http\Middleware;

use Closure;

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
        if ( ! session_id() ) @ session_start();
        if ( ! isset($_SESSION['fmanager-ts'])) $_SESSION['fmanager-ts'] = time();
        $_SESSION['fmanager'] = md5($_SESSION['fmanager-ts'].'salt_code');
        return $next($request);
      }
      abort(403);
    }
}
