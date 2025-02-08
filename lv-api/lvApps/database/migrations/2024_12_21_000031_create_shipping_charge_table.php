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
        Schema::create('shipping_charges', function (Blueprint $table) {
            $table->id();
            
            $table->string('type')->nullable(); //debit or credit
            $table->string('title')->nullable(); //bkash, rocket, nagad, cash etc. 
            $table->string('shipping_form')->nullable(); // walk-in or Registered
            $table->string('shipping_to')->nullable(); // walk-in or Registered

            $table->double('charge', 15, 9)->nullable();

            // status 
            $table->boolean('status')->default(0);
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
        Schema::dropIfExists('shipping_charges');
    }
};
