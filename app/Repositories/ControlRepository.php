<?php

namespace App\Repositories;

use Date;
use Storage;
use Auth;
use Illuminate\Pagination\LengthAwarePaginator;
use Image;
use App\Models\Type;
use App\Models\Rubrique;
use App\Models\Categorie;

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

  public function getTypedRub($id){

    $type = Type::find($id);
    return $type->rubriques()->where('publie', 1)->get();
  }

  public function getData($typed_rubrique, $type){

    return $typed_rubrique->blocs()->where('type', $type)->first()->contenu;
  }

  public function getImage($typed_rubrique, $type = 'image'){

    $raw_image = $typed_rubrique->blocs()->where('type',$type)->first();

    return preg_replace('/^.*<img\ssrc="(.+)".*$/U','$1', $raw_image->contenu);
  }

  public function getSortedTypeRubriques($type, $order_by = 0, $desc = 0, $archive = false, $index = false){

    if(isset($_GET['category'])){
      $reference = is_numeric($_GET['category']) ? Categorie::find($_GET['category']) : Categorie::where('slug', $_GET['category'])->firstOrFail();
    }else{
      $reference = $type;
    }
    //$reference = isset($_GET['category']) ? Categorie::find($_GET['category']) : $type;
    $order = $desc ? 'desc' : 'asc';
    $nb_per_page = $index ? 15 : $type->nb_per_page;
    $auth = Auth::check();

    if(!$order_by) $order_by = $type->default_filtre;

    if($order_by == 'created_at' || $order_by == 'place' || $order_by == 'updated_at'){

      //On veut que les contenus non publiés s'affichent quand loggé
      if($auth){
        if($nb_per_page == 0){ /*pagination is disabled*/
          if($archive){
            $sorted_rubriques = $reference->rubriques()->where('archive', 1)->orderBy($order_by, $order)->get();
          }else{
            $sorted_rubriques = $reference->rubriques()->where('archive', 0)->orderBy($order_by, $order)->get();
          }
        }else{
          if($archive){
            $sorted_rubriques = $reference->rubriques()->where('archive', 1)->orderBy($order_by, $order)->paginate($nb_per_page);
          }elseif($index){
            $sorted_rubriques = $reference->rubriques()->orderBy($order_by, $order)->paginate($nb_per_page);
          }else{
            $sorted_rubriques = $reference->rubriques()->where('archive', 0)->orderBy($order_by, $order)->paginate($nb_per_page);
          }
        }
      }else{
        if($nb_per_page == 0){ /*pagination is disabled*/
          if($archive){
            $sorted_rubriques = $reference->rubriques()->where('publie', 1)->where('archive', 1)->orderBy($order_by, $order)->get();
          }else{
            $sorted_rubriques = $reference->rubriques()->where('publie', 1)->where('archive', 0)->orderBy($order_by, $order)->get();
          }
        }else{
          if($archive){
            $sorted_rubriques = $reference->rubriques()->where('publie', 1)->where('archive', 1)->orderBy($order_by, $order)->paginate($nb_per_page);
          }else{
            $sorted_rubriques = $reference->rubriques()->where('publie', 1)->where('archive', 0)->orderBy($order_by, $order)->paginate($nb_per_page);
          }
        }
      }

      return $sorted_rubriques;

    }else{

      if($auth){
        if($archive){
          $all_rubriques = $reference->rubriques()->where('archive', 1)->get();
        }elseif($index){
          $all_rubriques = $reference->rubriques()->get();
        }else{
          $all_rubriques = $reference->rubriques()->where('archive', 0)->get();
        }
      }else{
        if($archive){
          $all_rubriques = $reference->rubriques()->where('publie', 1)->where('archive', 1)->get();
        }else{
          $all_rubriques = $reference->rubriques()->where('publie', 1)->where('archive', 0)->get();
        }
      }

      $rubrique_id_block = array();

      foreach($all_rubriques as $rubrique){
        $order_block = $rubrique->blocs()->where('type', $order_by)->first();
        $rubrique_id_block[$rubrique->id] = $order_block->contenu;
      }

      if($desc){
        arsort($rubrique_id_block);
      }else{
        asort($rubrique_id_block);
      }

      $sorted_rubriques = array();
      foreach($rubrique_id_block as $key => $value){
        $rubrique = Rubrique::find($key);
        $sorted_rubriques[] = $rubrique;
      }

      if($nb_per_page == 0){ //pagination is disabled and not index
        return $sorted_rubriques;
      }else{
        //Manually Created Paginator
        $current_page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

        $current_rubriques = array_slice($sorted_rubriques, $nb_per_page * ($current_page-1), $nb_per_page);

        $paginated_rubriques = new LengthAwarePaginator($current_rubriques, count($sorted_rubriques), $nb_per_page, $current_page);

        if(isset($_GET['category'])){ 
          $paginated_rubriques->withPath(url()->current())->appends(['category' => $_GET['category']]);
        }else{
          $paginated_rubriques->withPath(url()->current());
        }

        //$paginated_rubriques = $paginator->items();
        //$links = $paginator->links();

        return $paginated_rubriques;
      }
    }
  }

  public function insertGallery($datas){

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

  public function moveCsvToJsonFields($type){
    if(!$type->json_fields){
      $champs = explode(',', $type->champs);
      $array_fields = array();
      foreach($champs as $champ){
        if(preg_match('/date/', $champ)){
          $array_fields[] = (object) array('name' => $champ, 'type' => 'date');
        }elseif(preg_match('/heure/', $champ)){
          $array_fields[] = (object) array('name' => $champ, 'type' => 'time');
        }elseif(preg_match('/\(nb\)/', $champ)){
          $array_fields[] = (object) array('name' => preg_replace('/\(nb\).*$/', '', $champ), 'type' => 'nb');
        }else{
          $array_fields[] = (object) array('name' => $champ, 'type' => 'text');
        }
      }
      $json_fields =(object) array("fields" => $array_fields);
      $type->json_fields = json_encode($json_fields, JSON_UNESCAPED_UNICODE);
      $type->save();
    }
  }

  public function getGalleriesArray($needle = false){
    
    //get gallery folders
    $path_gallery = config('images.galeries');
    $folders = Storage::directories($path_gallery);
    $galleries = array();
    foreach($folders as $folder){
      $folder_name = preg_replace('/^.+\/(.+)$/', '$1', $folder);
      if($needle){
        if(preg_match('/'.$needle.'/i', $folder_name)){
          $galleries[$folder_name] = $folder;
        }
      }else{
        $galleries[$folder_name] = $folder;
      }
    }
    return $galleries;

  }

  public function galleryThumbsManager($gallery_url)
  {

    $images = Storage::files($gallery_url);

    //test if thumb folder exists
    if(Auth::check() && !Storage::exists($gallery_url.'/thumbs')){
      Storage::makeDirectory($gallery_url.'/thumbs');
    }elseif(!Storage::exists($gallery_url.'/thumbs')){
      return('<p>Affichage de la galerie d\'images impossible.</p>');
    }

    //test if thumb exists for each image
    if(Auth::check()){
      foreach($images as $image_path){
        $name = preg_replace('/.+\/(.+)$/', '$1', $image_path);
        if(!Storage::exists($gallery_url.'/thumbs/'.$name)){
          $image = Storage::get($image_path);
          $ok = Image::make($image)->fit(300)->save(preg_replace('/^public/', 'storage', $gallery_url) . '/thumbs/' . $name, 60);//imageClass uses the public path
        }
      }
    }

    $storage_thumbs = Storage::files($gallery_url.'/thumbs');

    //test if image exists for each thumb
    if(Auth::check()){
      foreach($storage_thumbs as $key => $thumb_path){
        $name = preg_replace('/.+\/(.+)$/', '$1', $thumb_path);
        if(!Storage::exists($gallery_url.'/'.$name)){
          Storage::delete($thumb_path);
          unset($storage_thumbs[$key]);
        }
      }
    }

    //get public urls
    $thumbs = array();
    foreach($storage_thumbs as $thumb){
      $thumbs[] = Storage::url($thumb);
    }

    return $thumbs;
  }

  public function parseGalleryInRubrique($string_with_gallery){

    $gallery_url = preg_replace('/(<p>)?.*\[gallery\surl="\/(.*)"\stype="(.*)"\].*(<\/p>)?/', '$2', $string_with_gallery);

    $thumbs = $this->galleryThumbsManager($gallery_url);
    //make html for fancybox
    $fancy = '';

    foreach($thumbs as $thumb_url){
      $image_url = preg_replace('/\/thumbs/', '', $thumb_url );
      $fancy .= '<a class="fancy col-6 col-sm-4 col-md-3 col-lg-2" href="';
      $fancy .= $image_url;
      $fancy .= '" data-fancybox="gallery"><img src="';
      $fancy .= $thumb_url;
      $fancy .= '" alt="image" border="0"></a>';
    }

    return $fancy;
  }
}
