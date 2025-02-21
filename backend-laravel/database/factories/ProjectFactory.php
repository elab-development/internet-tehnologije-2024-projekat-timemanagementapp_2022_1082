<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\AppUser;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'description' => $this->faker->sentence,
            'app_user_id' => AppUser::factory(),  // Povezivanje sa `AppUser` modelom
        ];
    }
}
