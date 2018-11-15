<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('comments', function (Blueprint $table) {
      $table->increments('id');
      $table->timestamps();
      $table->string('comment_author', 100);
      $table->string('comment_author_email', 100)->nullable();
      $table->text('comment_content');
      $table->boolean('publie')->default(1);
      $table->integer('rubrique_id')->unsigned()->nullable();
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
		Schema::table('comments', function(Blueprint $table) {
			$table->dropForeign('comments_rubriques_id_foreign');
		});
    Schema::dropIfExists('comments');
  }
}
