
<section class="container" id="contact">
  <div class="row justify-content-center">
    <div class="col-12 col-md-8">
      <div class="card card-info">
        <div class="card-body"> 
          {!! Form::open(['route' => 'page.mail', 'id' => 'form-contact']) !!}
          <div class="form-group">
            {!! Form::text('nom', null, ['class' => 'form-control' . ( $errors->has('title') ? ' is-invalid' : '' ), 'placeholder' => 'nom']) !!}
            {!! $errors->first('nom', '<small class="invalid-feedback">:message</small>') !!}
          </div>
          <div class="form-group">
            {!! Form::email('email', null, ['class' => 'form-control' . ( $errors->has('title') ? ' is-invalid' : '' ), 'placeholder' => 'email']) !!}
            {!! $errors->first('email', '<small class="invalid-feedback">:message</small>') !!}
          </div>
          <div class="form-group">
            {!! Form::text('subject', null, ['class' => 'form-control' . ( $errors->has('title') ? ' is-invalid' : '' ), 'placeholder' => 'Sujet']) !!}
            {!! $errors->first('nom', '<small class="invalid-feedback">:message</small>') !!}
          </div>
          <div class="form-group">
            {!! Form::textarea ('texte', null, ['id' => 'message', 'class' => 'form-control' . ( $errors->has('title') ? ' is-invalid' : '' ), 'rows' => 6]) !!}
            {!! $errors->first('texte', '<small class="invalid-feedback">:message</small>') !!}
          </div>
          {{-- Form::submit('<i class="fas fa-camera-retro"></i>Envoyer', ['class' => 'btn btn-primary pull-right']) --}}

          <button class="btn btn-primary pull-right"><i class="fas fa-cog fa-spin fa-lg"></i> Envoyer</button>
          {!! Form::close() !!}
        </div>
      </div>
    </div>
  </div>
</section>
