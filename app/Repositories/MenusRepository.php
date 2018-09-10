<?php

namespace App\Repositories;

use App\Models\Page;

class MenusRepository
{

  public function makeAdminMenus(){

    return Page::where('place', '>', 0)->orderBy('place')->get();

  }

  public function makeMenus(){

    return Page::where('publie', 1)->where('place', '>', 0)->orderBy('place')->get();

  }

}
