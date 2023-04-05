<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use App\Models\Rubrique;
use App\Models\Bloc;

class SubscriberMigrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $subscribers = DB::connection('mysql_mails')->table('ar_rg_lead')->where('form_id', 5)->get();
      //$subscriber = DB::connection('mysql_mails')->table('ar_rg_lead')->where('form_id', 5)->first();
      
      foreach($subscribers as $subscriber){

        //get fields data
        $subscriber_fields = DB::connection('mysql_mails')->table('ar_rg_lead_detail')->where('lead_id', $subscriber->id)->get();


        if($subscriber_fields->where('field_number', 4)->first()){
          $code_postal_rub = $subscriber_fields->where('field_number', 6)->first();
          $fields = [ 
            ['email', $subscriber_fields->where('field_number', 4)->first()->value],
            ['code', md5(uniqid())],
            ['nom', $subscriber_fields->where('field_number', 1)->first()->value],
            ['prenom', $subscriber_fields->where('field_number', 2)->first()->value],
            ['code_postal', $code_postal_rub ? $code_postal_rub->value : '46100'],
          ];

          $exists_email = Bloc::where('type', 'email')->where('contenu', $fields[0][1])->first();
          echo($fields[0][1]. "\n");
          echo($exists_email ? "Email existe, pas d'insertion\n" : "Nouvel Email, insertion\n");

          if(!$exists_email){
            $rubrique_id = Rubrique::insertGetId([
              'created_at' => $subscriber->date_created,
              'updated_at' => $subscriber->date_created,
              'contenu' => 'subscriber',
              'publie' => 1,
              'type_id' => 3
            ]);

            foreach($fields as $i => $field){
              DB::table('blocs')->insert([
                'contenu' => $field[1],
                'place' =>  $i+1,
                'type' =>  $field[0],
                'rubrique_id' => $rubrique_id,
              ]);
            }

            $new_rubrique = Rubrique::find($rubrique_id);
            $new_rubrique->categories()->attach(18);
          }//end if don't exists email
        }else{//end if is email in fields
          echo("Cet adhérent n'a pas mis de mail\n");
        }
      }//end foreach
      
    }
}
