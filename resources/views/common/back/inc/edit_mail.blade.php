<div class="card-header"><h3>Modifier {{ $mail->email }}</h3></div>
<br/>
<div class="card-body"> 
  {!! Form::open(array('route' => ['mail.update', $mail->id], 'method' => 'PUT')) !!}
  <div class="form-row">
    <div class="col-3 col-form-label text-md-right">
      {{ Form::label('password', 'Nouveau mot de passe :' ) }}
    </div>
    <div class="col-9 input-group">
      {!! Form::password('password', ['class' => 'form-control' . ( $errors->has('password') ? ' is-invalid' : '' ), 'placeholder' => 'Nouveau mot de passe'] ) !!}
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
    {!! Form::submit('Modifier', ['class' => 'btn btn-info']) !!}
    <a href="javascript:history.back()" class="btn btn-primary">
      <i class="fa fa-redo"></i> Retour
    </a>
  </div>
  {!! Form::close() !!}
</div>
