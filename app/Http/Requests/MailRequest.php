<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class MailRequest extends FormRequest
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
      //dd($request->mail);
      $rules = array();
      if(!isset($request->mail)){//update case
        $rules[] = [
          'username' => [ 'required', 'regex:/^[a-z0-9.-]+$/', 'between:2,36' ],
        ];
      }
      return array_merge($rules, [
          'password' => [ 'required','regex:/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).*$/','confirmed','min:8' ]
      ]);
    }

    public function messages()
    {
        return [
          'password.regex' => '8 caractères minimum, minuscules, majuscules et chiffres.'
        ];
    }
}
