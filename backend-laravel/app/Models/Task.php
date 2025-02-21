<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'status', 'priority', 'deadline', 'app_user_id', 'project_id', 'forDeleting'];

    public function user()
    {
        return $this->belongsTo(AppUser::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function timeEntries()
    {
        return $this->hasMany(TimeEntry::class);
    }

    public function reminders()
    {
        return $this->hasMany(Reminder::class);
    }
}
