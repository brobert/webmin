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
        'chat' => 'ChatController'
        // 'chat_message' => 'ChatMessageController',
    ]);

    Route::get('chat/{chatid}/messages', 'ChatMessageController@index');
    Route::post('chat/{chatid}/message', 'ChatMessageController@store');
});
// Auth::routes();

Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::any('/logout', 'Auth\LoginController@logout')->name('logout');

Route::fallback(function () {
    return View::make('index');
});
