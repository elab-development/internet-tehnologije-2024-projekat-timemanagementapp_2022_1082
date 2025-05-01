<?php

namespace App\Http\Controllers\Api;

use App\Models\TimeEntry;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TimeEntryController extends Controller
{
    public function index()
    {
        return response()->json(TimeEntry::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'hours' => 'required|numeric|min:0'
        ]);

        $timeEntry = TimeEntry::create($request->all());
        return response()->json($timeEntry, 201);
    }

    public function show($id)
    {
        $timeEntry = TimeEntry::findOrFail($id);
        return response()->json($timeEntry);
    }

    public function update(Request $request, $id)
    {
        $timeEntry = TimeEntry::findOrFail($id);

        $timeEntry->update($request->all());
        return response()->json($timeEntry);
    }

    public function destroy($id)
    {
        $timeEntry = TimeEntry::findOrFail($id);
        $timeEntry->delete();

        return response()->json(null, 204);
    }
}