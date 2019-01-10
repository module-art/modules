@extends('template')

@section('title')
    <title>Ajouter du contenu</title>
@endsection
@section('contenu')
	<div class="col-sm-offset-3 col-sm-6" id="start-content">
		<div class="panel panel-default">
      <div class="panel-heading"><h1>Ajout d'un texte au titre "{{ $titre->contenu }}" </h1></div>
      <br/>
			<div class="panel-body"> 
        {!! Form::open(array('route' => ['store_texte', $titre->id], 'method' => 'POST')) !!}
					<div class="form-group {!! $errors->has('type') ? 'has-error' : '' !!}">
              {!! Form::label('type', 'type de texte:') !!}
              {!! Form::select('type', ['', 'h2' => 'sous-titre large', 'h3' => 'sous-titre' , 'p' => 'paragraphe'], array('class' => 'form-control')) !!}
              {!! $errors->first('type', '<small class="help-block">:message</small>') !!}
					</div>
					<div id="texte1" class="shownable form-group hidden {!! $errors->has('contenu1') ? 'has-error' : '' !!}">
              {!! Form::label('contenu1', 'Sous-titre:') !!}
              <textarea name="contenu1" class="form-control" rows="5" ></textarea>
						{!! $errors->first('contenu1', '<small class="help-block">:message</small>') !!}
					</div>
					<div id="texte2" class="shownable form-group hidden {!! $errors->has('contenu2') ? 'has-error' : '' !!}">
              {!! Form::label('contenu2', 'Texte:') !!}
              <textarea name="contenu2" class="form-control" rows="5" ></textarea>
						{!! $errors->first('contenu2', '<small class="help-block">:message</small>') !!}
					</div>
					<div class="form-group hidden">
              {!! Form::number('place', $_GET['nb']+1 , array('class' => 'form-control')) !!}
					</div>
					{!! Form::submit('Envoyer', ['class' => 'btn btn-primary pull-right']) !!}
          <a href="javascript:history.back()" class="btn btn-primary">
            <span class="glyphicon glyphicon-circle-arrow-left"></span> Retour
          </a>
        {!! Form::close() !!}
			</div>
		</div>
	</div>
@endsection

@section('scripts')
    <script src="/js/redactor.js"></script>
    <script src="/js/redactor/fr.js"></script>
    <script>
    $(function()
    {

      $('textarea').redactor({
            buttons: ['bold', 'italic', 'underline', 'link'],
            lang: 'fr'
      });

      $("#type").change(function(){
        if(this.value == 'h2'){
          $('#texte2').addClass('hidden');
          $('#texte1').removeClass('hidden');
        }else if(this.value == 'h3'){
          $(".shownable").removeClass('hidden');
        }else if(this.value == 'p'){
          $('#texte1').addClass('hidden');
          $('#texte2').removeClass('hidden');
        }
      });
    });
    </script>
@endsection
