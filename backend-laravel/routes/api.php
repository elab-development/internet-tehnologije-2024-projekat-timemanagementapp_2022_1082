<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AppUserController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ReminderController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TimeEntryController;


// Resource rute u kojima se nalaze sve CRUD Operacije
Route::apiResource('app-users', AppUserController::class);
Route::apiResource('projects', ProjectController::class);
Route::apiResource('reminders', ReminderController::class);
Route::apiResource('tasks', TaskController::class);
Route::apiResource('time-entries', TimeEntryController::class);

// 3 Razlicite API rute
Route::get('user-projects/{userId}', [ProjectController::class, 'getUserProjects']);
Route::post('assign-task', [TaskController::class, 'assignTask']);
Route::put('tasks/{id}/update-status', [TaskController::class, 'updateStatus']);