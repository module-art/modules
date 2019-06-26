<?php

namespace App\Repositories;

use App\Models\Rubrique;

class FooterRepository
{

  static function makeFooter(){

    $footer = Rubrique::where('place', 0)->where('contenu', 'footer')->get();
    $is_footer = $footer->count() > 0 ? true : false;

    if($is_footer){
      return $footer->first();
    }else{
      return false;
    }

  }

}
