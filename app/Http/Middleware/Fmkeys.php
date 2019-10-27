<?php

namespace App\Http\Middleware;

use Closure;
use Storage;

class fmkeys
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
        if(!Storage::exists('theme')) Storage::put('theme', config('modules.theme'));
        $fmkey = md5(uniqid());
        Storage::put('fm.key', $fmkey);
        $request->merge(['fmkey' => $fmkey]);
      }
        return $next($request);
    }
}
