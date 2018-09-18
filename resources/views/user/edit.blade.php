@extends('template')

@section('title')
  <title>{!! $title_tag !!}</title>
@section('title')

@section('contenu')
          
  <div class="head d-flex justify-content-center">
    @include('menu')
  </div>
  <section class='row center-card'>
    <div class="col-12 col-md-8 col-lg-6">
      <div class="card"> 
        <div class="card-header">
          <h3 class="card-title">{!! $title_tag !!}</h3>
        </div>
        <div class="card-body"> 
          {!! Form::open(['route' => ['user.update', $user->id], 'method' => 'put']) !!}
          <div class="form-row">
            <div class="col-3 col-form-label text-md-right">
              {{ Form::label('name', 'Nom :', ['class' => ''] ) }}
            </div>
            <div class="col-9 form-group">
              {!! Form::text('name', $user->name, ['class' => 'form-control' . ( $errors->has('name') ? ' is-invalid' : '' ), 'placeholder' => 'Nom']) !!}
              {!! $errors->first('name', '<small class="invalid-feedback">:message</small>') !!}
            </div>
          </div>
          <div class="form-row">
            <div class="col-3 col-form-label text-md-right">
              {{ Form::label('username', 'Pseudo :', ['class' => ''] ) }}
            </div>
            <div class="col-9 form-group">
              {!! Form::text('username', $user->username, ['class' => 'form-control' . ( $errors->has('name') ? ' is-invalid' : '' ), 'placeholder' => 'Nom']) !!}
              {!! $errors->first('name', '<small class="invalid-feedback">:message</small>') !!}
            </div>
          </div>
          <div class="form-row">
            <div class="col-3 col-form-label text-md-right">
              {{ Form::label('email', 'E-mail :' ) }}
            </div>
            <div class="col-9 form-group">
              {!! Form::email('email', $user->email, ['class' => 'form-control' . ( $errors->has('email') ? ' is-invalid' : '' ), 'placeholder' => 'Email']) !!}
              {!! $errors->first('email', '<small class="invalid-feedback">:message</small>') !!}
            </div>
          </div>
          <div class="form-row">
            <div class="col-3 col-form-label text-md-right">
              {{ Form::label('role', 'Droits :' ) }}
            </div>
            <div class="col-9 form-group">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="role" value="user"{{ $user->role == 'user' ? 'checked' : '' }}/>
                <label class="form-check-label">Utilisateur</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="role" value="admin"{{ $user->role == 'admin' ? 'checked' : '' }}/>
                <label class="form-check-label">Administrateur</label>
              </div>
            </div>
          </div>
          <a class="pw-change" data-toggle="collapse" data-target="#passwords" aria-expanded="false" aria-controls="passwords">
            Modifier le mot de passe <i class="fas fa-chevron-circle-down"></i>
          </a>
          <div class="collapse" id="passwords">
            <div class="form-row mt-2">
              <div class="col-3 col-form-label text-md-right">
                {{ Form::label('password', 'Nouveau :' ) }}
              </div>
              <div class="col-9 form-group">
                {!! Form::password('password', ['class' => 'form-control' . ( $errors->has('password') ? ' is-invalid' : '' ), 'placeholder' => 'Nouveau mot de passe'] ) !!}
                {!! $errors->first('password', '<small class="invalid-feedback">:message</small>') !!}
              </div>
            </div>
            <div class="form-row">
              <div class="col-3 col-form-label text-md-right">
                {{ Form::label('password_confirmation', 'Confirmer :' ) }}
              </div>
              <div class="col-9 form-group">
                {!! Form::password('password_confirmation', ['class' => 'form-control', 'placeholder' => 'Confirmer le mot de passe']) !!}
              </div>
            </div>
          </div>
          <div class="form-group last">
            {!! Form::submit('Envoyer', ['class' => 'btn btn-info']) !!}
            <a href="javascript:history.back()" class="btn btn-primary pull-right">
              <i class="fas fa-redo"></i> Retour
            </a>
          </div>
          {!! Form::close() !!}
        </div>
      </div>
    </div>
  </section>
@endsection

@section('scripts')
  <script>
(function(){
  $('#password').val('');
})();
  </script>
@endsection
