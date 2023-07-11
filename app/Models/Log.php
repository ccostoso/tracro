<?php

namespace App\Models;

use App\Models\Food;
use App\Models\User;
use App\Models\Statistic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Log extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function statistics() {
        return $this->hasOne(Statistic::class);
    }

    public function food() {
        return $this->belongsToMany(Food::class);
    }
}
