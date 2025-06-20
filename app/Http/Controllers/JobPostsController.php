<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPostsController extends Controller
{
    public function index()
    {
        $jobPosts = JobPost::where('is_approved', true)->get();
        return Inertia::render('JobPosts', ['jobPosts' => $jobPosts]);
    }

    public function create()
    {
        return Inertia::render('JobCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $request->user()->jobPosts()->create($validated);
        return redirect()->route('dashboard');
    }
}

