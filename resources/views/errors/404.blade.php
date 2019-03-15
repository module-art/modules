@extends('themes.'.config('app.theme').'.template')

@section('contenu')
  <div class="heading error row justify-content-center align-items-center" 
       style="background-image: url('/images/jungle3200.jpg');">
    <div class="col-12"><h1>404 ! Vous êtes perdus !</h1></div>
    <div class="col-12"><h2><a href='{{ route('page.home') }}'>Retour à l'accueil</a></h2></div>
  </div>
@endsection
