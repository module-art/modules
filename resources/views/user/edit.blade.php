@extends('template')

@section('title')
  <title>Utilisateurs</title>
@section('title')

@section('contenu')
          
<div class="head d-flex justify-content-center">
  @include('menu')
</div>
  <section class='row center-card'>
    <div class="col-12 col-md-8 col-lg-6">
      <div class="card"> 
        <div class="card-header">
          <h3 class="card-title">Modification d'un utilisateur</h3>
        </div>
        <div class="card-body"> 
          {!! Form::model($user, ['route' => ['user.update', $user->id], 'method' => 'put', 'class' => '']) !!}
          <div class="form-group">
            {!! Form::text('name', null, ['class' => 'form-control' . ( $errors->has('name') ? ' is-invalid' : '' ), 'placeholder' => 'Nom']) !!}
            {!! $errors->first('name', '<small class="invalid-feedback">:message</small>') !!}
          </div>
          <div class="form-group">
            {!! Form::email('email', null, ['class' => 'form-control' . ( $errors->has('email') ? ' is-invalid' : '' ), 'placeholder' => 'Email']) !!}
            {!! $errors->first('email', '<small class="invalid-feedback">:message</small>') !!}
          </div>
          <div class="form-group">
            {!! Form::select('role', ['admin' => 'Administrateur', 'user' => 'Utilisateur']) !!}
          </div>
          {!! Form::submit('Envoyer', ['class' => 'btn btn-info']) !!}
          <a href="javascript:history.back()" class="btn btn-primary pull-right">
            <i class="fas fa-redo"></i> Retour
          </a>
          {!! Form::close() !!}
        </div>
      </div>
    </div>
  </section>
@endsection
