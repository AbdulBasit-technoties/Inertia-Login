<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/dashboard');
    } else {
        return redirect('/login');
    }
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', []);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->prefix('dashboard')->group(function () {

    Route::resource('roles', RoleController::class);
    Route::resource('users', UserController::class);
    Route::patch('/users/{id}/edit/password', [UserController::class, 'password_update'])->name('users.password');
    Route::resource('settings', SettingController::class);
    Route::post('settings/{setting}/image', [SettingController::class, 'Image'])->name('settings.image');
    Route::post('settings/{setting}/favicon', [SettingController::class, 'Favicon'])->name('settings.favicon');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile-image', [ProfileController::class, 'ProfileImage'])->name('profileimage');
    Route::post('/profile/image/{id}', [ProfileController::class, 'image'])->name('user.image');
    Route::post('/notifications/read/{id}', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
