<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\TypeRequest;
use App\Repositories\FooterRepository;
use App\Repositories\MenusRepository;
use App\Models\Type;
use App\Models\Rubrique;
use App\Models\Bloc;
use Storage;
use ModuleControl;

class TypeController extends Controller
{
  
  public function __construct(FooterRepository $footerRepository, MenusRepository $menusRepository,  ModuleControl $module_control)
  {
    $this->footerRepository = $footerRepository;
    $this->menusRepository = $menusRepository;
    $this->middleware('authAsAdmin');
    $this->nbrPerPage = $module_control->nbrPerPage;
    $this->moduleControl = $module_control;
  }

  private function validateInsertion($inputs, $json_fields){

    $rules = [];
    $messages = [];
    foreach($json_fields as $field){//validation
      $field_name = preg_replace('/\s/', '_', $field->name);
      if($field->type == 'date'){
        $rules[$field_name] = 'date_format:d/m/Y';
        $messages[$field_name.'.date_format'] = 'Le champ :attribute doit être une date ex: 15/08/2004.';
      }else if($field->type == 'time'){
        $rules[$field_name] = 'date_format:H:i';
        $messages[$field_name.'.date_format'] = 'Le champ :attribute doit être une heure ex: 15:45.';
      }else if($field->type == 'nb'){
        $rules[$field_name] = 'numeric';
      }
    }
    return Validator::make($inputs, $rules, $messages);
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
    $json_fields = json_decode($request->champs)->fields;
    $array_fields = array();
    foreach($json_fields as $field){//prepare csv
      $array_fields[] = $field->name;
    }

    foreach($json_fields as $field){//remove isNew properties
      unset($field->isNew);
    }
    $json_fields =(object) array("fields" => $json_fields);
    $inputs = [
      "content_type" => $request->content_type,
      "champs" => implode(', ', $array_fields),
      "json_fields" => json_encode($json_fields, JSON_UNESCAPED_UNICODE),
      "default_filtre" => $request->default_filtre,
      "descendant" => $request->has('descendant') ? 1 : 0,
      "available" => $request->has('available') ? 1 : 0,
      "nb_per_page" => $request->nb_per_page,
      "child_of" => $request->has('child_of') ? $request->child_of : 0
    ];

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
    $this->moduleControl->moveCsvToJsonFields($type);
    $types = Type::all();
    $operation = 'edit';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    $model = 'type';
    $fields =  json_decode($type->json_fields)->fields;
    return view('common.back.form', compact('type', 'menus', 'operation', 'footer', 'model', 'fields', 'types'));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function updateField(Request $request, $id)
  {
    $type = Type::findOrFail($id);
    $type_fields = json_decode($type->json_fields)->fields;
    $field_match = 0;
    foreach($type_fields as $i => $field){//update field
      if( $field->name == $request->oldField){
        $type_fields[$i]->name = $request->newField;
        $type_fields[$i]->type = $request->newType;
        break;
      }
    }
    foreach($type_fields as $i => $field){//search duplicates
      if($field->name == $request->newField){
        $field_match++;
      }
    }
    if($field_match > 1){
      return response()->json([ 'error' => 'Il y a déjà un champ '.$request->newField.'.' ]);
    }
    $json_fields =(object) array("fields" => $type_fields);
    //return response()->json($json_fields);
    $type->json_fields = json_encode($json_fields, JSON_UNESCAPED_UNICODE);
    //return response()->json(['json' => json_encode($json_fields, JSON_UNESCAPED_UNICODE)]);
    $array_fields_new = array();
    foreach($json_fields->fields as $new_field){
      $array_fields_new[] = $new_field->name;
    }
    $type->champs = implode(', ', $array_fields_new);
    $type->save();

    foreach($type->blocs()->where('type', $request->oldField)->get() as $bloc){
      $bloc->type = $request->newField;
      $bloc->save();
      //$test[] = $bloc;
    }
    return response()->json(['response' => $request->all()]);
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

    //gestion des champs avec json
    $json_fields_old = json_decode($type->json_fields);
    $json_fields_new = json_decode($request->champs);
    $old_length = count($json_fields_old->fields);
    $new_length = count($json_fields_new->fields);
    $array_fields_new = array();
    foreach($json_fields_new->fields as $new_field){
      $array_fields_new[] = $new_field->name;
    }

    $duplicates = array_unique( array_diff_assoc( $array_fields_new, array_unique( $array_fields_new ) ) );
    if(count($duplicates) > 0){
      return back()->withError('Deux champs ne peuvent pas porter le même nom.');
    }

    if($type->json_fields != $request->champs){

      if($old_length > $new_length){//suppression de champs
        //$test[] = 'suppression';

        $array_fields_old = array();
        foreach($json_fields_old->fields as $old_field){
          $array_fields_old[] = $old_field->name;
        }
        
        $removed_fields = array_diff($array_fields_old, $array_fields_new);
        //dd($removed_fields);

        foreach($type->rubriques as $typed_rubrique){
          foreach($removed_fields as $removed_field){
            foreach($typed_rubrique->blocs()->where('type', $removed_field)->get() as $bloc){
              $bloc->delete();
              //$test[] = $bloc;
            }
          }
        }

        //dd($test);

      }elseif($old_length < $new_length){//ajout de champs
        //$test[] = 'ajout';

        $place = $old_length + 1;
        foreach($json_fields_new->fields as $new_field){
          if(isset($new_field->isNew) && $new_field->isNew){
            foreach($type->rubriques as $typed_rubrique){
              $new_bloc = [
                'contenu' => 'Non renseigné',
                'place' => $place,
                'type' => $new_field->name,
                'rubrique_id' => $typed_rubrique->id
              ];
              Bloc::create($new_bloc);
              //$test[] = $new_bloc;
            }
            $place++;
          }
        }
        //dd($test);
      }
    }

    foreach($json_fields_new->fields as $field){//remove isNew properties
      unset($field->isNew);
    }

    $inputs = [
      "content_type" => $request->content_type,
      "champs" => implode(', ', $array_fields_new),
      "json_fields" => json_encode($json_fields_new, JSON_UNESCAPED_UNICODE),
      "default_filtre" => $request->default_filtre,
      "descendant" => $request->has('descendant') ? 1 : 0,
      "available" => $request->has('available') ? 1 : 0,
      "nb_per_page" => $request->nb_per_page,
      "child_of" => $request->child_of
    ];

    //dd($inputs);
    $type->update($inputs);

    foreach($type->rubriques as $rubrique){
      $rubrique->contenu = $request->content_type;
      $rubrique->save();
    }

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

  public function insertedTypeIndex($type_id)
  {
    $operation = 'index';
    $type = Type::findOrFail($type_id);
    $this->moduleControl->moveCsvToJsonFields($type);

    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();

    $champs = explode(',', $type->champs);
    $json_fields = json_decode($type->json_fields)->fields;
    $results = $this->moduleControl->getSortedTypeRubriques($type, $type->default_filtre, $type->descendant, true);// results utilisable avec un foreach;

    return view('common.back.insertedTypeIndex', compact('type', 'results', 'json_fields', 'menus', 'operation', 'footer'));
  }

  public function showInsertForm($type_name)
  {
    $operation = 'insert';
    $model = 'type';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    $type = Type::where('content_type', $type_name)->first();
    $this->moduleControl->moveCsvToJsonFields($type);
    $champs = explode(',', $type->champs);
    $json_fields = json_decode($type->json_fields);
    $nb_champs = count($json_fields->fields);
    
    $galleries = $this->moduleControl->getGalleriesArray();

    if($type->child_of > 0){
      $parent_type = Type::findOrFail($type->child_of);
      return view('common.back.form', compact('type', 'parent_type', 'champs', 'json_fields', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries'));
    }

    return view('common.back.form', compact('type', 'champs', 'json_fields', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries'));
  }

  public function getGalleries(){
    
    $galleries = $this->moduleControl->getGalleriesArray();

    return view('common.back.inc.galleries', compact('galleries'));

  }

  public function insertType(Request $request, $type_id)
  {
    //dd($request->all());
    $type = Type::findOrFail($type_id);
    $type_name = $type->content_type;
    $json_fields = json_decode($type->json_fields)->fields;

    $validator = $this->validateInsertion($request->all(), $json_fields);
    if ($validator->fails()) {
      return back()->withErrors($validator)->withInput();
    }

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
      if(preg_match('/categorie/', $key)){
        $typed_rubrique->categories()->attach((int)$value);
      }else{
        $key = preg_replace('/_/', ' ', $key);
        foreach($json_fields as $field){
          if($field->name == $key) $field_type = $field->type;
        }
        if($field_type == 'date'){
          $value = preg_replace('/^(\d{2})\/(\d{2})\/(\d{4})$/', '$3-$2-$1', $value);
        }elseif($field_type == 'time'){
          $value = preg_replace('/^(\d{2}:\d{2})$/', '$1:00', $value);
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
    $this->moduleControl->moveCsvToJsonFields($type);
    $champs = explode(',', $type->champs);
    $json_fields = json_decode($type->json_fields);
    $nb_champs = count($json_fields->fields);

    $galleries = $this->moduleControl->getGalleriesArray();

    if($type->child_of > 0){
      $parent_type = Type::findOrFail($type->child_of);
      return view('common.back.form', compact('type_content', 'type', 'parent_type', 'champs', 'json_fields', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries', 'categories_ids'));
    }

    return view('common.back.form', compact('type_content', 'type', 'champs', 'json_fields', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries', 'categories_ids'));
  }

  public function updateInsertedType(Request $request, $type_id, $id)
  {

    $type_content = Rubrique::findOrFail($id);
    $type = Type::findOrFail($type_id);
    $type_name = $type->content_type;
    $json_fields = json_decode($type->json_fields)->fields;

    $validator = $this->validateInsertion($request->all(), $json_fields);
    if ($validator->fails()) {
      return back()->withErrors($validator)->withInput();
    }

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
        foreach($json_fields as $field){
          if($field->name == preg_replace('/_/', ' ', $key)) $field_type = $field->type;
        }
        if($field_type == 'date'){
          $value = preg_replace('/^(\d{2})\/(\d{2})\/(\d{4})$/', '$3-$2-$1', $value);
        }elseif($field_type == 'time'){
          $value = preg_replace('/^(\d{2}:\d{2})$/', '$1:00', $value);
        }
        $type_content->blocs()->where('type', preg_replace('/_/', ' ', $key))->first()->update([
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

    //return redirect()->route('type.insertUpdate', [$type_name, $id])->withInfo('La modification s\'est bien déroulée.');
    return redirect()->route('type.insertedIndex', [$type->id])->withInfo('La modification s\'est bien déroulée.');
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
