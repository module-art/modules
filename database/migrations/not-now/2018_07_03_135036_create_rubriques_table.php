<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRubriquesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('rubriques', function (Blueprint $table) {
      $table->increments('id');
      $table->timestamps();
      $table->softDeletes();
      $table->text('contenu');
      $table->smallInteger('place');
      $table->smallInteger('cols');
      $table->boolean('ascendant')->default(1);
      $table->string('background_img_url')->nullable();
      $table->string('background_hd_url')->nullable();
      $table->boolean('publie')->default(0);
      $table->integer('type_id')->unsigned()->nullable();
      $table->foreign('type_id')->references('id')->on('types')
            ->onDelete('cascade')
            ->onUpdate('cascade');
      $table->integer('page_id')->unsigned()->nullable();
      $table->foreign('page_id')->references('id')->on('pages')
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
		Schema::table('rubriques', function(Blueprint $table) {
			$table->dropForeign('rubriques_type_id_foreign');
		});
		Schema::table('rubriques', function(Blueprint $table) {
			$table->dropForeign('rubriques_page_id_foreign');
		});
    Schema::dropIfExists('rubriques');
  }
}
