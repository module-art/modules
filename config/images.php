<?php
//Storage root path is storage/app
//Image root path is public/, in this case, storage is the link to storage/app/public
return [
  'path' => 'storage/'.env('MODULES_THEME', 'module-art').'/img/',//use with Image
  'galeries' => 'public/'.env('MODULES_THEME', 'module-art').'/files/galeries/',//use with Storage
];
