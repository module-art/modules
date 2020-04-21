<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CategorieRequest;
use App\Models\Categorie;
use App\Models\Type;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $type = Type::findOrFail($request->type_id);

      return view('common.back.inc.categorie_table', compact('type'));
    }

    public function suggest($type_id, Request $request)
    {
      $type = Type::findOrFail($type_id);
      $cats = Categorie::select('name')->where('name', 'regexp', '^'.$request->chain)->get();

      if($cats->count() > 0){
        $names = array();
        foreach($cats as $cat){
          $names[] = $cat->name;
        }
        $names_csv = implode(',', $names);
        return response($names_csv);
      }else{
        return response('pas de resultat');
      }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategorieRequest $request)
    {
      /*return response()->json([
        'response' => $request->type_id
      ]);*/

      $name = $request->name;
      $slug = str_slug($name);

      $cat = Categorie::create([
        'name' => $name,
        'slug' => $slug
      ]);

      $cat->types()->attach($request->type_id);

      return response()->json([
        'response' => 'La catégorie est créée.'
      ]);

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
      $categorie = Categorie::findOrFail($id);

      return response($categorie->name);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategorieRequest $request, $id)
    {
      $cat = Categorie::findOrFail($id);

      $name = $request->name;
      $slug = str_slug($name);

      $cat->update([
        'name' => $name,
        'slug' => $slug
      ]);

      return response()->json([
        'response' => 'La catégorie est modifiée.'
      ]);
        
    }

    public function attach($type_id, Request $request)
    {
      $cat = Categorie::where('name', $request->name)->firstOrFail();

      $type = Type::findOrFail($type_id);

      $type_cat = $type->categories()->where('name', $request->name)->get();

      if($type_cat->count() > 0){
        return response()->json([
          'error' => 'La catégorie ' . $request->name.' est déjà associée au type de contenu : ' . $type->content_type . '.',
        ]);
      }

      $cat->types()->attach($type_id);

      return response()->json([
        'response' => 'La catégorie est associée.'
      ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $cat = Categorie::findOrFail($id);

      $cat->types()->detach();

      $cat->delete();

      return response()->json([
        'response' => 'La catégorie est supprimée.'
      ]);
    }

    public function detach($id, Request $request)
    {
      $cat = Categorie::findOrFail($id);

      $cat->types()->detach($request->idType);

      return response()->json([
        'response' => 'La catégorie est dissociée.'
      ]);
    }
}
