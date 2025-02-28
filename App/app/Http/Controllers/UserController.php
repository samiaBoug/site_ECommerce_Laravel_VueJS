<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function update(Request $request)
{
    $user = Auth::user();
    if (!$user) {
        return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
    }

    $validatedData = $request->validate([
        "name"  => 'required|string|max:255',
        "email" => 'required|email|unique:users,email,' . $user->id,
        "password" => 'sometimes|string|min:6'
    ]);

    try {
        $updatedUser = $this->userService->updateUser($user->id, $validatedData);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'user' => $updatedUser
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to update user: ' . $e->getMessage()
        ], 500);
    }
}
}
