<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        // Pravi 3 razlicite kategorije
        \App\Models\Category::factory(3)->create();
    }
}