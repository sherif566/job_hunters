<?php

use App\Http\Controllers\ProfileController;
use App\Models\JobPost;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\IsAdmin;
use App\Http\Controllers\JobPostsController;
use App\Models\DeniedJobs;
use App\Notifications\JobStatusChanged;



Route::get('/', function () {
    return redirect('/login');
});



Route::middleware(['auth', \App\Http\Middleware\HandleInertiaRequests::class])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/job-posts', [JobPostsController::class, 'index'])->name('jobposts');
    Route::get('/job-posts/create', [JobPostsController::class, 'create'])->name('jobcreate');
    Route::post('/job-posts', [JobPostsController::class, 'store'])->name('job.store');
    Route::get('/my-jobs', function () {
        $jobs = auth()->user()->jobPosts()->latest()->get();

        return Inertia::render('MyJobs', [
            'jobs' => $jobs,
        ]);
    })->name('user.jobs');
});


Route::middleware(['auth', IsAdmin::class])->group(function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('AdminDashboard');
    })->name('admin.dashboard');


    Route::get('/admin/jobs', function () {
        $jobs = JobPost::where('status', 'pending')->get();
        return Inertia::render('Admin/JobApprovals', [
            'jobs' => $jobs,
        ]);
    })->name('admin.pending.jobs')->middleware(['auth', \App\Http\Middleware\HandleInertiaRequests::class]);

    Route::post('/admin/jobs/{id}/approve', function ($id) {
        $job = JobPost::findOrFail($id);
        $user = $job->user;
        $job->status = 'approved';
        $job->save();

        $jobs = \App\Models\JobPost::where('status', 'pending')->get();
        $user->notify(new JobStatusChanged('approved'));

        return response()->json(['success' => true]);
    })->name('admin.jobs.approve');

    Route::post('/admin/jobs/{id}/disapprove', function ($id, Request $request) {
        $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $job = JobPost::findOrFail($id);
        $user = $job->user;
        $job->status = 'denied';
        DeniedJobs::create([
            'id' => $id,
            'title' => $request->title,
            'description' => $request->description,
            'denial_reason' => $request->reason,
        ]);

        $job->delete();
        $user->notify(new JobStatusChanged('denied', $request->reason));

        return response()->json(['success' => true]);
    })->name('admin.jobs.disapprove');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
