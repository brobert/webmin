<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;

// models
use App\Models\DatePreset;


class ConfigController extends ApiController {

    public function datePresets(Request $request) {

        return [
            'user' => DatePreset::user()->get(),
            'system' => DatePreset::system()->get()
        ];
    }
}
