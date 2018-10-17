@extends('template')

@section('title')
  <title>{{ $operation == 'create' ? 'Ajouter' : 'Modifier' }} {{ $model }}</title>
  <link href="/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet">
  <link href="/css/admin.css" rel="stylesheet">
@endsection

@section('contenu')
          
  <div class="head d-flex justify-content-center">
    @include('menu')
  </div>
  <section class='row center-card'>
    <div class="col-12 col-lg-8">
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

@section('scripts')
  @if($operation == 'insert' && $model == 'type')
    <script src="/tools/tinymce/tinymce.min.js"></script>
    <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
    <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
    <script src="/js/insert_form.js"></script>
  @endif
@endsection
