<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;


class ConfigController extends ApiController {

    public function datePresets(Request $request) {

        return [
            'user' => [
                [
                    'name' => 'custom_1'
                ],
                [
                    'name' => 'custom_2'
                ],
                [
                    'name' => 'custom_3'
                ],
                [
                    'name' => 'custom_4'
                ]
            ],
            'system' => [
                [
                    'name' => 'system_1'
                ],
                [
                    'name' => 'system_2'
                ],
                [
                    'name' => 'system_3'
                ],
                [
                    'name' => 'system_4'
                ],
                [
                    'name' => 'system_5'
                ]
            ]
        ];
    }
}
