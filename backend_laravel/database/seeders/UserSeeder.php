<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Pravi 2 User-a
        \App\Models\User::factory(2)->create();
    }
}
