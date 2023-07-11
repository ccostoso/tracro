<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('log_food', function (Blueprint $table) {
            $table->id();
            $table->foreignId('log_id')->constrained();
            $table->foreignId('food_id')->constrained();
            $table->integer('position');
            $table->decimal('amount_quantity', 7, 2);
            $table->string('amount_unit', 20);
            $table->timestamps();
            $table->unique(['log_id', 'position']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_food');
    }
};
