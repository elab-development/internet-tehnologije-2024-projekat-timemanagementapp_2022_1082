<?php

namespace App\Http\Controllers\Api;

use App\Models\Reminder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReminderController extends Controller
{
    public function index() {
        return Reminder::all();
    }

    public function store(Request $request) {
        $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'reminder_time' => 'required|date',
        ]);

        return Reminder::create($request->all());
    }

    public function show(Reminder $reminder) {
        return $reminder;
    }

    public function update(Request $request, Reminder $reminder) {
        $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'reminder_time' => 'required|date',
        ]);

        $reminder->update($request->all());
        return $reminder;
    }

    public function destroy(Reminder $reminder) {
        $reminder->delete();
        return response()->noContent();
    }


}

