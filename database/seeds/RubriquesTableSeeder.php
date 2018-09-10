<?php

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
      'contenu' => 'Rubrique 1',
      'place' => 1,
      'cols' => 3,
      'background_img_url' => null,
      'background_hd_url' => null,
      'page_id' => 1,
    ]);
  }
}
