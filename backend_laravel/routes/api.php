<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TimeEntryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public auth routes (ne zahtevaju token)
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Protected routes (zahtevaju token)
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth routes
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);
    
    // API routes with prefix v1
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
    
});


// Optional: API documentation route (public)
Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the API',
        'version' => '1.0',
        'endpoints' => [
            'auth' => [
                'POST /api/register' => 'Register a new user',
                'POST /api/login' => 'Login user',
                'POST /api/logout' => 'Logout user (protected)',
                'GET /api/user' => 'Get current user (protected)',
            ],
            'v1' => [
                'GET /api/v1/users' => 'List users (protected)',
                'GET /api/v1/categories' => 'List categories (protected)',
                'GET /api/v1/tasks' => 'List tasks (protected)',
                'GET /api/v1/time-entries' => 'List time entries (protected)',
            ]
        ]
    ]);
});