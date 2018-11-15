<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRubriqueCategorieTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rubrique_categorie', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('rubrique_id')->unsigned();
            $table->foreign('rubrique_id')->references('id')->on('rubriques')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->integer('categorie_id')->unsigned();
            $table->foreign('categorie_id')->references('id')->on('categories')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('rubrique_categorie', function(Blueprint $table) {
          $table->dropForeign('rubrique_categorie_categorie_id_foreign');
          $table->dropForeign('rubrique_categorie_rubrique_id_foreign');
        });
        Schema::dropIfExists('rubrique_categorie');
    }
}
