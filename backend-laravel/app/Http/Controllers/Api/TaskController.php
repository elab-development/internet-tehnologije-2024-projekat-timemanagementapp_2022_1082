<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    public function index() {
        return Task::all();
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'project_id' => 'required|exists:projects,id',
        ]);

        return Task::create($request->all());
    }

    public function show(Task $task) {
        return $task;
    }

    public function update(Request $request, Task $task) {
        $request->validate([
            'name' => 'required',
            'project_id' => 'required|exists:projects,id',
        ]);

        $task->update($request->all());
        return $task;
    }

    public function destroy(Task $task) {
        $task->delete();
        return response()->noContent();
    }
}
