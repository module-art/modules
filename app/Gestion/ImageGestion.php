<?php 

namespace App\Gestion;

use Image;

class ImageGestion
{

    public function resizeAndSave($image)
    {

      if($image->isValid())
      {
        $app_path = config('images.path');
        $realname = preg_replace('/[\séèêçîùûôàœ+]+/','-', strtolower($image->getClientOriginalName()));
        $name = preg_replace('/\..+$/', '', $realname);
        $name_big = $name . '@2x';
        //$extension = '.'.strtolower($image->getClientOriginalExtension());

        /*non utilisé car pas utile ici, évite d'écraser une image éxistante
        if(file_exists($app_path . $realname)){
          return [$app_path . $name . '.jpg', $app_path . $name_big . '.jpg'];
        }
        /*non utilisé car pas utile ici, évite d'écraser une image existante
        if(file_exists($app_path . $realname)){
          $i = 0;
          do {
            $test_name = $name . $i . $extension;
            $i++;
          } while(file_exists($app_path . $test_name));
          $name .= $i;
        }
        */
        //return($app_path . $name_big);

        //$ok = $image->move($app_path, $name);
        
        // configure with favored image driver (gd by default)
        //Image::configure(array('driver' => 'imagick'));
        Image::make($image)->resize(3200, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save($app_path . $name_big . '.jpg', 60);
        // resize the image to a width of 1600 and constrain aspect ratio (auto height)
        // resizing an uploaded file
        $ok = Image::make($image)->resize(1600, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save($app_path . $name . '.jpg', 60);
       
        return $ok ? [$app_path . $name . '.jpg', $app_path . $name_big . '.jpg'] : false;
      }else{
        return false;
      }
    }
}
