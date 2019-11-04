<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('types', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('content_type', 100)->unique();
            $table->text('champs')->nullable();
            $table->text('json_fields')->nullable();
            $table->string('default_filtre', 255);
            $table->boolean('descendant')->default(0);
            $table->boolean('available')->default(1);
            $table->smallInteger('nb_per_page')->default(0);
            $table->integer('child_of')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('types');
    }
}
