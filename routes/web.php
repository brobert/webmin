<?php

/*
 * |--------------------------------------------------------------------------
 * | Web Routes
 * |--------------------------------------------------------------------------
 * |
 * | Here is where you can register web routes for your application. These
 * | routes are loaded by the RouteServiceProvider within a group which
 * | contains the "web" middleware group. Now create something great!
 * |
 */
Route::get('/', function () {
    return view('index');
});
Route::get('/home', function () {
    return view('index');
});

Route::middleware('auth')->prefix('res')->namespace('Api')->group(function () {
    Route::resources([
        'chat' => 'ChatController',
        'chat_message' => 'ChatMessageController'
    ]);
});
// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

Route::fallback(function () {
    return View::make('index');
});
