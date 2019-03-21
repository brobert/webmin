<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class DatePreset extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at',
        'system',
        'selectable_by_user'
    ];

    public function scopeSystem($query)
    {
        return $query->where ( 'system', true );
    }

    public function scopeForUser($query)
    {
        return $query->where ( 'selectable_by_user', true )->has ( 'user' );
    }

    public function user()
    {
        return $this->belongsToMany ( 'App\User' );
    }
}
