<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AppUser;
use App\Models\Project;
use App\Models\Reminder;
use App\Models\Task;
use App\Models\TimeEntry;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        AppUser::factory(1)->create();

        Project::factory(1)->create();

        Reminder::factory(1)->create();

        Task::factory(1)->create();

        TimeEntry::factory(1)->create();
    }
}
