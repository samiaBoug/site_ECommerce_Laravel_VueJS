<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController; // Add UserController
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::prefix('api')->group(function () {
    Route::resource('products', ProductController::class);
    Route::resource('users', UserController::class); // Add API routes for users
});


Route::get('/{vue_capture?}', function () {
    return view('welcome');
})->where('vue_capture', '[\/\w\.-]*');



Route::resource('/products', ProductController::class);

// Routes for user management (e.g., dashboard)
Route::resource('/users', UserController::class); // Add resource route for users

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
