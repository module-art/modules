@extends('template')

@section('title')
  <title>erreur 403</title>
  <link href="/css/styles.css" rel="stylesheet">
@endsection

@section('contenu')
  <div class="heading main-container" 
       style="background-image: url('/storage/img/jungle3200.jpg');
       background-image: -webkit-image-set( url('/storage/img/jungle3200.jpg') 1x, url('/storage/img/jungle3200@2x.jpg') 2x );
       background-image: image-set( url('/storage/img/jungle3200.jpg') 1x, url('/storage/img/jungle3200@2x.jpg') 2x );" >
    <h1>403 ! Interdit !</h1>
    <a href='{{ Auth::check() ? '/coulisses' : '' }}/accueil'><h2>Retour à l'accueil</h2></a>
  </div>
@endsection
