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
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users');
            $table->date('date');
            $table->decimal('body_weight_quantity', 6, 2);
            $table->string('body_weight_unit', 20);
            $table->decimal('target_protein_multiplier', 3, 2);
            $table->decimal('target_fat_percentage', 5, 2);
            $table->decimal('base_metabolic_rate', 7, 2,);
            $table->decimal('total_carbs', 7, 2);
            $table->decimal('total_proteins', 7, 2);
            $table->decimal('total_fats', 7, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
