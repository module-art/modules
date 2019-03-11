@extends('themes.'.config('app.theme').'.template')

@section('title')
  <title>Pages</title>
  <link href="/css/admin.css" rel="stylesheet">
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
                    {!! Form::open(['method' => 'DELETE', 'route' => ['page.destroy', $page->id]]) !!}
                    {{-- Form::submit('Supprimer', ['class' => 'btn btn-danger btn-block', 'onclick' => 'return confirm(\'Vraiment supprimer cet utilisateur ?\')']) --}}
                    <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Vraiment supprimer cette page et tous les contenus associés ?')"><i class="fas fa-trash-alt"></i><span class="sr-only"> Supprimer</span></button>
                    {!! Form::close() !!}
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          {!! $pages->links() !!}
          <div class="row justify-content-between px-3">
            {!! link_to_route('page.create', 'Ajouter une page', [], ['class' => 'btn btn-info']) !!}
            <a href="javascript:history.back()" class="btn btn-primary">
              <i class="fas fa-redo"></i> Retour
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
@endsection

@section('scripts')
  <script src="/js/lists.js"></script>
@endsection
