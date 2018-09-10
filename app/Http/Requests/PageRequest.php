<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use App\Models\Page;

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
            'unique:pages,menu_title,'.$page->id.',id,deleted_at,NULL'
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
