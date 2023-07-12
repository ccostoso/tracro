<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Member',
            'email' => 'member@example.com',
        ]);

        User::factory()->create([
            'name' => 'Demo',
            'email' => 'demo@example.com',
            'user_type_id' => 2,
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'user_type_id' => 3,
        ]);

        User::factory()->count(10)->create();
    }
}
