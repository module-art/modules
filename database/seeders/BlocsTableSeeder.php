<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BlocsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
		//DB::table('blocs')->delete();

    //$now = Carbon::now();
    
    DB::table('blocs')->insert([
      //'created_at' => $now,
      //'updated_at' => $now,
      'contenu' => '<h3>Voici un bloc large.</h3>',
      'place' =>  1,
      'type' =>  'large',
      'rubrique_id' => 1,
    ]);

    $num = 2;
    for($i=0; $i<=$num; $i++){
      DB::table('blocs')->insert([
        //'created_at' => $now,
        //'updated_at' => $now,
        'contenu' => '<h4>bloc normal numéro : '.( $i+1 ). '</h4><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>',
        'place' =>  $i+2,
        'type' =>  'normal',
        'rubrique_id' => 1,
      ]);
    }
    for($i=0; $i<=3; $i++){
      DB::table('blocs')->insert([
        //'created_at' => $now,
        //'updated_at' => $now,
        'contenu' => '<h5>bloc footer numéro : '.( $i+1 ). '</h5><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>',
        'place' =>  $i+1,
        'type' =>  'footer',
        'rubrique_id' => 2,
      ]);
    }
  }
}
