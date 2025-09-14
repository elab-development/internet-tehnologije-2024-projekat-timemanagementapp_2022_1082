<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TimeEntry;

class TimeEntrySeeder extends Seeder
{
    public function run()
    {
        \App\Models\TimeEntry::factory(1)->create();
    }
}