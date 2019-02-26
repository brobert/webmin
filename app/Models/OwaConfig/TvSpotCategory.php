<?php

namespace App\Models\OwaConfig;

use Illuminate\Database\Eloquent\Model;


class TvSpotCategory extends Model {

    protected $connection = 'owa_config';

    protected $primaryKey = 'tv_spot_categoryid';

    public function spots() {

        return $this->belongsToMany('App\Models\OwaConfig\TvSpot', 'tv_spots_tv_spot_categories', 'tv_spot_categoryid', 'tv_spotid');
    }
}
