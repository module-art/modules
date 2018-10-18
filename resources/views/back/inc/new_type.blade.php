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
    <p>Chaque champ pourra être rempli avec du texte, des images, des vidéos.<br>
    Si vous mettez le mot "date" dans le nom du champ, il sera rempli avec un calendrier.<br>
    Pour les nombres, vous pouvez ajouter "(nb)" ou "(nb)une-unité" à la fin du nom du champ (ex "prix(nb)€", "contenance(nb)litres"...).<br>
    L'expression (nb) est réservée pour cet usage.</p>
  </div>
  <div class="form-row">
    <div class="col-2 col-form-label">
      {{ Form::label('default_filtre', 'Filtre par défaut :' ) }}
    </div>
    <div class="col-10 form-group">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="default_filtre" value="created_at"{{ $operation == 'edit' && $type->default_filtre  == 'created_at' ? 'checked' : '' }}/>
        <label class="form-check-label"> date de création</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="default_filtre" value="updated_at"{{ $operation == 'edit' && $type->default_filtre  == 'updated_at' ? 'checked' : '' }}/>
        <label class="form-check-label"> dernière mise à jour</label>
      </div>
      @if($operation == 'edit')
        @foreach($champs as $champ)
          <div class="form-check">
            <input class="form-check-input" type="radio" name="default_filtre" value="{{ $champ }}"{{ $type->default_filtre  == $champ ? 'checked' : '' }}/>
            <label class="form-check-label"> {{ $champ }}</label>
          </div>
        @endforeach
      @endif
    </div>
  </div>
  <div class="form-group">
    <label for="descendant">Inverser le tri :</label>
    <input name="descendant" value="1" type="checkbox"{{ $operation == 'edit' && $type->descendant ? 'checked' : '' }}>
  </div>
  {!! Form::submit($operation == 'create' ? 'Créer' : 'Modifier', ['class' => 'btn btn-info']) !!}
  <a href="javascript:history.back()" class="btn btn-primary pull-right">
    <i class="fa fa-redo"></i> Retour
  </a>
  {!! Form::close() !!}
</div>
