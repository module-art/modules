@extends('template')

@section('title')
  <title>Utilisateurs</title>
@endsection

@section('contenu')
          
<div class="head d-flex justify-content-center">
  @include('menu')
</div>
  <section class='row center-card'>
    <div class="col-12 col-lg-10">
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
                    @if(Auth::user()->role == 'admin')
                      <a href="{{ route('user.edit', $user->id) }}" class="btn btn-warning"><i class="far fa-edit"></i><span class="sr-only"> Modifier</span></a>
                    @endif
                  </td>
                  <td>
                    @if(Auth::user()->role == 'admin')
                      {!! Form::open(['method' => 'DELETE', 'route' => ['user.destroy', $user->id]]) !!}
                      {{-- Form::submit('Supprimer', ['class' => 'btn btn-danger btn-block', 'onclick' => 'return confirm(\'Vraiment supprimer cet utilisateur ?\')']) --}}
                      <button type="submit" class="btn btn-danger" onclick="return confirm('Vraiment supprimer cet utilisateur ?')"><i class="fas fa-trash-alt"></i><span class="sr-only"> Supprimer</span></button>
                      {!! Form::close() !!}
                    @endif
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          @if(Auth::user()->role == 'admin')
            {!! link_to_route('user.create', 'Ajouter un utilisateur', [], ['class' => 'btn btn-info']) !!}
          @endif
          <a href="javascript:history.back()" class="btn btn-primary pull-right">
            <i class="fas fa-redo"></i> Retour
          </a>
          {!! $links !!}
        </div>
      </div>
    </div>
  </section>
@endsection
