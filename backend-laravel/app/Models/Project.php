<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'app_user_id'];

    public function user()
    {
        return $this->belongsTo(AppUser::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
