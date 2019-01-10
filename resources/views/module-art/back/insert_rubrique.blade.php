@extends('template')

@section('title')
    <title>Ajouter du contenu</title>
@endsection
@section('contenu')
	<div class="col-sm-offset-3 col-sm-6">
		<div class="panel panel-info">
      <div class="panel-heading"><h1>Ajout d'un titre à la page {{ $page->menu_title }} </h1></div>
      <br/>
			<div class="panel-body"> 
        {!! Form::open(array('route' => ['store_titre', $page->id], 'method' => 'POST', 'files' => true)) !!}
					<div class="form-group {!! $errors->has('contenu') ? 'has-error' : '' !!}">
            {!! Form::label('contenu', 'Texte:') !!}
            <textarea name="contenu" class="form-control" rows="2" ></textarea>
						{!! $errors->first('contenu', '<small class="help-block">:message</small>') !!}
					</div>
					<div class="form-group {!! $errors->has('image') ? 'has-error' : '' !!}">
            {!! Form::label('image', 'Image de fond:') !!}
						{!! Form::file('image', ['class' => 'form-control']) !!}
						{!! $errors->first('image', '<small class="help-block">:message</small>') !!}
					</div>
					<div class="form-group {!! $errors->has('place') ? 'has-error' : '' !!}">
            {!! Form::label('place', 'Place:') !!}
            {!! Form::number('place', null, array('class' => 'form-control')) !!}
						{!! $errors->first('place', '<small class="help-block">:message</small>') !!}
					</div>
					{!! Form::submit('Envoyer !', ['class' => 'btn btn-primary pull-right']) !!}
        {!! Form::close() !!}
			</div>
		</div>
		<a href="javascript:history.back()" class="btn btn-primary">
			<span class="glyphicon glyphicon-circle-arrow-left"></span> Retour
		</a>
	</div>
@endsection
