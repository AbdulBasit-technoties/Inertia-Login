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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->morphs("model");
            $table->unsignedBigInteger('uid');
            $table->unsignedBigInteger('recipient_id');
            $table->enum('status', ['unread', 'read'])->default('unread');
            $table->string('title')->nullable();
            $table->text('message')->nullable();
            $table->string('route')->nullable();
            $table->foreign('uid')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('recipient_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('notifications');
    }
};
