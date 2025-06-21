<?php

namespace App\Http\Controllers;
use Illuminate\Validation\Rules\Enum;
use App\Enums\JobType;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPostsController extends Controller
{
    public function index()
    {
        $jobPosts = JobPost::where('status', 'approved')->get();
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
            'description' => 'required|string|max:1000',
            'company_name' => 'required|string|max:255',
            'job_type' =>['required',new Enum(JobType::class)],
            'category'=>'required|string',
            'salary_min'=>'required|numeric|min:0',
            'salary_max'=>'required|numeric|min:0|gte:salary_min',
            'company_website'=>'required|url',
            'location' => 'required|string|max:255',


        ]);
        $validated['status'] = 'pending';
        $validated['user_id'] = auth()->id();

        $request->user()->jobPosts()->create($validated);
        return redirect()->route('dashboard');
    }
}
