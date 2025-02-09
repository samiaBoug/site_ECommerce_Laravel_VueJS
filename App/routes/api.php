<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\client\ClientProfileController;

Route::get('/client/profile', function (Request $request) {
    // Hardcoded user data
    $user = [
        'id' => 1,
        'name' => 'John Doe',
        'email' => 'john.doe@example.com',
        'phone' => '123-456-7890',
        'created_at' => now()->toDateTimeString(),
        'updated_at' => now()->toDateTimeString(),
    ];

    return response()->json([
        'success' => true,
        'user' => $user,
    ]);
});
Route::put('/client/profile', [ClientProfileController::class, 'update']);
