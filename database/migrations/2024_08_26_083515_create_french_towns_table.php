<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFrenchTownsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() { 
    Schema::create('french_towns', function (Blueprint $table) { 
      $table->increments('id'); 
      $table->string('code_commune_INSEE'); 
      $table->string('nom_de_la_commune'); 
      $table->integer('code_postal'); 
    }); 
  } 
  
  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() { 
    Schema::dropIfExists('french_towns'); 
  }
}
