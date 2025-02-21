<?php

namespace App\Http\Controllers\Api;

use App\Models\AppUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AppUserController extends Controller
{
    public function index() {
        return AppUser::all();
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:app_users,email',
            'password' => 'required|min:6',
        ]);

        return AppUser::create($request->all());
    }

    public function show(AppUser $appUser) {
        return $appUser;
    }

    public function update(Request $request, AppUser $appUser) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'nullable|min:6',
        ]);

        $appUser->update($request->all());
        return $appUser;
    }

    public function destroy(AppUser $appUser) {
        $appUser->delete();
        return response()->noContent();
    }
}

