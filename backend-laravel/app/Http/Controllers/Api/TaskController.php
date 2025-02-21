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

    public function assignTask(Request $request)
    {
        $task = Task::findOrFail($request->task_id);
        $task->user_id = $request->user_id;
        $task->save();

        return response()->json(['message' => 'Task assigned successfully']);
    }

    public function updateStatus(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->status = $request->status;
        $task->save();
    
        return response()->json(['message' => 'Task status updated successfully']);
    }
}
