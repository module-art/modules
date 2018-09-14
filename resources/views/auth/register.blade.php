@extends('template')

@section('title')
  <title>{!! $title_tag !!}</title>
@endsection

@section('contenu')
          
<div class="head d-flex justify-content-center">
  @include('menu')
</div>
  <div class="row center-card">
      <div class="col-12 col-md-8 col-lg-6">
          <div class="card">
              <div class="card-header">{{ __('Ajout d\'un utilisateur') }}</div>

              <div class="card-body">
                  <form method="POST" action="{{ route('register') }}" aria-label="{{ __('Register') }}">
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
                          <label for="username" class="col-md-2 col-form-label text-md-right">{{ __('Pseudo*') }}</label>

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

                      <div class="form-group row{{ Auth::check() && Auth::user()->role == 'admin' ? '' : ' d-none'}}">
                          <label for="role" class="col-md-2 col-form-label text-md-right">{{ __('Role') }}</label>
                          <div class="col-md-8">
                            {!! Form::select('role', ['admin' => 'Administrateur', 'user' => 'Utilisateur'], 'user', ['class' => 'form-control' . $errors->has('role') ? ' is-invalid' : '']) !!}
                            {!! $errors->first('role', '<span class="invalid-feedback" role="alert"><strong>:message</strong></span>') !!}
                          </div>
                      </div>

                      <div class="form-group row">
                          <label for="password" class="col-md-2 col-form-label text-md-right">{{ __('Mot de passe*') }}</label>

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
                          <label for="password-confirm" class="col-md-2 col-form-label text-md-right">{{ __('Confirmation*') }}</label>

                          <div class="col-md-8">
                              <input id="password-confirm" type="password" class="form-control" name="password_confirmation">
                          </div>
                      </div>

                      <div class="form-group row mb-0">
                          <div class="col-md-8 offset-md-2">
                              <button type="submit" class="btn btn-info">
                                  {{ __('Enregistrer') }}
                              </button>
                              <a href="javascript:history.back()" class="btn btn-primary pull-right">
                                <i class="fas fa-redo"></i> Retour
                              </a>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
@endsection
