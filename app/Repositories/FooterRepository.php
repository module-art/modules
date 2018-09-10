<?php

namespace App\Repositories;

use App\Models\Rubrique;

class FooterRepository
{

  public function makeFooter(){

    return Rubrique::where('place', 0)->where('contenu', 'footer')->first();

  }

}
