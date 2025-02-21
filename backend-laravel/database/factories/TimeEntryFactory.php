<?php

namespace Database\Factories;

use App\Models\TimeEntry;
use App\Models\Task;
use App\Models\AppUser;
use Illuminate\Database\Eloquent\Factories\Factory;

class TimeEntryFactory extends Factory
{
    protected $model = TimeEntry::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'task_id' => Task::factory(),
            'app_user_id' => AppUser::factory(),
            'start_time' => $this->faker->dateTimeThisYear,
            'end_time' => $this->faker->optional()->dateTimeThisYear,
            'duration' => $this->faker->optional()->numberBetween(1, 720),  // Nasumičan broj između 1 i 720 minuta, opcionalno
        ];
    }
}