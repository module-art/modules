@extends('themes.'.config('app.theme').'.template')

@section('title')
  <title>Index {{ $type->content_type }}</title>
  <link href="/css/admin.css" rel="stylesheet">
  <link rel="stylesheet" href="/tools/fancybox/jquery.fancybox.min.css">
@endsection

@section('menu')
  @include('themes.'.config('app.theme').'.menu')
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
          <h3 class="card-title">Liste des {{$type->content_type}}s</h3>
        </div>
        <div class="card-body">

          @include('common.back.inc.insertedTypes-table', [
            'champs' => explode(',', $type->champs),
            'results' => ModuleControl::getSortedTypeRubriques($type, $type->default_filtre, $type->descendant, true)
          ])
          <div class="row justify-content-between px-3">
            {{--@if(Auth::user()->role == 'admin')--}}
              {{ link_to_route('type.insertform', 'Ajouter '.$type->content_type, $type->content_type, ['class' => 'btn btn-info']) }}
            {{--@endif--}}
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
  <script src="/tools/tinymce/tinymce.min.js"></script>
  <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
  <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
  <script src="/js/admin.js"></script>
  <script src="/js/lists.js"></script>
  <script src="/tools/fancybox/jquery.fancybox.min.js"></script>
@endsection
