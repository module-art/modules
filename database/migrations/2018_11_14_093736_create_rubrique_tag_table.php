<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRubriqueTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rubrique_tag', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('rubrique_id')->unsigned();
            $table->foreign('rubrique_id')->references('id')->on('rubriques')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->integer('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('tags')
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
        Schema::table('rubrique_tag', function(Blueprint $table) {
          $table->dropForeign('rubrique_tag_tag_id_foreign');
          $table->dropForeign('rubrique_tag_rubrique_id_foreign');
        });
        Schema::dropIfExists('rubrique_tag');
    }
}
