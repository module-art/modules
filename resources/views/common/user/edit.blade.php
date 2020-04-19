@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>Compte de {!! $user->name !!}</title>
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
    <div class="col-12 col-lg-8 col-xl-6">
      <div class="card"> 
        <div class="card-header">
          <h3 class="card-title">Compte de {!! $user->name !!}</h3>
        </div>
        <div class="card-body"> 
          <form method="POST" action="{{ route('user.update', $user->id) }}" accept-charset="UTF-8">
            <input name="_method" type="hidden" value="put">
            <input name="_token" type="hidden" value="{{ csrf_token() }}">
            <div class="form-row">
              <div class="col-3 col-form-label text-md-right">
                <label for="name">Nom :</label>
              </div>
              <div class="col-9 form-group">
                <input class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" placeholder="Nom" name="name" type="text" value="{{ $user->name }}">
                {!! $errors->first('name', '<small class="invalid-feedback">:message</small>') !!}
              </div>
            </div>
            <div class="form-row">
              <div class="col-3 col-form-label text-md-right">
                <label for="username">Pseudo :</label>
              </div>
              <div class="col-9 form-group">
                <input class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}" placeholder="Pseudo" name="username" type="text" value="{{ $user->username }}">
                {!! $errors->first('username', '<small class="invalid-feedback">:message</small>') !!}
              </div>
            </div>
            <div class="form-row">
              <div class="col-3 col-form-label text-md-right">
                <label for="email">E-mail :</label>
              </div>
              <div class="col-9 form-group">
                <input class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" placeholder="Email" name="email" type="email" value="{{ $user->email }}" id="email">
                {!! $errors->first('email', '<small class="invalid-feedback">:message</small>') !!}
              </div>
            </div>
            <div class="form-row">
              <div class="col-3 col-form-label text-md-right">
                <label for="role">Droits :</label>
              </div>
              <div class="col-9 form-group">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="role" value="user"{{ $user->role == 'user' ? 'checked' : '' }}/>
                  <label class="form-check-label">Utilisateur</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="role" value="admin"{{ $user->role == 'admin' || $user->role == 'maintainer'? 'checked' : '' }}/>
                  <label class="form-check-label">Administrateur</label>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-3 col-form-label text-md-right">
                <a class="pw-change" data-toggle="collapse" data-target="#passwords" aria-expanded="false" aria-controls="passwords">
                  Modifier le mot de passe <i class="fas fa-chevron-circle-down"></i>
                </a>
              </div>
            </div>
            <div class="collapse{{ $errors->has('password') ? ' show' : '' }}" id="passwords">
              <div class="form-row mt-2">
                <div class="col-3 col-form-label text-md-right">
                  <label for="password">Nouveau :</label>
                </div>
                <div class="col-9 form-group">
                  <input class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" placeholder="Nouveau mot de passe" name="password" type="password" autocomplete="off">
                  {!! $errors->first('password', '<small class="invalid-feedback">:message</small>') !!}
                </div>
              </div>
              <div class="form-row">
                <div class="col-3 col-form-label text-md-right">
                  <label for="password_confirmation">Confirmer :</label>
                </div>
                <div class="col-9 form-group">
                  <input class="form-control" placeholder="Confirmer le mot de passe" name="password_confirmation" type="password">
                </div>
              </div>
            </div>
            <div class="form-row justify-content-between last">
              <input class="btn btn-info" type="submit" value="Envoyer">
              <a href="javascript:history.back()" class="btn btn-primary">
                <i class="fas fa-redo"></i> Retour
              </a>
            </div>
          </form>
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
  <script src="/js/lists.js"></script>
@endsection
