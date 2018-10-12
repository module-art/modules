<?php

namespace App\Repositories;

use Date;
use App\Models\Type;
use App\Models\Rubrique;

class ControlRepository
{

  public function __construct()
  {
    $this->now = Date::now();
  }
  public $nbrPerPage = 15;

  private function sortBy($on, $array, $order=SORT_ASC)
  {
    $new_array = array();
    $sortable_array = array();

    if (count($array) > 0) {
        foreach ($array as $k => $v) {
            if (is_array($v)) {
                foreach ($v as $k2 => $v2) {
                    if ($k2 == $on) {
                        $sortable_array[$k] = $v2;
                    }
                }
            } else {
                $sortable_array[$k] = $v;
            }
        }

        switch ($order) {
            case SORT_ASC:
                asort($sortable_array);
            break;
            case SORT_DESC:
                arsort($sortable_array);
            break;
        }

        foreach ($sortable_array as $k => $v) {
            $new_array[$k] = $array[$k];
        }
    }

    return $new_array;
  }

  public function getSortedTypeRubriques($type_of_rubrique, $order_by, $order='asc'){

    $type = Type::where('content_type', $type_of_rubrique)->firstOrFail();

    //on récupère les blocs par type juste pour avoir l'ordre des rubriques
    $blocs = $type->blocs()->where('type', $order_by)->orderBy('contenu', $order)->get();

    $sorted_rubriques = array();
    foreach($blocs as $bloc){
      $sorted_rubriques[] = Rubrique::find($bloc->rubrique_id);
    }

    return $sorted_rubriques;
    
  }

}
