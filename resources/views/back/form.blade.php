@extends('template')

@section('title')
  <title>{{ $operation == 'create' ? 'Ajouter' : 'Modifier' }} {{ $model }}</title>
@endsection

@section('contenu')
          
  <div class="head d-flex justify-content-center">
    @include('menu')
  </div>
  <section class='row center-card'>
    <div class="col-12 col-md-6">
      <div class="card card-default">
        @if($model == 'page')
          @include('back.inc.new_page')
        @elseif($model == 'type')
          @include('back.inc.new_type')
        @endif
      </div>
    </div>
  </section>
@endsection
