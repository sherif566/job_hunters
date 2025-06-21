<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
         'description',
         'status',
         'company_name',
         'location',
         'salary_min',
         'salary_max',
         'job_type',
         'category',
         'company_website',
         'user_id'
        ];


    public function user()
{
    return $this->belongsTo(User::class);
}

}

