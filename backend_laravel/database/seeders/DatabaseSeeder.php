<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Call the individual seeders
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            TaskSeeder::class,
            TimeEntrySeeder::class,
        ]);
    }
}
