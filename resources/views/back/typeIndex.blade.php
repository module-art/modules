@extends('template')

@section('title')
  <title>Types de contenu</title>
  <link href="/css/admin.css" rel="stylesheet">
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
                      <a href="{{ route('type.insertform', $type->content_type) }}" class="btn btn-success" title="Insérer"><i class="far fa-edit"></i><span class="sr-only"> Insérer</span></a>
                    @endauth
                  </td>
                  <td>
                    @if(Auth::check())
                      <a href="{{ route('type.edit', $type->id) }}" class="btn btn-warning" title="Modifier" ><i class="far fa-edit"></i><span class="sr-only"> Modifier</span></a>
                    @endif
                  </td>
                  <td>
                    @if(Auth::check())
                      {!! Form::open(['method' => 'DELETE', 'route' => ['type.destroy', $type->id]]) !!}
                      {{-- Form::submit('Supprimer', ['class' => 'btn btn-danger btn-block', 'onclick' => 'return confirm(\'Vraiment supprimer cet utilisateur ?\')']) --}}
                      <button type="submit" class="btn btn-danger" onclick="return confirm('Vraiment supprimer ce type et tous les contenus associés ?')"><i class="fas fa-trash-alt"></i><span class="sr-only"> Supprimer</span></button>
                      {!! Form::close() !!}
                    @endif
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          {!! $types->links() !!}
          <div class="row justify-content-between px-3">
            @if(Auth::check())
            {!! link_to_route('type.create', 'Ajouter un type de contenu', [], ['class' => 'btn btn-info']) !!}
            @endif
          <a href="javascript:history.back()" class="btn btn-primary">
            <i class="fas fa-redo"></i> Retour
          </a>
          </div>
        </div>
      </div>
    </div>
  </section>
@endsection
