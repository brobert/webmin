<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class DatePreset extends Model {

    public function scopeSystem($query) {

        return $query->where('system', true);
    }

    public function scopeForUser($query) {

        return $query->where('selectable_by_user', true);
    }

    public function user() {

        return $this->belongsToMany('App\User');
    }
}
