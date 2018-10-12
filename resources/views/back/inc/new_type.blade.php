<div class="card-header"><h1>{{ $operation == 'create' ? 'Créer' : 'Modifier' }} un type de contenu</h1></div>
<br/>
<div class="card-body"> 
  {!! Form::open(array('route' => $operation == 'create' ? 'type.store' : [ 'type.update', $type->id ], 'method' => $operation == 'create' ? 'POST' : 'PUT')) !!}
  <div class="form-group">
    {!! Form::label('content_type', 'Type de contenu (ex: article, événement...) :', ['class' => 'control-label']) !!}
    {!! Form::text('content_type', $operation == 'create' ? old('content_type') : $type->content_type, ['class' => 'form-control' . ( $errors->has('content_type') ? ' is-invalid' : '' )]) !!}
    {!! $errors->first('content_type', '<small class="invalid-feedback">:message</small>') !!}
  </div>
  <div class="form-group">
    {!! Form::label('champs', 'Champs séparés par une virgule (ex: titre,date,lieu...) :', ['class' => 'control-label']) !!}
    {!! Form::text('champs', $operation == 'create' ? old('champs') : $type->champs, ['class' => 'form-control' . ( $errors->has('champs') ? ' is-invalid' : '' )]) !!}
    {!! $errors->first('champs', '<small class="invalid-feedback">:message</small>') !!}
  </div>
  <div class="form-group">
    {!! Form::label('default_filtre', 'Filtre par défaut :', ['class' => 'control-label']) !!}
    {!! Form::text('default_filtre', $operation == 'create' ? old('default_filtre') : $type->default_filtre, ['class' => 'form-control' . ( $errors->has('default_filtre') ? ' is-invalid' : '' )]) !!}
    {!! $errors->first('default_filtre', '<small class="invalid-feedback">:message</small>') !!}
  </div>
  {!! Form::submit($operation == 'create' ? 'Créer' : 'Modifier', ['class' => 'btn btn-info']) !!}
  <a href="javascript:history.back()" class="btn btn-primary pull-right">
    <i class="fa fa-redo"></i> Retour
  </a>
  {!! Form::close() !!}
</div>
