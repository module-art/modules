<?php

namespace App\Repositories;

class ModuleHelpers
{

  public static function clean_url($text)
  {
    //$url = strip_tags($text);
    $url = html_entity_decode(strip_tags($text));
    return str_slug($url);
  }

}
