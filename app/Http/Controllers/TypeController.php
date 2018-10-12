<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TypeRequest;
use App\Http\Requests\InsertTypeRequest;
use App\Repositories\FooterRepository;
use App\Repositories\MenusRepository;
use App\Repositories\ControlRepository;
use App\Models\Type;
use App\Models\Rubrique;
use App\Models\Bloc;

class TypeController extends Controller
{
  
  public function __construct(FooterRepository $footerRepository, MenusRepository $menusRepository, ControlRepository $controlRepository)
  {
    $this->footerRepository = $footerRepository;
    $this->menusRepository = $menusRepository;
    $this->controlRepository = $controlRepository;
    $this->middleware('authAsAdmin');
    //$this->middleware('ajax', ['only' => ['switchPublication']]);
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
    //$links = $users->render();

    return view('back.typeIndex', compact('types', 'menus', 'operation', 'footer'));
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
    return view('back.form', compact('menus', 'operation', 'footer', 'model'));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(TypeRequest $request)
  {
    $inputs = $request->all();
    Type::create($inputs);
    return redirect()->route('type.index')->withInfo('Le type ' . $request->type . ' est crée.');
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
    $operation = 'edit';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    $model = 'type';
    return view('back.form', compact('type', 'menus', 'operation', 'footer', 'model'));
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

  public function showInsertForm($type_name)
  {
    $operation = 'insert';
    $model = 'type';
    $menus = $this->menusRepository->makeAdminMenus();
    $footer = $this->footerRepository->makeFooter();
    $type = Type::where('content_type', $type_name)->first();
    $type_id = $type->id;
    $champs = explode(',', $type->champs);
    $nb_champs = count($champs);
    //dd($champs);

    return view('back.form', compact('type_name', 'type_id', 'champs', 'nb_champs', 'model', 'menus', 'operation', 'footer'));
  }

  public function insertType(InsertTypeRequest $request, $type_id)
  {
    $type = Type::findOrFail($type_id);
    $type_name = $type->content_type;

    $rubrique_inputs = [
      'contenu' => $request->contenu,
      'type_id' => $type_id,
    ];

    $typed_rubrique = Rubrique::create($rubrique_inputs);
    $rubrique_id = $typed_rubrique->id;
    $i = 1;
    
    foreach($request->except(array('_token', 'contenu')) as $key => $value){
      Bloc::create([
        'contenu' => $value,
        'place' => $i,
        'type' => $key,
        'rubrique_id' => $rubrique_id,
      ]);
      $i++;
    }

    return redirect()->route('type.insertform', $type_name)->withInfo('L\'insertion s\'est bien déroulée.');
  }
}
