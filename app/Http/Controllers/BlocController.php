<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BlocRequest;
use App\Http\Requests\SearchRequest;
use App\Http\Requests\AjaxBlocRequest;
use App\Models\Page;
use App\Models\Rubrique;
use App\Models\Bloc;
use App\Models\User;
use App\Models\Type;
use ModuleControl;
use View;
use App\Repositories\MenusRepository;
use App\Repositories\ControlRepository;

class BlocController extends Controller
{
  
  public function __construct(ModuleControl $module_control, MenusRepository $menusRepository, ControlRepository $controlRepository)
  {
    $this->middleware('authAsAdmin');
    $this->middleware('ajax', ['except' => ['search']]);
    $this->moduleControl = $module_control;
    $this->menusRepository = $menusRepository;
    $this->nbrPerPage = $controlRepository->nbrPerPage;
  }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
  public function partialShow($id_rubrique)
  {
    $rubrique = Rubrique::findOrFail($id_rubrique);
    $types = Type::all();
    if(View::exists('themes.'.config('modules.theme').'.back.inc.partial_bloc')){
      return view('themes.'.config('modules.theme').'.back.inc.partial_bloc', compact('id_rubrique', 'rubrique', 'types'));
    }else{
      return view('common.back.inc.partial_bloc', compact('id_rubrique', 'rubrique', 'types'));
    }
  }

  public function partialShowDrag($id_rubrique)
  {
    $rubrique = Rubrique::findOrFail($id_rubrique);
    $types = Type::all();
    return view('common.back.partial_drag', compact('id_rubrique', 'rubrique', 'types'));
  }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AjaxBlocRequest $request, $id)
    {
      $content = $request->texte;//preg_replace('/<\/?(p|h[1-6])>/', '', $request->texte);

      if(preg_match("/rubrique/", $id)){
        $rubrique_id = explode('-', $id)[1];
        $type = $request->format;
        $place = Rubrique::findOrFail($rubrique_id)->blocs->max('place') + 1;

        $new_bloc = Bloc::create([
          'contenu' => $content,
          'place' => $place,
          'type' => $type,
          'rubrique_id' => $rubrique_id
        ]);

        $new_id = $new_bloc->id;
        
        return response()->json(['response' => 'Le nouveau bloc '. $new_id .' est créé.', 'newId' => $new_id]);

      }else{
        $bloc = Bloc::findOrFail($id);
        $bloc->contenu = $content;
        $bloc->save();
        return response()->json(['response' => 'Le bloc '. $id .' est modifié.', 'newId' => 0]);//newId not used in this case
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
      $bloc = Bloc::findOrFail($id);
      $rubrique = $bloc->rubrique;

      $blocs_to_move = $rubrique->blocs->where('place', '>', $bloc->place);

      foreach($blocs_to_move as $move){
        $move->place = $move->place - 1;
        $move->save();
      }

      $bloc->forceDelete();
 
      return response('Le bloc '.$id.' est supprimé.');
    }

    public function listGalleries(Request $request)
    {
      $galleries = $this->moduleControl->getGalleriesArray($needle = $request->chain);
      $list_galleries = '';

      foreach($galleries as $key => $value){
        $list_galleries .= $key.'|';
      }

      if($list_galleries == '') $list_galleries = 'Aucun Résultat.';

      return response($list_galleries);
    }

    public function search(SearchRequest $request){
      $blocs = Bloc::where('type', $request->field)->where('contenu', 'REGEXP',$request->string)->paginate($this->nbrPerPage);
      $menus = $this->menusRepository->makeAdminMenus();
      return view('common.back.searchIndex', compact('blocs', 'menus'));
    }
}
