@extends('template')

@section('contenu')
  <div class="heading main-container" 
       style="background-image: url('/storage/img/jungle3200.jpg');
       background-image: -webkit-image-set( url('/storage/img/jungle3200.jpg') 1x, url('/storage/img/jungle3200@2x.jpg') 2x );
       background-image: image-set( url('/storage/img/jungle3200.jpg') 1x, url('/storage/img/jungle3200@2x.jpg') 2x );" >
    <h1>404 ! Vous êtes perdus !</h1>
    <a href='{{ Auth::check() ? '/coulisses' : '' }}/accueil'><h2>Retour à l'accueil</h2></a>
  </div>
@endsection
