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
        Schema::create('entries', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('nutritionix_id', 100);
            $table->decimal('amount_quantity', 7, 2);
            $table->string('amount_unit', 20);
            $table->decimal('carbs', 7, 2);
            $table->decimal('proteins', 7, 2);
            $table->decimal('fats', 7, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entries');
    }
};
