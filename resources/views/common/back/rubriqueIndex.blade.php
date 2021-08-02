@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>rubriques</title>
  <link href="/css/admin.css" rel="stylesheet">
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
      <div class="card" id="pageList" data-pageid="{{$page->id}}">
        <div class="card-header">
          <h3 class="card-title">Liste des rubriques de la page : {!! $page->is_home ? "d'accueil" : $page->menu_title !!}</h3>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>Place</th>
                <th>Publiée</th>
                <th>Titre</th>
                <th>Class</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="sortable">
              @foreach ($rubriques as $rubrique)
                <tr>
                  <td><i class="fas fa-arrows-alt-v"></i></td>
                  <td class="place-indicator" data-place="{{ $rubrique->place }}">{{ $rubrique->place }}</td>
                  <td data-toggle="rubrique-publication" data-rubrique_id="{{ $rubrique->id }}">
                    {!! $rubrique->publie ? '<span class="published"><i class="far fa-check-circle"></i></span>' : '<span class="unpublished"><i class="far fa-times-circle"></i></span>' !!}
                  </td>
                  <td class="text-primary"><strong>{!! strip_tags($rubrique->contenu) !!}</strong></td>
                  <td class="text-primary">{!! $rubrique->class !!}</td>
                  <td>
                    <button class="btn btn-sm btn-danger btn-destroy-rubrique" data-rubrique_id="{{ $rubrique->id }}"><i class="fas fa-trash-alt"></i></button>
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          <div class="card-footer d-flex justify-content-end mt-2">
            <a class="btn btn-primary btn-sm" href="{{ route('page.home') }}"><i class="fa fa-redo"></i> retour à l'accueil</a>
          </div>
        </div>{{--card-body--}}
      </div>
    </div>
  </section>
@endsection

@section('scripts')
  <script src="/tools/jquery_ui/jquery-ui.min.js"></script>
  <script src="/js/tinymce/tinymce.min.js"></script>
  <script src="/js/admin.js"></script>
  <script src="/js/lists.js"></script>
@endsection
