@extends('themes.'.config('modules.theme').'.template')

@section('title')
  <title>{!! $title_tag !!}</title>
  <link href="/css/admin.css" rel="stylesheet">
@endsection

@section('sidebar')
  @include('common.back.inc.sidebar')
@endsection

@section('menu')
  @include('themes.'.config('modules.theme').'.menu')
@endsection

@section('contenu')

  <div class="row center-card">
    <div class="col-12 col-lg-8 col-xl-6">
          <div class="card">
              <div class="card-header">
                <h3 class="card-title">{!! $title_tag !!}</h3>
              </div>

              <div class="card-body">
                  <form method="POST" action="{{ route('user.store') }}" aria-label="{{ __('Register') }}">
                      @csrf

                      <div class="form-group row">
                          <label for="name" class="col-md-2 col-form-label text-md-right">{{ __('Nom') }}</label>

                          <div class="col-md-8">
                              <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" autofocus>

                              @if ($errors->has('name'))
                                  <span class="invalid-feedback" role="alert">
                                      <strong>{{ $errors->first('name') }}</strong>
                                  </span>
                              @endif
                          </div>
                      </div>

                      <div class="form-group row">
                          <label for="username" class="col-md-2 col-form-label text-md-right">{{ __('Pseudo') }}</label>

                          <div class="col-md-8">
                              <input id="username" type="text" class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}" name="username" value="{{ old('username') }}" autofocus>

                              @if ($errors->has('username'))
                                  <span class="invalid-feedback" role="alert">
                                      <strong>{{ $errors->first('username') }}</strong>
                                  </span>
                              @endif
                          </div>
                      </div>

                      <div class="form-group row">
                          <label for="email" class="col-md-2 col-form-label text-md-right">{{ __('E-Mail') }}</label>

                          <div class="col-md-8">
                              <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}">

                              @if ($errors->has('email'))
                                  <span class="invalid-feedback" role="alert">
                                      <strong>{{ $errors->first('email') }}</strong>
                                  </span>
                              @endif
                          </div>
                      </div>

                      <div class="form-group row{{ Auth::check() ? '' : ' d-none'}}">
                          <label for="role" class="col-md-2 col-form-label text-md-right">{{ __('Droits') }}</label>
                          <div class="col-md-8">
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" name="role" value="user"/>
                              <label class="form-check-label">Utilisateur</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" name="role" value="admin" checked/>
                              <label class="form-check-label">Administrateur</label>
                            </div>
                          </div>
                      </div>

                      <div class="form-group row">
                          <label for="password" class="col-md-2 col-form-label text-md-right">{{ __('Mot de passe') }}</label>

                          <div class="col-md-8">
                              <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password">

                              @if ($errors->has('password'))
                                  <span class="invalid-feedback" role="alert">
                                      <strong>{{ $errors->first('password') }}</strong>
                                  </span>
                              @endif
                          </div>
                      </div>

                      <div class="form-group row">
                          <label for="password-confirm" class="col-md-2 col-form-label text-md-right">{{ __('Confirmation') }}</label>

                          <div class="col-md-8">
                              <input id="password-confirm" type="password" class="form-control" name="password_confirmation">
                          </div>
                      </div>

                      <div class="form-row mb-0 justify-content-between last">
                        <button type="submit" class="btn btn-info">
                          {{ __('Enregistrer') }}
                        </button>
                        <a href="javascript:history.back()" class="btn btn-primary">
                          <i class="fas fa-redo"></i> Retour
                        </a>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
@endsection

@section('scripts')
  <script src="/js/tinymce/tinymce.min.js"></script>
  <script src="/js/tempus-dominus/moment-with-locales.min.js"></script>
  <script src="/js/tempus-dominus/tempusdominus-bootstrap-4.min.js"></script>
  <script src="/js/admin.js"></script>
  <script src="/js/lists.js"></script>
@endsection
