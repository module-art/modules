<div class="card-header"><h1>Insertion {{ $type_name }}</h1></div>
<br/>
<div class="card-body"> 
  {!! Form::open(array('route' => ['type.insert', $type_id], 'method' => 'POST')) !!}
  <div class="form-group">
    {!! Form::label('contenu', 'Nom principal :', ['class' => 'control-label']) !!}
    {!! Form::text('contenu', old('contenu'), ['class' => 'form-control' . ( $errors->has('contenu') ? ' is-invalid' : '' )]) !!}
    {!! $errors->first('contenu', '<small class="invalid-feedback">:message</small>') !!}
  </div>
  <div class="form-row justify-content-between">
    @for($i=0; $i<$nb_champs; $i++)
      <div class="form-group col-{{ 12/count($champs) }}">
        {!! Form::label($champs[$i], $champs[$i] . ' :', ['class' => 'control-label']) !!}
        {!! Form::text($champs[$i], old($champs[$i]), ['class' => 'form-control']) !!}
      </div>
    @endfor
  </div>
  {!! Form::submit('Insérer', ['class' => 'btn btn-info']) !!}
  <a href="javascript:history.back()" class="btn btn-primary pull-right">
    <i class="fa fa-redo"></i> Retour
  </a>
  {!! Form::close() !!}
</div>
