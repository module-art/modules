@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Gestionnaire de fichiers</title>
  <link href="/css/admin.css" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('vendor/file-manager/css/file-manager.css') }}">
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
          <h3 class="card-title">Gestionnaire de fichiers</h3>
        </div>
        <div class="card-body">
          <div id="fm"></div>
          <div class="card-footer d-flex justify-content-end mt-2">
            <a class="btn btn-primary btn-sm" href="{{ route('page.home') }}"><i class="fa fa-redo"></i> retour à l'accueil</a>
          </div>
        </div>{{--card-body--}}
      </div>
    </div>
  </section>
@endsection

@section('scripts')
  <script src="/js/tinymce/tinymce.min.js"></script>
  <script src="{{ asset('vendor/file-manager/js/file-manager.js') }}"></script>
  <script src="/js/admin.js"></script>
  {{--<script src="/js/lists.js"></script>--}}
@endsection
