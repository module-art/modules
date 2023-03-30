<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Date;

class EventMigrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //go on after 9091
      $events = DB::connection('mysql_mails')->table('ar_ai1ec_events')->where('post_id','>', 8948)->get();
      
      //$event = DB::connection('mysql_mails')->table('ar_ai1ec_events')->where('post_id', 8183)->first();
      foreach($events as $event){
        //get start date time ans duration of event
        $carbon_start = Date::createFromTimestamp($event->start, 'Europe/Paris');
        $carbon_end = Date::createFromTimestamp($event->end, 'Europe/Paris');
        $duration = $carbon_start->floatDiffInHours($carbon_end);
        //dd($duration);

        //get title and content data
        $event_post = DB::connection('mysql_mails')->table('ar_posts')->where('post_parent', $event->post_id)->where('post_type', 'revision')->first();

        if(!is_null($event_post)){

          //get image data in larrosoiqsoir and migrate image file to new file manager
          $image_instance = DB::connection('mysql_mails')->table('ar_posts')->where('post_parent', $event->post_id)->where('post_type', 'attachment')->first();
          if(is_null($image_instance)){
            $image_link = '';
          }else{
            $image_url = $image_instance->guid;
            $image_file_name = preg_replace('/.*\/(.*)$/','$1', $image_url);
            $image_path = 'storage/app/public/arrosoir/files/images/events/'.$image_file_name;
            $image_link = '/storage/arrosoir/files/images/events/'.$image_file_name;
            $image = file_get_contents($image_url);
            file_put_contents($image_path, $image);
          }
          $fields = [ 
            ['mis_en_avant', 0],
            ['titre', $event_post->post_title],
            ['chapo', ''],
            ['texte', $event_post->post_content],
            ['duree', $duration],
            ['recurrence', 'aucun'],
            ['date', $carbon_start->format('d/m/Y')],
            ['date_fin', ''],
            ['all_dates', null],
            ['heure_debut', $carbon_start->format('H:i')],
            ['event_date', $event->start],
          ];
          //dd($fields);

          $rubrique_id = DB::table('rubriques')->insertGetId([
            'created_at' => $event_post->post_date,
            'updated_at' => $event_post->post_modified,
            'contenu' => 'evenement',
            'background_img_url' => $image_link,
            'type_id' => 1
          ]);

          foreach($fields as $i => $field){
            DB::table('blocs')->insert([
              'contenu' => $field[1],
              'place' =>  $i+1,
              'type' =>  $field[0],
              'rubrique_id' => $rubrique_id,
            ]);
          }

        }//endif $event_post not null
      }//end foreach
      
    }
}
