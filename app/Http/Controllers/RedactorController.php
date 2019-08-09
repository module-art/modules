<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\RedactorFormRequest;
use Storage;
use Image;


class RedactorController extends Controller
{

  public function getGallery(Request $request){
     
    /*return response()->json([
      'response' => $request->gallery,
    ]);*/

    $path_to_gallery = $request->gallery;

    if(!Storage::exists($path_to_gallery.'/thumbs')){
      $images = Storage::files($path_to_gallery);
      Storage::makeDirectory($path_to_gallery.'/thumbs');

      foreach($images as $image_path){

        $name = preg_replace('/.+\/(.+)$/', '$1', $image_path);

        $image = Storage::get($image_path);

        //$ok = Image::make($image)->resize(300, null, function ($constraint){
          //$constraint->aspectRatio();
        //})->save(preg_replace('/^public/', 'storage', $path_to_gallery) . '/thumbs/' . $name, 60);//image uses the public path
        $ok = Image::make($image)->fit(300)->save(preg_replace('/^public/', 'storage', $path_to_gallery) . '/thumbs/' . $name, 60);//imageClass uses the public path
      }

    }

    $storage_thumbs = Storage::files($path_to_gallery.'/thumbs');
    $thumbs = array();

    foreach($storage_thumbs as $thumb){
      $thumbs[] = Storage::url($thumb);
    }
     
    return response()->json([
      'response' => $request->pathToGallery,
      'thumbs' => $thumbs,
    ]);
  }

  //inutilisées avec tinymce ==>
  public function uploadImage(RedactorFormRequest $request)
  {
    $image = $request->file;
     /* comment récupérer la réponse Json avec redactor imagemanager?
    $width = Image::make($image)->width();
    if($width < 1200){
      return response()->json(['error' => 'Qualité de l\'image insuffisante, minimum : 1200px']);
    }
      */
    $path = 'storage/pictures/';
    $realname = preg_replace('/[\séèêçîùûôàœ+]+/','-', strtolower($image->getClientOriginalName()));
    $name = preg_replace('/\..+$/', '', $realname);
    $extension = '.'.strtolower($image->getClientOriginalExtension());
    $width = Image::make($image)->width();

    //ajoute un numéro si le nom existe
    if(file_exists($path . $realname)){
      $i = 0;
      do {
        $i++;
        $test_name = $name . $i . $extension;
      } while(file_exists($path . $test_name));
      $name .= $i;
    }
      
    Image::make($image)->resize(200, null, function ($constraint) {
        $constraint->aspectRatio();
    })->save($path . 'thumbs/' . $name . '-thumb' . $extension, 60); 
      
    if($width > 1200){
      Image::make($image)->resize(1200, null, function ($constraint) {
          $constraint->aspectRatio();
      })->save($path . $name . $extension, 70); 
    }else{
      Image::make($image)->save($path . $name . $extension);
    }
    
    /*$json = response()->json([
      'file' => array (
      'url' => '/' . $path . $name . $extension,
      'id' => $name
      ),
    ]);*/
    $json = response()->json([
      'location' => '/' . $path . $name . $extension,
    ]);

    return $json;
  }

  public function imageManager() {
    
    $files = Storage::files('public/pictures');
    $files_list = array();
  
    foreach ($files as $key => $file)
    {
      if(strpos($file, '.DS_Store') == false) {
        $info = pathinfo($file);
        $name = basename($file,'.'.$info['extension']);
        $files_list[] = array(
          'thumb' => Storage::url('public/pictures/thumbs/' . $name . '-thumb.' . $info['extension']),
          'url' => Storage::url('public/pictures/' . $name . '.' . $info['extension']),
          'id' => 'img'.$key,
          'title' => 'Image ' . $key
        );
      }
    }
    return response()->json($files_list);
  }
}
