<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
    public function rules()
    {
        return [
          'nom' => 'required|min:2|max:20',
          'prenom' => 'max:20',
          'email' => 'required|email',
          'subject' => 'required|max:210',
          'texte' => ['required','not_regex:/(bit.ly|drive.google|https?:)/']
        ];
    }

    public function messages()
    {
        return [
          'texte.not_regex' => 'Vous n\'êtes pas autorisé à envoyer ce message.'
        ];
    }
}
