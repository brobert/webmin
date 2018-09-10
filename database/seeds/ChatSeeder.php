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
        $faker = Faker::create();
        
        factory(App\Models\Chat::class, 50)->create()->each(function ($chat) use ($faker) {
            
            $user_1 = $faker->numberBetween(1, 10);
            $user_2 = $faker->numberBetween(11, 50);
            $chat->users()->attach([
                $user_1,
                $user_2
            ]);
            $chat->save();
            //$chat->messages()->saveMany(factory(App\Models\ChatMessage::class, $faker->randomDigit(0, 15))->make());
            
            factory(App\Models\ChatMessage::class, $faker->randomDigit(5, 15))->create()->each(function ($chatMessage) use ($faker, $chat, $user_1, $user_2) {

                $chatMessage->chat_id = $chat->id;
                $chatMessage->user_id = $faker->randomElement([$user_1, $user_2]);
                
                $chatMessage->save();
            });

            
        });
        
        $chats = App\Models\Chat::all();
        echo("-------------------------------------\n");
        echo(print_r($chats, 1));
    }
}
