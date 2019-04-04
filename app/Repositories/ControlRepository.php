<?php

namespace App\Repositories;

use Date;
use Storage;
use Auth;
use Illuminate\Pagination\LengthAwarePaginator;
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

  static function getSortedTypeRubriques($type, $order_by, $desc = 0, $index = false){

    $order = $desc ? 'desc' : 'asc';
    $nb_per_page = $index ? 15 : $type->nb_per_page;
    $auth = Auth::check();

    if($order_by == 'created_at' || $order_by == 'updated_at'){

      if($auth){
        if($nb_per_page == 0){ //pagination is disabled
          $sorted_rubriques = Rubrique::where('type_id', $type->id)->orderBy($order_by, $order)->get();
        }else{
          $sorted_rubriques = Rubrique::where('type_id', $type->id)->orderBy($order_by, $order)->paginate($nb_per_page);
        }
      }else{
        if($nb_per_page == 0){ //pagination is disabled
          $sorted_rubriques = Rubrique::where('publie', 1)->where('type_id', $type->id)->orderBy($order_by, $order)->get();
        }else{
          $sorted_rubriques = Rubrique::where('publie', 1)->where('type_id', $type->id)->orderBy($order_by, $order)->paginate($nb_per_page);
        }
      }
      return $sorted_rubriques;

    }else{

      //on récupère les blocs par type juste pour avoir l'ordre des rubriques
      $blocs = $type->blocs()->where('type', $order_by)->orderBy('contenu', $order)->get();

      $sorted_rubriques = array();
      if($auth){
        foreach($blocs as $bloc){
          $rubrique = Rubrique::find($bloc->rubrique_id);
          $sorted_rubriques[] = $rubrique;
        }
      }else{
        foreach($blocs as $bloc){
          $rubrique = Rubrique::find($bloc->rubrique_id);
          if($rubrique->publie){
            $sorted_rubriques[] = $rubrique;
          }
        }
      }

      if($nb_per_page == 0){ //pagination is disabled and not index
        return $sorted_rubriques;
      }else{
        //Manually Created Paginator
        $current_page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

        $current_rubriques = array_slice($sorted_rubriques, $nb_per_page * ($current_page-1), $nb_per_page);

        $paginated_rubriques = new LengthAwarePaginator($current_rubriques, count($sorted_rubriques), $nb_per_page, $current_page);

        $paginated_rubriques->withPath(url()->current());
        //$paginator->withPath('filtredate')->appends(['date' => $request->date, 'cycle' => $request->cycle]);

        //$paginated_rubriques = $paginator->items();

        //$links = $paginator->links();

        return $paginated_rubriques;
      }

    }

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

  static function getDiapoAccueil(){

    $images = array();
    //$diapos_path = config('images.diapos');
    $diapos_path = 'public/gitedhote46/files/diapo-accueil/';
    foreach(Storage::files($diapos_path) as $image){
      $images[] = preg_replace('/^public/', '/storage', $image);
    }

    return $images;
  }

}
