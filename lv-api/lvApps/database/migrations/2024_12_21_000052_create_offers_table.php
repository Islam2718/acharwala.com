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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            
            $table->string('title');
            $table->string('sub_title')->nullable();
            $table->string('offer_code')->nullable();
            $table->string('slug');
            $table->text('content')->nullable();
            $table->string('banner')->nullable();
            $table->double('product_price', 15, 9)->nullable();            
            $table->double('offer_price', 15, 9)->nullable();
            $table->string('discount')->nullable();
            $table->integer('status')->nullable();
            // template 
            $table->text('html_template')->nullable();
            // offer start date and end date 
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            // limit 
            $table->integer('limit')->nullable();

            $table->unsignedBigInteger('product_id')->nullable();            
            $table->foreign('product_id')->references('id')->on('products');
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
        Schema::dropIfExists('offers');
    }
};
