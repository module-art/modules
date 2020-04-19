@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Types de contenu</title>
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
          <h3 class="card-title">Liste des types de contenu</h3>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Champs</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              @foreach ($types as $type)
                <tr>
                  <td class="text-primary"><strong>{!! $type->content_type !!}</strong></td>
                  <td class="text-primary"><strong>{!! $type->champs !!}</strong></td>
                  <td>
                    @auth
                      <a href="{{ route('type.insertedIndex', $type->id) }}" class="btn btn-success" title="Lister"><i class="fas fa-list-ul"></i></i><span class="sr-only"> Lister</span></a>
                    @endauth
                  </td>
                  <td>
                    <a href="{{ route('type.edit', $type->id) }}" class="btn btn-warning" title="Modifier" ><i class="far fa-edit"></i><span class="sr-only"> Modifier</span></a>
                  </td>
                  <td>
                    <form method="POST" action="{{ route('type.destroy', $type->id) }}" accept-charset="UTF-8">
                      <input name="_method" type="hidden" value="DELETE">
                      <input name="_token" type="hidden" value="{{ csrf_token() }}">
                      <button type="submit" class="btn btn-danger" onclick="return confirm('Vraiment supprimer ce type et tous les contenus associés ?')"><i class="fas fa-trash-alt"></i><span class="sr-only"> Supprimer</span></button>
                    </form>
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          {!! $types->links() !!}
          <div class="row justify-content-between px-3">
            <a href="{{ route('type.create') }}" class="btn btn-info">Ajouter un type de contenu</a>
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
@endsection
