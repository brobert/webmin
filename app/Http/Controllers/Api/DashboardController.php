<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use Faker\Factory as Faker;


class DashboardController extends ApiController {

    public function getBarData(Request $request) {

        $products = $request->session()->get('barProducts', function () {
            $faker = Faker::create();
            $newProducts = [];
            for($i = 1; $i <= 3; $i++) {
                $newProducts [] = $faker->company;
            }

            return $newProducts;
        });

        if (!$request->session()->has('barProducts')) {
            $request->session()->put('barProducts', $products);
        }

        $labels = [];
        $datasets = [];

        for($m = 1; $m <= 12; ++$m) {
            $labels [] = date('F', mktime(0, 0, 0, $m, 1));
        }

        $faker = Faker::create();

        foreach ( $products as $prod ) {
            $color = $faker->hexcolor;
            $datasets [] = [
                'label' => $prod,
                'backgroundColor' => $color,
                'borderColor' => $color,
                'data' => array_map(function ($month) {
                    $faker = Faker::create();
                    return $faker->randomFloat(2, 0, 1000);
                }, $labels)
            ];
        }

        return [
            'labels' => $labels,
            'datasets' => $datasets
        ];
    }
}
