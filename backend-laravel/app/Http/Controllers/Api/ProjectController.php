<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProjectController extends Controller
{
    public function index() {
        return Project::all();
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'app_user_id' => 'required|exists:app_users,id',
        ]);

        return Project::create($request->all());
    }

    public function show(Project $project) {
        return $project;
    }

    public function update(Request $request, Project $project) {
        $request->validate([
            'name' => 'required',
            'app_user_id' => 'required|exists:app_users,id',
        ]);

        $project->update($request->all());
        return $project;
    }

    public function destroy(Project $project) {
        $project->delete();
        return response()->noContent();
    }
}

