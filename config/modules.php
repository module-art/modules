<?php

return [
  /*
  |--------------------------------------------------------------------------
  | Modules Theme
  |--------------------------------------------------------------------------
  |
  | This value is the name of current theme. It directs laravel app to the
  | wanted theme.
  |
   */
  'theme' => env('MODULES_THEME', 'module-art'),

  /*
  |--------------------------------------------------------------------------
  | Modules multi rubrique support
  |--------------------------------------------------------------------------
  |
  | This value is a boolean used to set display of rubrique menu in admin sidebar
  |
   */

  'multi_rubrique' => env('MULTI_RUBRIQUE', true),

  /*
  |--------------------------------------------------------------------------
  | Modules mails manager support
  |--------------------------------------------------------------------------
  |
  | This value is a boolean used to set display of mails menu in admin sidebar
  | Never works on local use
  |
   */

  'mails' => env('MODULES_MAILS', false),

];
