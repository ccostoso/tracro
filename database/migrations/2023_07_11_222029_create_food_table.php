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
        Schema::create('food', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('nutritionix_id', 100);
            $table->string('name', 50);
            $table->decimal('carbs', 7, 2);
            $table->decimal('proteins', 7, 2);
            $table->decimal('fats', 7, 2);
            $table->timestamps();
            $table->unique(['user_id', 'nutritionix_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food');
    }
};
