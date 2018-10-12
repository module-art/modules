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
      @if(session()->has('info'))
        <div class="alert alert-success alert-dismissible">{!! session('info') !!}</div>
      @endif
      @if(session()->has('error'))
        <div class="alert alert-danger alert-dismissible">{!! session('error') !!}</div>
      @endif
      <div class="card card-default">
        @if($model == 'page')
          @include('back.inc.new_page')
        @elseif($operation == 'insert' && $model == 'type')
          @include('back.inc.insert_type')
        @elseif($model == 'type')
          @include('back.inc.new_type')
        @endif
      </div>
    </div>
  </section>

@endsection
