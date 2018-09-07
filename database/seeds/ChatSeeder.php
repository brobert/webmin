<?php
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
class ChatSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        factory(App\Models\Chat::class, 50)->create()->each(function ($chat) {
            $faker = Faker::create();
            $user_1 = $faker->numberBetween(1, 10);
            $user_2 = $faker->numberBetween(11, 50);
            $chat->users()->attach([
                $user_1,
                $user_2
            ]);

            // $chat->messages()->saveMany(factory(App\Models\ChatMessage::class, $faker->randomDigit(0, 15))->make());

            $chat->save();
        });
    }
}
