<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RubriquesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    //DB::table('rubriques')->delete();

    $date = Carbon::now();
    DB::table('rubriques')->insert([
      'created_at' => $date,
      'updated_at' => $date,
      'contenu' => '<h2>Voici une première rubrique.</h2>',
      'place' => 1,
      'cols' => 3,
      'background_img_url' => "/storage/themebase/img/violin.jpg",
      //'background_img_url' => null,
      'page_id' => 1,
    ]);
    DB::table('rubriques')->insert([
      'created_at' => $date,
      'updated_at' => $date,
      'contenu' => 'footer',
      'place' => 0,
      'cols' => 0,
      'background_img_url' => null,
      'page_id' => null,
    ]);
    DB::table('rubriques')->insert([
      'created_at' => $date,
      'updated_at' => $date,
      'contenu' => '<h2>Contact</h2>',
      'place' => 1,
      'cols' => 2,
      'background_img_url' => "/storage/themebase/img/cantal.jpg",
      //'background_img_url' => null,
      'page_id' => 2,
    ]);
  }
}
