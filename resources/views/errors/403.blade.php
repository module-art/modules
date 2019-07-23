@extends('themes.'.config('modules.theme').'.template')

@section('contenu')
  <div class="heading error row justify-content-center align-items-center" 
       style="background-image: url('/images/forbidden.jpg');">
    <div class="col-12"><h1>403 ! NON NEIN NO NIET нет لا מספר 无 いいえ !</h1></div>
    <div class="col-12"><h2><a href='{{ route('page.home') }}'>Retour à l'accueil</a></h2></div>
  </div>
@endsection
