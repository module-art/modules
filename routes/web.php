<?php

use Illuminate\Support\Facades\Route;

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
Route::group(array('prefix' => 'coulisses', 'middleware' => ['auth']), function () {

  Route::resource('user', 'UserController', ['except' => ['show']]);
  
  Route::get('filemanager', 'PageController@filemanager')->name('filemanager');

  Route::get('pages', 'PageController@index')->name('page.index');
  Route::get('newpage', 'PageController@create')->name('page.create');
  Route::post('storepage', 'PageController@store')->name('page.store');
  Route::get('editpage/{page_id}', 'PageController@edit')->name('page.edit');
  Route::post('updatepage/{page_id}', 'PageController@update')->name('page.update');
  Route::delete('destroypage/{id}', 'PageController@destroy')->name('page.destroy');
  Route::post('publicationpage/{id}', 'PageController@switchPublication');

  Route::resource('type', 'TypeController', ['except' => ['show']]);//->middleware('authAsMaintainer')
  Route::put('type-field/{type_id}', 'TypeController@updateField');
  Route::get('insert-type/{type_name}', 'TypeController@showInsertForm')->name('type.insertform');
  Route::get('insert-type/{type_name}/{rubrique_id}', 'TypeController@editInsertForm')->name('type.editInsert');
  Route::post('insert-type/{type_id}', 'TypeController@insertType')->name('type.insert');
  Route::get('inserted-type-index/{type_id}', 'TypeController@insertedTypeIndex')->name('type.insertedIndex');
  Route::post('insert-type/{type_id}/{rubrique_id}', 'TypeController@updateInsertedType')->name('type.insertUpdate');
  Route::post('destroyinsertedrubrique/{id}', 'TypeController@destroyInsertedRubrique');
  Route::get('get-galleries', 'TypeController@getGalleries')->middleware('ajax');
  Route::post('publicationcontent/{id}', 'TypeController@switchPublication')->middleware('ajax');
  Route::post('archivecontent/{id}', 'TypeController@switchArchivage')->middleware('ajax');
  Route::post('sorttyperubriques/{type_id}', 'TypeController@sortTypeRubriques')->middleware('ajax');

  Route::resource('categorie', 'CategorieController', ['except' => ['create']]);
  Route::post('categorie/{id}/detach', 'CategorieController@detach')->middleware('ajax');
  Route::post('categorie/{type_id}/attach', 'CategorieController@attach')->middleware('ajax');
  Route::post('categorie_suggest/{type_id}', 'CategorieController@suggest')->middleware('ajax');

  Route::post('bloc/{id}', 'BlocController@update');
  Route::post('destroybloc/{id}', 'BlocController@destroy');
  Route::get('partial_bloc/{id}', 'BlocController@partialShow');
  Route::get('partial_drag/{id}', 'BlocController@partialShowDrag');
  Route::post('list-galleries', 'BlocController@listGalleries')->middleware('ajax');

  Route::get('rubriques/{page_id}', 'RubriqueController@index')->name('rubrique.index');
  Route::post('rubrique/{id}', 'RubriqueController@update');
  Route::post('destroyrubrique/{id}', 'RubriqueController@destroy');
  Route::post('cols/{id}', 'RubriqueController@colsChange');
  Route::post('newrubrique/{id}', 'RubriqueController@newRubrique');
  Route::get('partial/coulisses/rubrique/{id}', 'RubriqueController@partialShow');
  Route::post('ascdesc/{id}', 'RubriqueController@switchOrder');
  Route::post('moveblock/{id}', 'RubriqueController@moveBlock');
  Route::post('change-type-content/{id}', 'RubriqueController@changeTypeContents');
  Route::post('publicationrubrique/{id}', 'RubriqueController@switchPublication');
  Route::post('sortpagerubriques/{page_id}', 'RubriqueController@sortRubriques');
  
  Route::resource('mail', 'MailController');

  //Route::post('redactorimgupload', 'RedactorController@uploadImage');
  //Route::get('imagemanager', 'RedactorController@imageManager');
  Route::post('get-gallery', 'RedactorController@getGallery');
  
  Route::get('', 'PageController@goHome')->name('page.home');
  Route::get('{page_title}', 'PageController@show')->name('back_page.show')->middleware('authAsAdmin');
});

Route::get('rgpd-notice', function () {
  return response('ok', 200)->cookie('no_rgpd', 'ok', 43200);
});
Route::post('mail', 'PageController@mailFromContact')->name('page.mail');
Route::get('get-type-contents/{type}', 'RubriqueController@getTypeContents');
Route::get('{type}/{id_rubrique}/{title?}', 'RubriqueController@showTypeContentPage')->name('type_content');

/*
Route::get('testdrop', function (){
    return view('back.testdrop');
});
 */
Route::get('/', 'PageController@goHome')->name('page.home');
Route::get('/home', function () { return redirect()->route('page.home'); });

Route::get('/{page_title}', 'PageController@show')->name('page.show');
