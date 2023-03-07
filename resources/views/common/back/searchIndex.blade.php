@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Recherche</title>
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
          <h3 class="card-title">Résultat de la recherche</h3>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Type de contenu</th>
                <th>Contenu</th>
                <th></th>{{--voir--}}
                <th></th>{{--modifier--}}
              </tr>
            </thead>
            <tbody>
              @foreach ($blocs as $bloc)
                @php
                  $rubrique = $bloc->rubrique;
                @endphp
                <tr>
                  <td><strong>{!! $rubrique->contenu !!}</strong></td>
                  <td>{!! str_limit( strip_tags( $bloc->contenu ), $limit = 100, $end = ' [...]' ) !!}</td>
          <td>
            <a class="btn btn-sm btn-success" href="{{ route('type_content', [$rubrique->contenu, $rubrique->id]) }}"><i class="far fa-eye"></i><span class="sr-only">voir</span></a>
          </td>
                  <td>
                    <a href="{{ route('type.editInsert', [ $rubrique->contenu, $rubrique->id ]) }}" class="btn btn-sm btn-primary" title="Modifier" ><i class="fas fa-edit"></i><span class="sr-only"> Modifier</span></a>
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          {!! $blocs->links() !!}
          <div class="row justify-content-between px-3">
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
