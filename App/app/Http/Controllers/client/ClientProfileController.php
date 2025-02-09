<?php

namespace App\Http\Controllers\client;

use Illuminate\Http\Request;
use App\Repositories\UserRepository;

class ClientProfileController extends Controller
{
    protected $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * Show the authenticated client's profile.
     */
    public function show()
    {
        $user = auth()->user();

        return response()->json([
            'success' => true,
            'user' => $user
        ]);
    }

    /**
     * Update the authenticated client's profile.
     */
    public function update(Request $request)
    {
        // Get the authenticated user (client)
        $user = auth()->user();

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'phone' => 'sometimes|string|max:255',
            'password' => 'sometimes|string|min:6',
        ]);

        // Update the user's profile
        $updatedUser = $this->userRepo->update($user->id, $validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully.',
            'user' => $updatedUser
        ]);
    }
}