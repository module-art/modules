<?php

namespace App\Http\Controllers;

use Auth;
use View;
use Illuminate\Http\Request;
use App\Http\Requests\RubriqueRequest;
use App\Http\Requests\ImageUpdateRequest;
use App\Repositories\FooterRepository;
use App\Repositories\MenusRepository;
use App\Gestion\ImageGestion;
use App\Models\Page;
use App\Models\Rubrique;
use App\Models\Type;
use ModuleControl;
use Storage;

class RubriqueController extends Controller
{

  public function __construct(MenusRepository $menusRepository, ModuleControl $module_control)
  {
    $this->middleware('auth', ['except' => ['getTypeContents', 'showTypeContentPage']]);
    $this->middleware('authAsAdmin', ['except' => ['getTypeContents', 'showTypeContentPage']]);
    $this->middleware('ajax', ['except' => ['index', 'getTypeContents', 'showTypeContentPage']]);
    $this->menusRepository = $menusRepository;
    $this->moduleControl = $module_control;
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index($page_id)
  {
    $page = Page::findOrFail($page_id);

    //place management
    $total = $this->placeManagement($page);

    $menus = $this->menusRepository->makeAdminMenus();
    $rubriques = $page->rubriques()->orderBy('place')->get();

    return view('common.back.rubriqueIndex', compact('page', 'rubriques', 'menus'));
  }


  public function getTypeContents(Request $request, $type_name){

    $type = Type::where('content_type', $type_name)->firstOrFail();
    $champs = explode(',', $type->champs);

    $results = $this->moduleControl->getSortedTypeRubriques($type, $request->orderby, $request->desc);// results utilisable avec un foreach

    $context = Auth::check() ? 'back' : 'front';
    
    //next return for test with any type of content
    //return view('themes.'.config('modules.theme') . '.' . $context . '.type-contents', compact('results', 'champs', 'type'));
    if(View::exists('themes.'.config('modules.theme') . '.' . $context . '.type-list-' . $type_name)){
      return view('themes.'.config('modules.theme') . '.' . $context . '.type-list-' . $type_name, compact('results', 'champs', 'type'));
    }else{
      return view('common.back.type-contents', compact('results', 'champs', 'type'));
    }
  }

  public function showTypeContentPage(Request $request, $type_name, $rubrique_id, $slug = null){

    $type_content = Rubrique::findOrFail($rubrique_id);
    $page = Page::where('slug', $type_name)->firstOrFail();
    //return response($page);

    $footer = FooterRepository::makeFooter();
    $menus = Auth::check() ? MenusRepository::makeAdminMenus() : MenusRepository::makeMenus();
    $first_rubrique = $page->rubriques()->first();
    $bg_img = $first_rubrique->background_img_url;

    if(Auth::check()){
      $context = 'back';
      $types = Type::all();
    }else{
      $context = 'front';
      $types = false;
    }

    //obtention des champs d'un élément enfant !
    //return response($type_content->children()->first()->blocs);
    
    // !! La page avec l'adresse /{type} doit exister en base
    return view('themes.'.config('modules.theme') . '.' . $context . '.page', compact('type_content', 'menus', 'page', 'footer', 'bg_img','types'));
  }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request'
     * @return \Illuminate\Http\Response
     */
    public function newRubrique($id_page)
    {
      $page = Page::findOrFail($id_page);
      $place = $page->rubriques->max('place') + 1;

      $rubrique = new Rubrique;
      $rubrique->contenu = 'Nouvelle rubrique';
      $rubrique->place = $place;
      $rubrique->cols = 2;
      $rubrique->publie = 0;
      $rubrique->page_id = $id_page;

      $rubrique->save();

      return response()->json(['reponse' => 'Une nouvelle rubrique est ajoutée à la page '.$page->menu_title.'.', 'newId' => $rubrique->id ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id'
     * @return \Illuminate\Http\Response
     */
    public function partialShow($id_rubrique)
    {
      $rubrique = Rubrique::findOrFail($id_rubrique);

      return view('themes.'.config('modules.theme').'.back.partial_rubrique', compact('rubrique'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ImageUpdateRequest $request, ImageGestion $gestion, $id)
    {
      //return response()->json(['response' => $request]);
      $rubrique = Rubrique::findOrFail($id);
      $rubrique->contenu = $request->texte;

      //by default image is not deleted
      $image_destroy = false;

      if(isset($rubrique->background_img_url) && $request->has('delete_image')){
        $image_destroy = $gestion->destroy($rubrique);

        if(!$image_destroy){
          return response()->json(['response' => 'L\'image n\'a pas pu être supprimée.']);
        }

      }elseif($request->has('image')){
        $image_ok = $gestion->resizeAndSave($request->file('image'));

        if(!$image_ok){
          return response()->json(['response' => 'L\'image n\'a pas pu être enregistrée.']);
        }else{

          $rubrique->background_img_url = $image_ok;
          //$rubrique->save();
          //return response()->json(['response' => $image_ok]);
       }
      }
      $rubrique->save();
      return response()->json([
        'response' => 'La rubrique '. $id .' est modifiée.',
        'img_deleted' => $image_destroy ? 1 : 0
      ]);
    }

    public function colsChange(Request $request, $id){

      $cols = $request->cols;
      $rubrique = Rubrique::findOrFail($id);
      $rubrique->cols = $cols;
      $rubrique->save();

      $end = $cols > 1 ? 's.' : '.';

      return response()->json(['response' => 'La rubrique référencée ' . $rubrique->id . ' présente ' . $cols . ' colonne' . $end]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $rubrique = Rubrique::findOrFail($id);

      //remove image if isset
      if(!is_null($rubrique->background_img_url)){
        $image_path = preg_replace('/^\/?storage/', 'public', $rubrique->background_img_url);
        $image_removed = Storage::delete($image_path);
      }

      if(isset($rubrique->page_id)){
        $page = $rubrique->page;

        $places_to_move = $page->rubriques()->where('place', '>', $rubrique->place)->get();

        if($places_to_move){
          foreach($places_to_move as $newplace){
            $newplace->place = $newplace->place - 1;
            $newplace->save();
          } 
        }
      }

      foreach($rubrique->blocs as $bloc){
        $bloc->delete();
      }
        
      $rubrique->forceDelete();

      return response('La rubrique '.$id . ' et ses blocs associés viennent d\'être effacés');
    }

    public function switchOrder($id)
    {
      $rubrique = Rubrique::findOrFail($id);
      $order = $rubrique->ascendant;

      if($order){
        $order = 0;
        $state = "inversé";
      }else{
        $order = 1;
        $state = "ascendant";
      }
      
      $rubrique->ascendant = $order;
      $rubrique->save();

      return response('Le rubrique ' . $id . ' est en ordre ' . $state);
    }

    public function switchPublication($id)
    {
      $rubrique = Rubrique::findOrFail($id);
      $state = $rubrique->publie;

      if($state){
        $state = 0;
        $verbe = " n'est plus ";
      }else{
        $state = 1;
        $verbe = " est ";
      }
      
      $rubrique->publie = $state;
      $rubrique->save();

      return response('La rubrique '. $rubrique->id . $verbe . 'publié.');
    }

    public function updateClass(Request $request, $id)
    {
      $rubrique = Rubrique::findOrFail($id);

      $rubrique->class = $request->rubriqueClass;
      $rubrique->save();

      return response('La donnée de rubrique est modifiée.');
    }

    private function placeManagement($page){
    
      $max = $page->rubriques()->max('place');
      $total = $page->rubriques()->count();
      if($max != $total-1){
        foreach($page->rubriques as $y => $rubrique_to_number){
          $rubrique_to_number->place = $y;
          $rubrique_to_number->save();
        }
      }
      return $total;
    }

    public function moveBlock(Request $request, $id)
    {
      //return response()->json([ $id . ' ' . $request->init_place . ' ' . $request->final_place ]);
      $rubrique = Rubrique::findOrFail($id);
      $init = $request->init_place;
      $final = $request->final_place;

      $blocs = $rubrique->blocs()->orderBy('place')->get();

      foreach($blocs as $bloc){
        $place = $bloc->place;
        if($place == $init){
          $bloc->place = $final;
        }
        if($init < $final){
          if($place > $init && $place <= $final){
            $bloc->place = $place - 1;
          }
        }else{
          if($place >= $final && $place < $init){
            $bloc->place = $place + 1;
          }
        }
        $bloc->save();
      }

      return response()->json(['response' => 'Le bloc ' . $init . ' est à la place du bloc ' . $final ]);
    }

    public function changeTypeContents(Request $request, $id)
    {
      $rubrique = Rubrique::findOrFail($id);
      if($request->dbAction == 'add'){
        $type = Type::where('content_type', $request->contentType)->first();
        $rubrique->type_contents = $type->id;
        $rubrique->save();
        return response()->json(['response' => 'Les contenus de type ' . $request->contentType . ' sont insérés dans cette rubrique.']);
      }elseif($request->dbAction == 'remove'){
        $rubrique->type_contents = null;
        $rubrique->save();
        return response()->json(['response' => 'Les contenus de type ' . $request->contentType . ' ne sont plus insérés dans cette rubrique.']);
      }
    }

  public function sortRubriques(Request $request, $page_id)
  {
    $page = Page::findOrFail($page_id);
    $rubriques = $page->rubriques;
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
