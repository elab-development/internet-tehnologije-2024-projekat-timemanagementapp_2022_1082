<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AppUserController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ReminderController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TimeEntryController;
use App\Http\Controllers\Api\AuthController;


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

// Auth

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// auth:sanctum je zasticena ruta
Route::middleware(['auth:sanctum'])->post('logout', [AuthController::class, 'logout']);
// POST /api/register - Za registraciju korisnika, potrebno je poslati name, email, password, i password_confirmation.
// POST /api/login - Za prijavu korisnika, potrebno je poslati email i password.
// POST /api/logout - Za odjavu korisnika, treba poslati Authorization header sa tokenom koji je dobijen prilikom login-a.