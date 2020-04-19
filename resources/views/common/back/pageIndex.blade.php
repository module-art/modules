@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Pages</title>
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
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Liste des pages</h3>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Titre court</th>
                <th>Place au menu</th>
                <th>Publiée</th>
                <th></th>{{--voir--}}
                <th></th>{{--modifier--}}
                <th></th>{{--supprimer--}}
              </tr>
            </thead>
            <tbody>
              @foreach ($pages as $page)
                <tr>
                  <td class="text-primary"><strong>{!! $page->title !!}</strong></td>
                  <td class="text-primary"><strong>{!! $page->menu_title !!}</strong></td>
                  <td class="text-primary">{!! $page->place ? $page->place : 'Hors menu' !!}</td>
                  <td data-toggle="publication" data-page_id="{{ $page->id }}">
                    {!! $page->publie ? '<span class="published"><i class="far fa-check-circle"></i></span>' : '<span class="unpublished"><i class="far fa-times-circle"></i></span>' !!}
                  </td>
                  <td>
                    <a class="btn btn-sm btn-success" href="{{ route('back_page.show', [$page->slug]) }}"><i class="far fa-eye"></i><span class="sr-only">voir</span></a>

                  </td>
                  <td>
                    <a href="{{ route('page.edit', $page->id) }}" class="btn btn-sm btn-warning" title="Modifier" ><i class="far fa-edit"></i><span class="sr-only"> Modifier</span></a>
                  </td>
                  <td>
                    <form method="POST" action="{{ route('page.destroy', $page->id) }}" accept-charset="UTF-8">
                      <input name="_method" type="hidden" value="DELETE">
                      <input name="_token" type="hidden" value="{{ csrf_token() }}">
                    
                      <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Vraiment supprimer cette page et tous les contenus associés ?')"><i class="fas fa-trash-alt"></i><span class="sr-only"> Supprimer</span></button>
                    </form>
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          {!! $pages->links() !!}
          <div class="row justify-content-between px-3">
            <a href="{{ route('page.create') }}" class="btn btn-info">Ajouter une page</a>
            <a href="javascript:history.back()" class="btn btn-primary">
              <i class="fas fa-redo"></i> Retour
            </a>
          </div>
          <div class="card-footer d-flex justify-content-end mt-2">
            <a class="btn btn-primary btn-sm" href="{{ route('page.home') }}"><i class="fa fa-redo"></i> retour à l'accueil</a>
          </div>
        </div>{{--card-body--}}
      </div>
    </div>
  </section>
@endsection

@section('scripts')
  <script src="/js/admin.js"></script>
  <script src="/js/lists.js"></script>
@endsection
