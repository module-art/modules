@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Index {{ $type->content_type }}</title>
  <link href="/css/admin.css" rel="stylesheet">
  <link rel="stylesheet" href="/tools/fancybox/jquery.fancybox.min.css">
  <link rel="stylesheet" href="/tools/jquery_ui/jquery-ui.min.css">
@endsection

@section('sidebar')
  @include('common.back.inc.sidebar')
@endsection

@section('menu')
  @include('themes.'.config('modules.theme').'.menu')
@endsection

@section('contenu')
          
  <section class='row center-card'>
    <div class="">
      @if(session()->has('info'))
        <div class="alert alert-success alert-dismissible">{!! session('info') !!}</div>
      @endif
      @if(session()->has('error'))
        <div class="alert alert-danger alert-dismissible">{!! session('error') !!}</div>
      @endif
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Liste du type : {{$type->content_type}}</h3>
        </div>
        <div class="card-body">

          @include('common.back.inc.insertedTypes-table')
          <div class="row justify-content-between px-3">
              <a class="btn btn-info" href="{{ route('type.insertform', $type->content_type) }}">Ajouter {{ $type->content_type }}</a>
            <a href="javascript:history.back()" class="btn btn-primary">
              <i class="fas fa-redo"></i> Retour
            </a>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end">
          <a class="btn btn-primary btn-sm" href="{{ route('page.home') }}"><i class="fa fa-redo"></i> retour à l'accueil</a>
        </div>
      </div>
    </div>
  </section>

@endsection

@section('scripts')
  <script src="/tools/jquery_ui/jquery-ui.min.js"></script>
  <script src="/js/tinymce/tinymce.min.js"></script>
  <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
  <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
  <script src="/js/admin.js"></script>
  <script src="/js/lists.js"></script>
  <script src="/tools/fancybox/jquery.fancybox.min.js"></script>
@endsection
