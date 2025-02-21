<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AppUserController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ReminderController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TimeEntryController;


Route::apiResource('app-users', AppUserController::class);
Route::apiResource('projects', ProjectController::class);
Route::apiResource('reminders', ReminderController::class);
Route::apiResource('tasks', TaskController::class);
Route::apiResource('time-entries', TimeEntryController::class);