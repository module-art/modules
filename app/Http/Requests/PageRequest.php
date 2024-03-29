<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PageRequest extends FormRequest
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
      if(isset($request->page_id)){//case for update
        $page = Page::findOrFail($request->page_id);
        $rules1 = [
          'menu_title' => [
            'required',
            Rule::unique('pages')->ignore($page->id)->where(function ($query) {
                return $query->where('deleted_at', NULL);
            }),
          ]
        ];
      }else{
        $rules1 = [
          'menu_title' => 'required|unique:pages,menu_title,NULL,id,deleted_at,NULL',
        ];
      }

      return array_merge( $rules1, [
        'title' => 'required',
      ]);
    }
}
