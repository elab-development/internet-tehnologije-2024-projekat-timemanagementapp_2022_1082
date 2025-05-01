<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run()
    {
        // Pravi jedan Task sa odredjenom kateorijom i za odredjenog User-a
        \App\Models\Task::factory(1)->create();
    }
}
