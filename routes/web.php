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

  Route::get('newpage', 'PageController@create')->name('page.create');
  Route::post('storepage', 'PageController@store')->name('page.store');
  Route::get('editpage/{page_id}', 'PageController@edit')->name('page.edit');
  Route::post('updatepage/{page_id}', 'PageController@update')->name('page.update');
  Route::post('destroypage/{id}', 'PageController@destroy');
  Route::post('publicationpage/{id}', 'PageController@switchPublication');

  Route::resource('type', 'TypeController', ['except' => ['show']]);
  Route::get('insert-type/{type_name}', 'TypeController@showInsertForm')->name('type.insertform');
  Route::post('insert-type/{type_id}', 'TypeController@insertType')->name('type.insert');

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
  Route::post('change-type-content/{id}', 'RubriqueController@changeTypeContents');

  Route::post('redactorimgupload', 'RedactorController@uploadImage');
  Route::get('imagemanager', 'RedactorController@imageManager');


  Route::get('{page_title}', 'PageController@backShow')->name('back_page.show');
  Route::get('home', function () { return redirect()->route('back_page.show', 'accueil'); });
  Route::get('', function () { return redirect()->route('back_page.show', 'accueil'); });
});

Route::post('mail', 'PageController@mailFromContact')->name('page.mail');
Route::get('get-type-contents/{type}', 'RubriqueController@getTypeContents');
Route::get('get-type-content/{type}/{id_rubrique}', 'RubriqueController@showTypeContentPage')->name('type_content');

Route::get('/{page_title}', 'PageController@show')->name('page.show');

/*
Route::get('testdrop', function (){
    return view('back.testdrop');
});
 */
Route::get('/home', function () { return redirect()->route('page.show', 'accueil'); });
Route::get('/', function () { return redirect()->route('page.show', 'accueil'); });
