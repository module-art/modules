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

  static function getSortedTypeRubriques($type, $order_by, $desc = 0){

    $order = $desc ? 'desc' : 'asc';

    if($order_by == 'created_at' || $order_by == 'updated_at'){

      $sorted_rubriques = Rubrique::where('type_id', $type->id)->orderBy($order_by, $order)->get();

    }else{

      //on récupère les blocs par type juste pour avoir l'ordre des rubriques
      $blocs = $type->blocs()->where('type', $order_by)->orderBy('contenu', $order)->get();

      $sorted_rubriques = array();
      foreach($blocs as $bloc){
        $sorted_rubriques[] = Rubrique::find($bloc->rubrique_id);
      }

    }

    return $sorted_rubriques;
    
  }

  static function insertGallery($folder){

    return($folder);
  
  }

}
