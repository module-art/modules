<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

//Admin Group
Route::group(array('prefix' => 'coulisses', 'middleware' => 'auth'), function () {

  Route::resource('user', 'UserController', ['except' => ['show']]);

  Route::get('newpage', 'PageController@create')->name('add_page');
  Route::post('storepage', 'PageController@store')->name('store_page');
  Route::get('editpage/{id}', 'PageController@edit')->name('edit_page');
  Route::post('updatepage/{page_id}', 'PageController@update')->name('update_page');
  Route::post('destroypage/{id}', 'PageController@destroy');
  Route::post('publicationpage/{id}', 'PageController@switchPublication');

  Route::post('bloc/{id}', 'BlocController@update');
  Route::post('destroybloc/{id}', 'BlocController@destroy');
  Route::get('partial_bloc/{id}', 'BlocController@partialShow');
  Route::get('partial_drag/{id}', 'BlocController@partialShowDrag');

  Route::post('rubrique/{id}', 'RubriqueController@update');
  Route::post('destroyrubrique/{id}', 'RubriqueController@destroy');
  Route::post('cols/{id}', 'RubriqueController@colsChange');
  Route::post('newrubrique/{id}', 'RubriqueController@newRubrique');
  Route::get('partial/coulisses/rubrique/{id}', 'RubriqueController@partialShow');
  Route::post('ascdesc/{id}', 'RubriqueController@switchOrder');
  Route::post('moveblock/{id}', 'RubriqueController@moveBlock');

  Route::post('redactorimgupload', 'RedactorController@uploadImage');
  Route::get('imagemanager', 'RedactorController@imageManager');

  Route::get('{page_title}', 'PageController@backShow')->name('back_page.show');
Route::get('home', function () { return redirect()->route('back_page.show', 'accueil'); });
  Route::get('', function () { return redirect()->route('back_page.show', 'accueil'); });
});

Route::post('mail', 'PageController@mailFromContact')->name('page.mail');

Route::get('/{page_title}', 'PageController@show')->name('page.show');

/*
Route::get('testdrop', function (){
    return view('back.testdrop');
});
 */
Route::get('/home', function () { return redirect()->route('page.show', 'accueil'); });
Route::get('/', function () { return redirect()->route('page.show', 'accueil'); });
