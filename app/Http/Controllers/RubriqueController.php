<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Http\Requests\RubriqueRequest;
use App\Http\Requests\ImageUpdateRequest;
use App\Repositories\ControlRepository;
use App\Gestion\ImageGestion;
use App\Models\Page;
use App\Models\Rubrique;
use App\Models\Type;

class RubriqueController extends Controller
{

  public function __construct(ControlRepository $controlRepository)
  {
    $this->middleware('auth', ['except' => ['getTypeContents']]);
    $this->middleware('authAsAdmin', ['except' => ['getTypeContents']]);
    $this->middleware('ajax', ['except' => ['getTypeContents']]);
    $this->controlRepository = $controlRepository;
  }

  public function getTypeContents(Request $request, $type_name){

    $type = Type::where('content_type', $type_name)->firstOrFail();
    $champs = explode(',', $type->champs);
    $results = $this->controlRepository->getSortedTypeRubriques($type_name, $request->orderby, $request->order);// results utilisable avec un foreach

    $context = Auth::check() ? 'back' : 'front';
    
    return view($context . '.type-contents', compact('results', 'champs', 'type'));
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

      return view('back.partial_rubrique', compact('rubrique'));
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
      $rubrique->contenu = $request->texte;//preg_replace('/<\/?(p|h[1-6]|br\/?)>/', '',$request->bloc);

      if($request->has('image')){
        $image_ok = $gestion->resizeAndSave($request->file('image'));

       if(!$image_ok){
         return response()->json(['response' => 'L\'image n\'a pas pu être enregistrée.']);
       }else{

          $rubrique->background_img_url = $image_ok[0];
          $rubrique->background_hd_url = $image_ok[1];
          $rubrique->save();
          return response()->json(['response' => $image_ok]);
       }
      }
      $rubrique->save();
      return response()->json(['response' => 'La rubrique '. $id .' est modifiée.']);
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
        
      $rubrique->delete();

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
}
