@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>erreur 404</title>
@endsection

@section('contenu')
  <div class="heading error row justify-content-center align-items-center" 
       style="background: url('/images/jungle3200.jpg') no-repeat center/100%;">
    <div class="col-12"><h1>Erreur 404 ! Vous êtes perdu !<br>Cette page n'existe pas.</h1></div>
    <div class="col-12"><h2><a href='{{ route('page.home') }}'>Retour à l'accueil</a></h2></div>
  </div>
@endsection
