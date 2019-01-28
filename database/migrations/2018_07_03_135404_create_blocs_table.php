<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlocsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('blocs', function (Blueprint $table) {
      $table->increments('id');
      //$table->timestamps();
			//$table->softDeletes();
			$table->text('contenu')->nullable();
			$table->smallInteger('place')->nullable();
			$table->string('type', 100)->nullable();
			$table->integer('rubrique_id')->unsigned();
			$table->foreign('rubrique_id')->references('id')->on('rubriques')
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
		Schema::table('blocs', function(Blueprint $table) {
			$table->dropForeign('blocs_rubrique_id_foreign');
		});
    Schema::dropIfExists('blocs');
  }
}
