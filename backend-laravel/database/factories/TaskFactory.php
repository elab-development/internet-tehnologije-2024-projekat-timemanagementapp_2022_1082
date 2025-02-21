<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\AppUser;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->optional()->paragraph, 
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),  
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),  
            'deadline' => $this->faker->optional()->dateTime, 
            'app_user_id' => AppUser::factory(),
            'project_id' => Project::factory(),
        ];
    }
}

