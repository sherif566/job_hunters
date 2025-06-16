<?php

use App\Http\Controllers\ProfileController;
use App\Models\JobPost;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Middleware\HandleInertiaRequests;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::get('/test-user', function (Request $request) {
    return dd($request->user());
});

Route::get('/', function () {
    return redirect('/job-posts');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', HandleInertiaRequests::class])->name('dashboard');


Route::get('job-posts', function () {
    $jobPosts = JobPost::all();
    return Inertia::render('JobPosts', ['jobPosts' => $jobPosts]);
});


Route::get('/job-posts/create', function () {
    return Inertia::render('JobCreate');
});

//create a job
Route::post('/job-posts', function (Request $request) {
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string'
    ]);

    JobPost::create($validated);
    return Inertia::location('/job-posts');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
