<?php

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
    $num = 2;

    for($i=0; $i<=$num; $i++){
      DB::table('blocs')->insert([
        //'created_at' => $now,
        //'updated_at' => $now,
        'contenu' => '<h3>bloc normal numéro : '.$i. '</h3><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a</p>',
        'place' =>  $i+1,
        'type' =>  'normal',
        'rubrique_id' => 1,
      ]);
    }
    for($i=0; $i<=3; $i++){
      DB::table('blocs')->insert([
        //'created_at' => $now,
        //'updated_at' => $now,
        'contenu' => '<p>bloc footer numéro : '.$i. '</p>',
        'place' =>  $i+1,
        'type' =>  'footer',
        'rubrique_id' => 2,
      ]);
    }
  }
}
