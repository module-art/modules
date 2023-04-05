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

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show()
  {
      //
    dd('$id');
  }

  private function validateInsertion($inputs, $json_fields){

    $rules = [];
    $messages = [];
    foreach($json_fields as $field){//validation
      //$field_name = preg_replace('/\s/', '_', $field->name);
      $field_name = $field->name;
      if($field->type == 'date'){
        $rules[$field_name] = 'date_format:d/m/Y';
        $messages[$field_name.'.date_format'] = 'Le champ :attribute doit être une date ex: 15/08/2004.';
      }else if($field->type == 'time'){
        $rules[$field_name] = 'date_format:H:i';
        $messages[$field_name.'.date_format'] = 'Le champ :attribute doit être une heure ex: 15:45.';
      }else if($field->type == 'nb'){
        $rules[$field_name] = 'nullable|numeric';
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
                'contenu' => 0,
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
    //$this->moduleControl->moveCsvToJsonFields($type);

    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();

    $champs = explode(',', $type->champs);
    $json_fields = json_decode($type->json_fields)->fields;
    $results = $this->moduleControl->getSortedTypeRubriques($type, $type->default_filtre, $type->descendant, $archive = false, true);// results utilisable avec un foreach;

    return view('common.back.insertedTypeIndex', compact('type', 'results', 'json_fields', 'menus', 'operation', 'footer'));
  }

  private function placeManagement($type){
  
    $max = $type->rubriques()->max('place');
    $total = $type->rubriques()->count();
    if($max != $total-1){
      foreach($type->rubriques()->orderBy($type->default_filtre)->get() as $y => $rubrique_to_number){
        $rubrique_to_number->place = $y;
        $rubrique_to_number->save();
      }
    }
    return $total;
  }


  /**
   * Show the form for create the specified resource.
   *
   * @param  varchar  $type_name
   * @return \Illuminate\Http\Response
   */
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

    //place management
    $total = $this->placeManagement($type);

    if($type->child_of > 0){
      $parent_type = Type::findOrFail($type->child_of);
      return view('common.back.form', compact('type', 'parent_type', 'champs', 'json_fields', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries', 'total'));
    }

    return view('common.back.form', compact('type', 'champs', 'json_fields', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries', 'total'));
  }

  public function getGalleries(){
    
    $galleries = $this->moduleControl->getGalleriesArray();

    return view('common.back.inc.galleries', compact('galleries'));

  }

  private function copyOrStoreInsert($request, $type_id, $copy = false)
  {
    $type = Type::findOrFail($type_id);
    $type_name = $type->content_type;
    $json_fields = json_decode($type->json_fields)->fields;

    $validator = $this->validateInsertion($request->all(), $json_fields);
    if ($validator->fails()) {
      return back()->withErrors($validator)->withInput();
    }

    //make placement
    $total = $type->rubriques()->count();
    $place = $request->rubrique_place;
    if($place > $total){
      $place = $total;
    }elseif($place < $total){
      foreach($type->rubriques()->where('place', '>=', $place)->get() as $rubrique_to_increase){
        $rubrique_to_increase->place = $rubrique_to_increase->place + 1;
        $rubrique_to_increase->save();
      }
    }

    $rubrique_inputs = [
      'contenu' => $type_name,
      'type_id' => $type_id,
      'place' => $place,
      'publie' => $request->has('publie') && !$copy ? 1 : 0,
      'archive' => $request->has('archive') ? 1 : 0,
      'parent_id' => $request->parent_id
    ];

    $typed_rubrique = Rubrique::create($rubrique_inputs);

    $rubrique_id = $typed_rubrique->id;
    $i = 1;
    
    // insert blocs for each field
    foreach($request->except(array('_token', 'publie', 'archive', 'rubrique_place', 'parent_id', 'submitbutton')) as $key => $value){
      if(preg_match('/categorie/', $key)){
        $typed_rubrique->categories()->attach((int)$value);
      }else{
        //$key = preg_replace('/_/', ' ', $key);
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

    // unchecked checkboxes
    foreach($json_fields as $field){
      //if($field->type == "checkbox" && !$request->has(preg_replace('/\s/', '_', $field->name))){
      if($field->type == "checkbox" && !$request->has($field->name)){
        Bloc::create([
          'contenu' => 0,
          'place' => $i,
          'type' => $field->name,
          'rubrique_id' => $rubrique_id,
        ]);
        $i++;
      }
    }

    return [$type_name, $rubrique_id];
  }

  public function insertType(Request $request, $type_id)
  {
    //dd($request->all());

    $typeAndRubrique = $this->copyOrStoreInsert($request, $type_id);

    return redirect()->route('type.insertUpdate', [$typeAndRubrique[0], $typeAndRubrique[1]])->withInfo('L\'insertion s\'est bien déroulée.');
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

    //place management
    $total = $this->placeManagement($type);

    if($type->child_of > 0){
      $parent_type = Type::findOrFail($type->child_of);
      return view('common.back.form', compact('type_content', 'type', 'parent_type', 'champs', 'json_fields', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries', 'categories_ids','total'));
    }

    return view('common.back.form', compact('type_content', 'type', 'champs', 'json_fields', 'nb_champs', 'model', 'menus', 'operation', 'footer', 'galleries', 'categories_ids','total'));
  }

  public function updateInsertedType(Request $request, $type_id, $id)
  {
    //dd($request->all());

    if($request->submitbutton == 'copy'){
      $copy = true;
      $typeAndRubrique = $this->copyOrStoreInsert($request, $type_id, true);//same than for store whith $copy = true
    }else{
      $copy = false;
      $type_content = Rubrique::findOrFail($id);
      $type = Type::findOrFail($type_id);
      $typeAndRubrique = [$type->content_type, $id];
      $json_fields = json_decode($type->json_fields)->fields;

      $validator = $this->validateInsertion($request->all(), $json_fields);
      if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
      }

      //make placement
      $old_place = $type_content->place;
      $new_place = $request->rubrique_place;
      if($new_place > $old_place){
        foreach($type->rubriques()->where('place', '>', $old_place)->where('place', '<=', $new_place)->get() as $rubrique_to_decrease){
          $rubrique_to_decrease->place = $rubrique_to_decrease->place - 1;
          $rubrique_to_decrease->save();
        }
      }elseif($new_place < $old_place){
        foreach($type->rubriques()->where('place', '>=', $new_place)->where('place', '<', $old_place)->get() as $rubrique_to_increase){
          $rubrique_to_increase->place = $rubrique_to_increase->place + 1;
          $rubrique_to_increase->save();
        }
      }

      //publication et archivage
      $type_content->publie = $request->has('publie') ? 1:0;
      $type_content->archive = $request->has('archive') ? 1:0;
      $type_content->place = $request->rubrique_place;
      $type_content->parent_id = $request->parent_id;
      $type_content->save();

      $old_categories_ids = array();
      $new_categories_ids = array();
      foreach($type_content->categories as $categorie){
        $old_categories_ids[] = $categorie->id;
      }

      foreach($request->except(array('_token', 'publie', 'archive', 'rubrique_place', 'parent_id', 'submitbutton')) as $key => $value){
        if(preg_match('/categorie/', $key)){
          $new_categories_ids[] = (int)$value;
        }else{
          foreach($json_fields as $field){
            //if($field->name == preg_replace('/_/', ' ', $key)) $field_type = $field->type;
            if($field->name == $key) $field_type = $field->type;
          }
          if($field_type == 'date'){
            $value = preg_replace('/^(\d{2})\/(\d{2})\/(\d{4})$/', '$3-$2-$1', $value);
          }elseif($field_type == 'time'){
            $value = preg_replace('/^(\d{2}:\d{2})$/', '$1:00', $value);
          }
          //$type_content->blocs()->where('type', preg_replace('/_/', ' ', $key))->first()->update([
          $type_content->blocs()->where('type', $key)->first()->update([
            'contenu' => $value,
          ]);
        }
      }

      // unchecked checkboxes
      foreach($json_fields as $field){
        //if($field->type == "checkbox" && !$request->has(preg_replace('/\s/', '_', $field->name))){
        if($field->type == "checkbox" && !$request->has($field->name)){
          $type_content->blocs()->where('type', $field->name)->first()->update([
            'contenu' => 0,
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
    }//end else submitbutton != copy

    $info = $copy ? 'La copie' : 'La modification';
    $info .= ' s\'est bien déroulée.';
    return redirect()->route('type.insertUpdate', [$typeAndRubrique[0], $typeAndRubrique[1]])->withInfo($info);
  }

  public function destroyInsertedRubrique($id, Request $request)
  {
    $rubrique = Rubrique::findOrFail($id);
    $type = $rubrique->type;

    //remove image if isset
    /*if(!is_null($rubrique->background_img_url)){
      $image_path = preg_replace('/^\/?storage/', 'public', $rubrique->background_img_url);
      $image_removed = Storage::delete($image_path);
    }*/
    
    //detach categories
    foreach($rubrique->categories as $category){
      $rubrique->categories()->detach($category->id);
    }
  
    if($type->default_filtre == 'place'){
      $rubriques_to_decrease = $type->rubriques()->where('place', '>', $rubrique->place)->get();
      if($rubriques_to_decrease){
        foreach($rubriques_to_decrease as $newplace){
          $newplace->place = $newplace->place - 1;
          $newplace->save();
        } 
      }
    }

    $rubrique->delete();

    $message = 'La rubrique '.$id . ' de type ' . $type->content_type . ' et ses blocs associés viennent d\'être effacés';
    //if($image_removed) $message .= " ainsi que son image associée.";

    if($request->ajax()){
      return response($message);
    }else{
      return redirect()->route('type.insertedIndex', $type->id)->withInfo($message);
    }
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

    return response('La rubrique '. $content->id . $verbe . 'publiée.');
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

  public function sortTypeRubriques(Request $request, $type_id)
  {
    $type = Type::findOrFail($type_id);
    $rubriques = $type->rubriques;
    $numFrom = $request->numFrom;
    $numTo = $request->numTo;
    //$steps = array();

    $movedRubrique = $rubriques->where('place', $numFrom)->first();

    if($numTo < $numFrom){
      for($i = $numTo; $i < $numFrom; $i++){
        $rubriqueToMove = $rubriques->where('place', $i)->first();
        $rubriqueToMove->place = $i+1;
        $rubriqueToMove->save();
      }
      $movedRubrique->place = $numTo;
      $movedRubrique->save();
    }else{
      for($i = ($numFrom+1); $i < $numTo; $i++){
        $rubriqueToMove = $rubriques->where('place', $i)->first();
        $rubriqueToMove->place = ($i-1);
        $rubriqueToMove->save();
        //$steps[] = $i . " -> " . ($i-1);
      }
      $movedRubrique->place = ($numTo-1);
      $movedRubrique->save();
      //$steps[] = $numFrom . " -> " . ($numTo-1);
    }
    //$steps[] = "Les rubriques sont réordonnées.";

    //return response($steps);
    return response("Les rubriques sont réordonnées.");
  }
}
