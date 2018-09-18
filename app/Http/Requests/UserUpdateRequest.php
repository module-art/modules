<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
//use App\Models\User;

class UserUpdateRequest extends FormRequest
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
      if(isset($request->user)){
        //$user = User::findOrFail($request->user);
        $rules1 = [
          'email' => [
            'required',
            Rule::unique('users')->ignore($request->user)
          ],
          'password' => 'nullable|string|min:8|confirmed'
        ];
      }else{
        $rules1 = [
          'email' => 'required|email|max:255|unique:users',
          'password' => 'required|string|min:8|confirmed'
        ];
      }

      $rules = array_merge($rules1, [
        'name' => 'required|max:255',
        'username' => 'required|max:255|',
        'role' => 'required|string|max:5|',
      ]);

      return $rules;
    }
}
