<div class="card-header"><h1>Ajout d'un Email</h1></div>
<br/>
<div class="card-body"> 
  {!! Form::open(array('route' => 'mail.store', 'method' => 'POST')) !!}
  <div class="form-row">
    <div class="col-3 col-form-label text-md-right">
      <label for="username" class="control-label">Nom d'utilisateur :</label>
    </div>
    <div class="col-4 input-group">
      <input name="username" type="text" class="form-control{{  $errors->has('username') ? ' is-invalid' : '' }}" value="{{ old('username') }}" placeholder="utilisateur">
      {!! $errors->first('username', '<small class="invalid-feedback">:message</small>') !!}
    </div>
    <div class="col input-group">{{ '@'.$domain_name }}</div>
  </div>
  <div class="form-row">
    <div class="col-3 col-form-label text-md-right">
      {{ Form::label('password', 'Mot de passe :' ) }}
    </div>
    <div class="col-9 input-group">
      {!! Form::password('password', ['class' => 'form-control' . ( $errors->has('password') ? ' is-invalid' : '' ), 'placeholder' => 'Mot de passe'] ) !!}
      {!! $errors->first('password', '<small class="invalid-feedback">:message</small>') !!}
    </div>
  </div>
  <div class="form-row">
    <div class="col-3 col-form-label text-md-right">
      {{ Form::label('password_confirmation', 'Confirmer :' ) }}
    </div>
    <div class="col-9 input-group">
      {!! Form::password('password_confirmation', ['class' => 'form-control', 'placeholder' => 'Confirmer le mot de passe']) !!}
    </div>
  </div>
  <div class="row justify-content-between px-3">
    {!! Form::submit('Créer', ['class' => 'btn btn-info']) !!}
    <a href="javascript:history.back()" class="btn btn-primary">
      <i class="fa fa-redo"></i> Retour
    </a>
  </div>
  {!! Form::close() !!}
</div>
