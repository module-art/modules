<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use App\Models\Type;
use Illuminate\Validation\Rule;

class TypeRequest extends FormRequest
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
    if(isset($request->type)){//case for update
      $type = type::findOrFail($request->type);
      $rules1 = [
        'content_type' => [
          'required',
          Rule::unique('types')->ignore($type->id),
        ]
      ];
    }else{
      $rules1 = [
        'content_type' => 'required|unique:types,content_type,NULL,id',
      ];
    }

    return array_merge( $rules1, [
      'champs' => 'required',
      'default_filtre' => 'required'
    ]);
  }
}
