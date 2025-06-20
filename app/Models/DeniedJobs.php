<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeniedJobs extends Model
{
   protected $fillable=
    [
        'id',
        'title',
        'description',
        'denial_reason'

    ];
}
