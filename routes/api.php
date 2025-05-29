<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\StudentController;

// Auth routes
Route::post('/student/login', [AuthController::class, 'studentLogin']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Announcements
    Route::get('/announcements', [AnnouncementController::class, 'index']);
    Route::get('/announcements/{department}', [AnnouncementController::class, 'byDepartment']);
    Route::post('/admin/announcements', [AnnouncementController::class, 'store']);

    // Projects
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/admin/projects', [ProjectController::class, 'store']);

    // Wishlist
    Route::get('/student/{student}/wishlist', [WishlistController::class, 'index']);
    Route::post('/student/{student}/wishlist', [WishlistController::class, 'store']);
    Route::delete('/student/wishlist/{wishlist}', [WishlistController::class, 'destroy']);

    // Students (admin only)
    Route::get('/admin/students', [StudentController::class, 'index']);
    Route::get('/admin/student-wishlists', [StudentController::class, 'wishlists']);
});