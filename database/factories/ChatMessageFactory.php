<?php
use Faker\Generator as Faker;

$factory->define(App\Models\ChatMessage::class, function (Faker $faker) {
    return [
        'message' => $faker->paragraph()
    ];
});
