<?php

namespace Database\Factories;

use App\Models\TimeEntry;
use Illuminate\Database\Eloquent\Factories\Factory;

class TimeEntryFactory extends Factory
{
    protected $model = TimeEntry::class;

    public function definition()
    {
        return [
            'task_id' => \App\Models\Task::factory(),
            'time_spent' => $this->faker->numberBetween(30, 120),  // in minutes
            'entry_date' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
