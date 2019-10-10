@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Utilisateurs</title>
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
          <h3 class="card-title">Liste des utilisateurs</h3>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>E-Mail</th>
                <th>Pseudo</th>
                <th>Droits</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              @foreach ($users as $user)
                <tr>
                  <td class="text-primary"><strong>{!! $user->name !!}</strong></td>
                  <td class="text-primary"><strong>{!! $user->email !!}</strong></td>
                  <td class="text-primary"><strong>{!! $user->username !!}</strong></td>
                  <td class="text-primary"><strong>{!! $user->role !!}</strong></td>
                  <td>
                    {{--@if(Auth::user()->role == 'admin')--}}
                      <a href="{{ route('user.edit', $user->id) }}" class="btn btn-warning"><i class="far fa-edit"></i><span class="sr-only"> Modifier</span></a>
                    {{--@endif--}}
                  </td>
                  <td>
                    {{--@if(Auth::user()->role == 'admin')--}}
                      {!! Form::open(['method' => 'DELETE', 'route' => ['user.destroy', $user->id]]) !!}
                      {{-- Form::submit('Supprimer', ['class' => 'btn btn-danger btn-block', 'onclick' => 'return confirm(\'Vraiment supprimer cet utilisateur ?\')']) --}}
                      <button type="submit" class="btn btn-danger" onclick="return confirm('Vraiment supprimer cet utilisateur ?')"><i class="fas fa-trash-alt"></i><span class="sr-only"> Supprimer</span></button>
                      {!! Form::close() !!}
                    {{--@endif--}}
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          {!! $links !!}
          <div class="row justify-content-between px-3">
            {{--@if(Auth::user()->role == 'admin')--}}
              {!! link_to_route('user.create', 'Ajouter un utilisateur', [], ['class' => 'btn btn-info']) !!}
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
@endsection
