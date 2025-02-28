<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TimeEntryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// API rute sa prefiksom v1
Route::prefix('v1')->group(function () {
    // User routes
    Route::apiResource('users', UserController::class);
    
    // Category routes
    Route::apiResource('categories', CategoryController::class);
    
    // Task routes
    Route::apiResource('tasks', TaskController::class);
    
    // TimeEntry routes
    Route::apiResource('time-entries', TimeEntryController::class);
    
    // Nested routes
    Route::get('users/{user}/tasks', [TaskController::class, 'tasksByUser']);
    Route::get('users/{user}/time-entries', [TimeEntryController::class, 'timeEntriesByUser']);
    Route::get('categories/{category}/tasks', [TaskController::class, 'tasksByCategory']);
    Route::get('tasks/{task}/time-entries', [TimeEntryController::class, 'timeEntriesByTask']);
});