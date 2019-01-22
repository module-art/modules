@extends('themes.'.env('APP_THEME', 'module-art').'.template')

@section('title')
  <title>{{ $operation == 'create' ? 'Ajouter' : 'Modifier' }} {{ $model }}</title>
  <link href="/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet">
  <link href="/css/admin.css" rel="stylesheet">
@endsection

@section('menu')
  @include('themes.'.env('APP_THEME', 'module-art').'.menu')
@endsection

@section('contenu')

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
          @include('common.back.inc.new_page')
        @elseif($operation == 'insert' && $model == 'type')
          @include('common.back.inc.insert_type')
        @elseif($model == 'type')
          @include('common.back.inc.new_type')
        @endif
      </div>
    </div>
    @if($model == 'type' && $operation == 'edit')
      <div class="col-12 col-lg-4">
        <div class="card card-default">
          @include('common.back.inc.aside_type_card')
        </div>
      </div>
    @elseif($model == 'type' && $operation == 'insert')
      <div class="col-12 col-lg-4">
        <div class="card card-default">
          @include('common.back.inc.aside_insert_type_card')
        </div>
      </div>
    @endif
  </section>

@endsection

@section('scripts')
  @if($operation == 'insert' && $model == 'type')
    <script src="/tools/tinymce/tinymce.min.js"></script>
    <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
    <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
    <script src="/js/insert_form.js"></script>
  @endif
  @if($operation == 'edit' && $model == 'type')
    <script src="/js/plugins/popover-suggest.js"></script>
    <script src="/js/categorie.js"></script>
  @endif
@endsection
