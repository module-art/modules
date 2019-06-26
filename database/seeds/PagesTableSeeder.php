<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PagesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    //DB::table('pages')->delete();

    $date = Carbon::now();
    DB::table('pages')->insert([
      'created_at' => $date,
      'updated_at' => $date,
      'title' => 'Page d\'accueil',
      'menu_title' => 'Accueil',
      'place' => 1,
      'slug' => str_slug('Accueil'),
      'is_home' => 1,
      'publie' => 1,
    ]);
  }
}
