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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->string('invoice_no');
            $table->string('customer_type')->nullable();
            $table->string('payment_method')->nullable();
            $table->double('total', 15, 9)->nullable();
            $table->double('discount', 15, 9)->nullable();
            $table->double('sub_total', 15, 9)->nullable();
            $table->double('payment', 15, 9)->nullable();
            $table->double('due', 15, 9)->nullable();
            $table->double('profit', 15, 9)->nullable();
            $table->double('vat', 15, 9)->nullable();
            $table->double('tax', 15, 9)->nullable();
            $table->integer('status')->nullable();

            $table->unsignedBigInteger('customer_id')->nullable();
            $table->foreign('customer_id')->references('id')->on('customers');

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
        Schema::dropIfExists('orders');
    }
};
