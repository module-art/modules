<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategorieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
      if(isset($request->categorie)){//case for update
        $categorie = Categorie::findOrFail($request->categorie);
        $rules1 = [
          'name' => [
            'required',
            Rule::unique('categories')->ignore($categorie->id),
          ]
        ];
      }else{
        $rules1 = [
          'name' => 'required|unique:categories,name,NULL,id',
        ];
      }

      //return array_merge( $rules1, [
        //'title' => 'required',
      //]);
      
      return $rules1;
    }
}
