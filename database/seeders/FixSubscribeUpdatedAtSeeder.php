<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use App\Models\Rubrique;
use App\Models\Bloc;

class FixSubscribeUpdatedAtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $subscribers = Rubrique::where('contenu', 'subscriber')->get();
      
      foreach($subscribers as $subscriber){

        $created_at = $subscriber->created_at;
        echo($subscriber->blocs()->where('type', 'email')->first()->contenu."\n".$created_at."\n\n");
        $subscriber->update([
          'updated_at' => $created_at,
        ]);

      }//end foreach
      
    }
}
