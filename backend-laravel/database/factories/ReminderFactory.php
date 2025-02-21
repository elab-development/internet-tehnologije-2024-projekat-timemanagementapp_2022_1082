<?php

namespace Database\Factories;

use App\Models\Reminder;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReminderFactory extends Factory
{
    protected $model = Reminder::class;

    public function definition()
    {
        return [
            'task_id' => Task::factory(),
            'reminder_time' => $this->faker->dateTime,
            'status' => $this->faker->randomElement(['pending', 'sent']),
        ];
    }
}
