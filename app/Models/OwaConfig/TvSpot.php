<?php

namespace App\Models\OwaConfig;

use Illuminate\Database\Eloquent\Model;


class TvSpot extends Model {

    protected $connection = 'owa_config';

    protected $primaryKey = 'tv_spotid';

    public function categories() {

        return $this->belongsToMany('App\Models\OwaConfig\TvSpotCategory', 'tv_spots_tv_spot_categories', 'tv_spotid', 'tv_spot_categoryid');
    }
}
