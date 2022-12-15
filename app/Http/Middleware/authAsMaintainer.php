<?php

namespace App\Http\Middleware;

use Closure;
use Storage;

class authAsMaintainer
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
      if($role == 'maintainer'){
        return $next($request);
      }
      abort(403);
    }
}
