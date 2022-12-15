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

}
