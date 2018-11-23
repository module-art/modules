<?php

namespace App\Repositories;

use App\Models\Rubrique;

class FooterRepository
{

  static function makeFooter(){

    return Rubrique::where('place', 0)->where('contenu', 'footer')->first();

  }

}
