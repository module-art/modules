<?php

use Illuminate\Database\Seeder;

class ArticleMigrationSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    //$posts = DB::table('wp_posts')->where('post_type', 'post')->where('post_status', 'publish')->get();
    //$num = $posts->count();
    
    function parseGallery($matches){
      $images_refs = explode(',', $matches[1]);
      $is_rounds = preg_match('/circle/', $matches[2]);
      foreach($images_refs as $ref){
        $image_row = DB::table('wp_posts')->select('guid')->where('id', $ref)->first();
        $image_urls[] = preg_replace('/http:\/\/localhost\/sylvope\/wordpress\/wp-content/', '', $image_row->guid);
      }

      $fancy = '<figure class="gallery row justify-content-center">';

      foreach($image_urls as $image_url){
        $pathWithoutExt = preg_replace('/\..+$/', '', $image_url );
        $ext = pathinfo($image_url)['extension'];
        $fancy .= '<a class="fancy col-6 col-sm-4 col-md-3 col-lg-2" href="';
        $fancy .= $image_url;
        $fancy .= '" data-fancybox="gallery"><img src="';
        $fancy .= $pathWithoutExt . '-150x150.' . $ext;
        if($is_rounds){
          $fancy .= '" class="rond';
        }
        $fancy .= '" alt="image" border="0"></a>';
      }
      $fancy .= '</figure>';

      return $fancy;
    }

    //$post = $posts->first();
    $post = DB::table('wp_posts')->where('id', '1241')->first();
    //foreach($posts as $post){
      $rubrique_id = DB::table('rubriques')->insertGetId([
        'created_at' => $post->post_date,
        'updated_at' => $post->post_date,
        'contenu' => 'article',
        'type_id' => 1
      ]);

      DB::table('blocs')->insert([
        'contenu' => '<h2>'.$post->post_title.'</h2>',
        'place' =>  1,
        'type' =>  'titre',
        'rubrique_id' => $rubrique_id,
      ]);

      $texte = preg_replace('/http:\/\/localhost\/sylvope\/wordpress\/wp-content/', '', $post->post_content);

      //$texte = preg_replace('/<img\sclass=".+"/U', '<img ', $texte);

      if(preg_match('/\[gallery/', $texte)){
        $texte = preg_replace_callback('/\[gallery\sids="([0-9,]+)"\stype="([a-z]+)".*\]/U', 'parseGallery', $texte);
      }

      DB::table('blocs')->insert([
        'contenu' => $texte,
        'place' =>  2,
        'type' =>  'texte',
        'rubrique_id' => $rubrique_id,
      ]);
    //}
  }
}
