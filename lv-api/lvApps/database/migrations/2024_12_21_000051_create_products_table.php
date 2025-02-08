<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            
            $table->string('name');
            $table->string('slug');
            $table->string('description')->nullable();
            $table->string('short_description')->nullable();
            $table->string('thumb')->nullable();
            $table->string('images')->nullable();
            $table->double('price', 15, 9)->nullable();
            $table->string('unit')->nullable();
            $table->integer('is_top')->nullable();
            $table->integer('is_featured')->nullable();
            $table->integer('is_offered')->nullable();
            $table->integer('status')->nullable();

            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories');

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
