<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model {
    public function messages() {
        return $this->hasMany('App\Models\ChatMessage');
    }
    public function users() {
        return $this->belongsToMany('App\User');
    }
}
