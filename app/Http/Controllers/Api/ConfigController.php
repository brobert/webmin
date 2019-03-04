<?php

namespace App\Http\Controllers\Api;

use App\Models\DatePreset;
use Illuminate\Http\Request;


class ConfigController extends ApiController {

    public function datePresets(Request $request) {

        $datePreset = new DatePreset();
        return [
            'user' => $datePreset->forUser()->get(),
            'system' => $datePreset->system()->get(),
        ];
    }
}
