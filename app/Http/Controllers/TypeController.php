<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TypeRequest;
use App\Repositories\FooterRepository;
use App\Repositories\MenusRepository;
use App\Repositories\ControlRepository;
use App\Models\Type;
use App\Models\Rubrique;
use App\Models\Bloc;
use Storage;
use ModuleControl;

class TypeController extends Controller
{
  
  public function __construct(FooterRepository $footerRepository, MenusRepository $menusRepository, ControlRepository $controlRepository)
  {
    $this->footerRepository = $footerRepository;
    $this->menusRepository = $menusRepository;
    $this->controlRepository = $controlRepository;
    $this->middleware('authAsAdmin');
    $this->nbrPerPage = $controlRepository->nbrPerPage;
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $operation = 'index';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    $types = Type::paginate($this->nbrPerPage);

    return view('common.back.typeIndex', compact('types', 'menus', 'operation', 'footer'));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $operation = 'create';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    $model = 'type';
    $types = Type::all();
    return view('common.back.form', compact('menus', 'operation', 'footer', 'model', 'types'));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(TypeRequest $request)
  {
    $champs = preg_replace('/\s/', '_', $request->champs);
    $inputs = array_merge($request->except('champs'), ['champs' => $champs]);
    //dd($inputs);
    Type::create($inputs);
    return redirect()->route('type.index')->withInfo('Le type ' . $request->content_type . ' est crée.');
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
      //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    $type = Type::findOrFail($id);
    $types = Type::all();
    $operation = 'edit';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    $model = 'type';
    $champs = explode(',', $type->champs);
    return view('common.back.form', compact('type', 'menus', 'operation', 'footer', 'model','champs', 'types'));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(TypeRequest $request, $id)
  {
    $type = Type::findOrFail($id);
    $inputs = $request->all();
    //dd($inputs);

    //modification des champs dans les blocs
    if($type->champs != $request->champs){
      $old_champs = explode(',', $type->champs);
      $new_champs = explode(',', $request->champs);
      $old_length = count($old_champs);
      $new_length = count($new_champs);

      $difference = abs($old_length - $new_length);

      if($old_length == $new_length){//modification de nom de champ
        //$test[] = 'modif';
        for($i=0;$i<$old_length;$i++){
          if($old_champs[$i] != $new_champs[$i]){
            foreach($type->blocs()->where('type', $old_champs[$i])->get() as $bloc){
              $bloc->type = $new_champs[$i];
              $bloc->save();
              //$test[] = $bloc;
            }
          }
        }
      }elseif($old_length > $new_length){//suppression de champs
        //$test[] = 'suppression';
        $diffs = array_diff($old_champs, $new_champs);

        //vérification que des actions contradictoires n'ont pas été effectuées
        if(count($diffs) > $difference){
          return redirect()->back()->withError('Ne pas modifier des champs existants lorsqu\'on modifie le nombre de champs !');
        }

        foreach($diffs as $diff){
          foreach($type->blocs()->where('type', $diff)->get() as $bloc){
            $bloc->forceDelete();
            //$test[] = $bloc;
          }
        }
      }elseif($old_length < $new_length){//ajout de champs
        $diffs = array_diff($new_champs, $old_champs);
        //$test[] = $diffs;

        //vérification que des actions contradictoires n'ont pas été effectuées
        if(count($diffs) > $difference){
          return redirect()->back()->withError('Ne pas modifier des champs existants lorsqu\'on modifie le nombre de champs !');
        }

        $place = $old_length + 1;
        foreach($diffs as $diff){
          foreach($type->rubriques as $rubrique){
            $new_bloc = [
              'contenu' => 'Non renseigné',
              'place' => $place,
              'type' => $diff,
              'rubrique_id' => $rubrique->id
            ];
            Bloc::create($new_bloc);
            //$test[] = $new_bloc;
          }
          $place++;
        }
      }
      //return response($test);
    }

    if(!$request->has('descendant')){
      $inputs = array_merge($inputs, ['descendant' => 0]);
    }

    $type->update($inputs);

    return redirect()->route('type.index')->withInfo('Le type ' . $type->type . ' est modifié.');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $type = Type::findOrFail($id);
    $type->delete();
    return redirect()->route('type.index')->withInfo('Le type ' . $type->type . ' est supprimé.');
  }

  private function getGalleriesArray(){
    
    //get gallery folders
    $path_gallery = config('images.galeries');
    $folders = Storage::directories($path_gallery);
    $galleries = array();
    foreach($folders as $folder){
      $galleries[preg_replace('/.+\/(.+)$/', '$1', $folder )] = $folder;
    }
    return $galleries;

  }

  public function insertedTypeIndex($type_id)
  {
    $operation = 'index';
    $type = Type::findOrFail($type_id);

    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();

    $champs = explode(',', $type->champs);
    $results = ModuleControl::getSortedTypeRubriques($type, $type->default_filtre);// results utilisable avec un foreach;

    return view('common.back.insertedTypeIndex', compact('type', 'results', 'champs', 'menus', 'operation', 'footer'));
  }

  public function showInsertForm($type_name)
  {
    $operation = 'insert';
    $model = 'type';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    $type = Type::where('content_type', $type_name)->first();
    $champs = explode(',', $type->champs);
    $nb_champs = count($champs);

    $galleries = $this->getGalleriesArray();

    if($type->child_of > 0){
      $parent_type = Type::findOrFail($type->child_of);
      return view('common.back.form', compact('type', 'parent_type', 'champs', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries'));
    }

    return view('common.back.form', compact('type', 'champs', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries'));
  }

  public function getGalleries(){
    
    $galleries = $this->getGalleriesArray();

    return view('common.back.inc.galleries', compact('galleries'));

  }

  public function insertType(Request $request, $type_id)
  {
    //dd($request->all());
    $type = Type::findOrFail($type_id);
    $type_name = $type->content_type;

    $rubrique_inputs = [
      'contenu' => $type_name,
      'type_id' => $type_id,
      'publie' => $request->has('publie') ? 1 : 0,
      'archive' => $request->has('archive') ? 1 : 0,
      'parent_id' => $request->parent_id
    ];

    $typed_rubrique = Rubrique::create($rubrique_inputs);
    $rubrique_id = $typed_rubrique->id;
    $i = 1;
    
    foreach($request->except(array('_token', 'publie', 'archive', 'parent_id')) as $key => $value){
      //categories
      if(preg_match('/categorie/', $key)){
        $typed_rubrique->categories()->attach($value);
      }else{
        if(preg_match('/date/i', $key)){
          $value = preg_replace('/^(\d{2})\/(\d{2})\/(19|20)(\d{2})$/', '$3$4-$2-$1', $value);
        //}elseif(preg_match('/heure|horaire/i', $key)){
          //$value = preg_replace('/:/', '', $value);
        }
        Bloc::create([
          'contenu' => $value,
          'place' => $i,
          'type' => $key,
          'rubrique_id' => $rubrique_id,
        ]);
        $i++;
      }

    }

    return redirect()->route('type.insertform', $type_name)->withInfo('L\'insertion s\'est bien déroulée.');
  }

  public function editInsertForm($type_name, $id)
  {

    $type_content = Rubrique::findOrFail($id);
    $categories_ids = array();
    foreach($type_content->categories as $categorie){
      $categories_ids[] = $categorie->id;
    }
    //dd($type_content->blocs);
    $operation = 'insert';
    $model = 'type';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    $type = Type::where('content_type', $type_name)->first();
    $champs = explode(',', $type->champs);
    $nb_champs = count($champs);

    $galleries = $this->getGalleriesArray();

    if($type->child_of > 0){
      $parent_type = Type::findOrFail($type->child_of);
      return view('common.back.form', compact('type_content', 'type', 'parent_type', 'champs', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries', 'categories_ids'));
    }

    return view('common.back.form', compact('type_content', 'type', 'champs', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries', 'categories_ids'));
  }

  public function updateInsertedType(Request $request, $type_id, $id)
  {
    //dd($request);
    $type_content = Rubrique::findOrFail($id);
    $type = Type::findOrFail($type_id);
    $type_name = $type->content_type;

    //publication et archivage
    $type_content->publie = $request->has('publie') ? 1:0;
    $type_content->archive = $request->has('archive') ? 1:0;
    $type_content->parent_id = $request->parent_id;
    $type_content->save();

    $old_categories_ids = array();
    $new_categories_ids = array();
    foreach($type_content->categories as $categorie){
      $old_categories_ids[] = $categorie->id;
    }
    //dd($request);

    foreach($request->except(array('_token', 'publie', 'archive', 'parent_id')) as $key => $value){
      if(preg_match('/categorie/', $key)){
        $new_categories_ids[] = (int)$value;
      }else{
        if(preg_match('/date/i', $key)){
          $value = preg_replace('/^(\d{2})\/(\d{2})\/(19|20)(\d{2})$/', '$3$4-$2-$1', $value);
        }elseif(preg_match('/heure|horaire/i', $key)){
          $value = preg_replace('/:/', '', $value);
        }
        $type_content->blocs()->where('type', $key)->first()->update([
          'contenu' => $value,
        ]);
      }
    }

    //categories
    foreach(array_diff($old_categories_ids, $new_categories_ids) as $cat_id){
      $type_content->categories()->detach($cat_id);
    }
    foreach(array_diff($new_categories_ids, $old_categories_ids) as $cat_id){
      $type_content->categories()->attach($cat_id);
    }

    return redirect()->route('type.insertUpdate', [$type_name, $id])->withInfo('La modification s\'est bien déroulée.');
  }

  public function switchPublication($id)
  {
    $content = Rubrique::findOrFail($id);
    $state = $content->publie;

    if($state){
      $state = 0;
      $verbe = " n'est plus ";
    }else{
      $state = 1;
      $verbe = " est ";
    }
    
    $content->publie = $state;
    $content->save();

    return response('La rubrique '. $content->id . $verbe . 'publié.');
  }

  public function switchArchivage($id)
  {
    $content = Rubrique::findOrFail($id);
    $state = $content->archive;

    if($state){
      $state = 0;
      $verbe = " n'est plus ";
    }else{
      $state = 1;
      $verbe = " est ";
    }
    
    $content->archive = $state;
    $content->save();

    return response('Le contenu '. $content->contenu . $verbe . 'archivé.');
  }
}
