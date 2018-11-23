<?php

namespace App\Repositories;

use App\Models\Page;

class MenusRepository
{

  static function makeAdminMenus(){

    return Page::where('place', '>', 0)->orderBy('place')->get();

  }

  static function makeMenus(){

    return Page::where('publie', 1)->where('place', '>', 0)->orderBy('place')->get();

  }

}
