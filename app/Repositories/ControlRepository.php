<?php

namespace App\Repositories;

use Date;
use Storage;
use Image;
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

  static function insertGallery($datas){

    $modified_data = "";
    $path = config('images.galeries');

    foreach($datas as $i => $data){
      if($i > 0){
        if($i == 2){//cas des deuxièmes parenthèses capturantes
          if(Storage::exists($path.$data.'/thumbs')){
            $thumbs = Storage::files($path.$data.'/thumbs');
            foreach($thumbs as $thumb){
              $modified_data .= ( Storage::url($thumb) ).'<br>';
            }
          }else{
            $images = Storage::files($path.$data);
            Storage::makeDirectory($path.$data.'/thumbs');
            foreach($images as $image_path){

              $name = preg_replace('/.+\/(.+)$/', '$1', $image_path);

              $image = Storage::get($image_path);

              $ok = Image::make($image)->resize(300, null, function ($constraint){
                $constraint->aspectRatio();
              })->save('storage/files/galeries/'. $data . '/thumbs/' . $name, 60);

              $modified_data .= $image_path.'<br>';
            }
          }
        }else{
          $modified_data .= $data;
        }
      }
    }

    return($datas[0]);
    return($modified_data);

  }

}
