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
// use Lang;
Route::middleware('auth')->prefix('res')->namespace('Api')->group(function () {

    Route::get('auth/user', 'ApiController@getAuthUser')->name('auth.user');
    Route::resources([
        'chat' => 'ChatController',
        'tv/spot' => 'TvSpotController'
    ]);

    Route::get('chat/{chatid}/messages', 'ChatMessageController@index');
    Route::post('chat/{chatid}/message', 'ChatMessageController@store');

    Route::prefix('config')->group(function () {
        Route::prefix('user')->group(function () {
            Route::get('date_periods', 'ConfigController@datePresets');
        });
    });

    Route::prefix('dashboard')->group(function () {
        Route::get('bar-data', 'DashboardController@getBarData');
    });

    Route::get('langs', function () {

        $languages = File::directories(base_path() . '/resources/lang');

        return [
            'languages' => $languages,
            'validation' => trans('validation'),
            'lang' => Lang::locale()
        ];
    });
});
Auth::routes();

Route::middleware('auth')->group(function () {

    Route::fallback(function () {
        return View::make('index');
    });
});

Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::any('/logout', 'Auth\LoginController@logout')->name('logout');


