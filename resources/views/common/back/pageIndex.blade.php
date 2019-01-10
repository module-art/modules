@extends(env('APP_THEME', 'module-art').'.template')

@section('title')
  <title>Pages</title>
  <link href="/css/admin.css" rel="stylesheet">
@endsection

@section('contenu')
          
  @include(env('APP_THEME', 'module-art').'.menu')

  <section class='row center-card'>
    <div class="col-12">
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
                <th></th>{{--publication--}}
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
                  <td>
                    @auth
                      <a href="{{ route('page.edit', $page->id) }}" class="btn btn-warning" title="Modifier" ><i class="far fa-edit"></i><span class="sr-only"> Modifier</span></a>
                    @endauth
                  </td>
                  <td>
                    @auth
                      {!! Form::open(['method' => 'DELETE', 'route' => ['page.destroy', $page->id]]) !!}
                      {{-- Form::submit('Supprimer', ['class' => 'btn btn-danger btn-block', 'onclick' => 'return confirm(\'Vraiment supprimer cet utilisateur ?\')']) --}}
                      <button type="submit" class="btn btn-danger" onclick="return confirm('Vraiment supprimer cette page et tous les contenus associés ?')"><i class="fas fa-trash-alt"></i><span class="sr-only"> Supprimer</span></button>
                      {!! Form::close() !!}
                    @endauth
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          {!! $pages->links() !!}
          <div class="row justify-content-between px-3">
            @if(Auth::check())
              {!! link_to_route('page.create', 'Ajouter une page', [], ['class' => 'btn btn-info']) !!}
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
