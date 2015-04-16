<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function(){

    Route::get('/', 'AdminController@index');

    Route::resource('answers', 'AnswerController');

});

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::group(['prefix' => 'api', 'namespace' => 'Api'], function() {

    Route::group(['prefix' => 'v1', 'namespace' => 'V1'], function() {

        Route::resource('answers', 'AnswerController');

    });

});
