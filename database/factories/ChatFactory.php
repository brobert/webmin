<?php
use Faker\Generator as Faker;

$factory->define(App\Models\Chat::class, function (Faker $faker) {
    return [
        'name' => $faker->text(50)
    ];
});
