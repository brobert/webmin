<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


class CreateDatePresetsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {

        Schema::create('date_presets', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50)->index();
            $table->string('begin', 50)->nullable();
            $table->string('end', 50)->nullable();
            $table->boolean('system')->default(false)->index();
            $table->boolean('selectable_by_user')->default(false)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {

        Schema::dropIfExists('date_presets');
    }
}
