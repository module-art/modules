<?php

namespace App\Repositories;

use Storage;
use ModuleControl;

class Services
{
  public function __construct(ModuleControl $module_control)
  {
    $this->moduleControl = $module_control;
  }

  public function common_vars($rubrique){

    switch ($rubrique->cols) {
    case 1:
      $cols = '';
      break;
    case 2:
      $cols = ' col-md-6';
      break;
    case 3:
      $cols = ' col-md-6 col-lg-4';
      break;
    }

    $order = $rubrique->ascendant ? 'asc' : 'desc'; 

    return compact('rubrique', 'cols', 'order');
  }

  public function parseGallery($matches){
    $gallery_url = $matches[1];
    $is_rounds = preg_match('/circle/', $matches[2]);

    $thumbs = $this->moduleControl->galleryThumbsManager($gallery_url);
    //make html for fancybox
    $fancy = '<figure class="gallery row justify-content-center">';

    foreach($thumbs as $thumb_url){
      $image_url = preg_replace('/\/thumbs/', '', $thumb_url );
      $fancy .= '<a class="fancy col-6 col-sm-4 col-md-3 col-lg-2" href="';
      $fancy .= $image_url;
      $fancy .= '" data-fancybox="gallery"><img src="';
      $fancy .= $thumb_url;
      if($is_rounds){
        $fancy .= '" class="rond';
      }
      $fancy .= '" alt="image" border="0"></a>';
    }
    $fancy .= '</figure>';

    return $fancy;
  }
}
