<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


class CreateChatsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {

        $this->down();

        Schema::create('chats', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100);
            $table->enum('status', [
                'active',
                'closed'
            ])->default('active');
            $table->timestamps();
        });

        Schema::create('chat_user', function (Blueprint $table) {
            $table->integer('chat_id')->unsigned();
            $table->foreign('chat_id')->references('id')->on('chats')->onDelete('cascade');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });

        Schema::create('chat_messages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id', false, true);
            $table->integer('chat_id', false, true);
            $table->text('message');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('chat_id')->references('id')->on('chats');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {

        Schema::dropIfExists('chat_messages');
        Schema::dropIfExists('chat_user');
        Schema::dropIfExists('chats');
    }
}
