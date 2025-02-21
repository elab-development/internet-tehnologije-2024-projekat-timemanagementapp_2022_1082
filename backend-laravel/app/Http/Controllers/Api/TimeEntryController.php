<?php

namespace App\Http\Controllers\Api;

use App\Models\TimeEntry;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TimeEntryController extends Controller
{
    public function index() {
        return TimeEntry::all();
    }

    public function store(Request $request) {
        $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date',
        ]);

        return TimeEntry::create($request->all());
    }

    public function show(TimeEntry $timeEntry) {
        return $timeEntry;
    }

    public function update(Request $request, TimeEntry $timeEntry) {
        $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date',
        ]);

        $timeEntry->update($request->all());
        return $timeEntry;
    }

    public function destroy(TimeEntry $timeEntry) {
        $timeEntry->delete();
        return response()->noContent();
    }
}
