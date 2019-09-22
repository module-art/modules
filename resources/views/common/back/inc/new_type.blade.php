<div class="card-header"><h2>{{ $operation == 'create' ? 'Créer' : 'Modifier' }} un type de contenu</h2></div>
<br/>
<div class="card-body"> 
  {!! Form::open(array('route' => $operation == 'create' ? 'type.store' : [ 'type.update', $type->id ], 'method' => $operation == 'create' ? 'POST' : 'PUT', 'id' => 'the-form')) !!}
  <div class="form-group">
    {!! Form::label('content_type', 'Type de contenu (ex: article, événement...) :', ['class' => 'control-label']) !!}
    {!! Form::text('content_type', $operation == 'create' ? old('content_type') : $type->content_type, ['class' => 'form-control' . ( $errors->has('content_type') ? ' is-invalid' : '' )]) !!}
    {!! $errors->first('content_type', '<small class="invalid-feedback">:message</small>') !!}
  </div>
  <div class="form-row">
    {!! Form::label('champs', 'Champs (ex: titre,date,lieu...) :', ['class' => 'control-label col-12 col-md-6']) !!}
    <label class="control-label col-12 col-md-6">Type de champ :</label>
    <input type="text" name="champs" value="{{ $operation == 'create' ? old('champs') : $type->champs }}" class="form-control d-none {{ $errors->has('champs') ? ' is-invalid' : '' }}" />
    {{--{!! $errors->first('champs', '<small class="invalid-feedback">:message</small>') !!}--}}
  </div>
  <section id="field-manage-script">
    @if($operation == 'create')
      <div class="form-group">
        <input type="text" name="champs-0" value="{{ old('champs-0') }}" class="form-control" />
      </div>
    @else
      @foreach($champs as $i => $field)
        <section class="form-row justify-content-end">
          <div class="form-group col-11 col-md-5">
            <input type="text" name="champs-{{ $i }}" value="{{ preg_replace('/\(.+\).*$/', '', $field) }}" class="form-control" />
          </div>
          <div class="form-group offset-1 col-11 offset-md-0 col-md-6">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radios-{{ $i }}" value="text" {{ !preg_match('/\(.+\)/', $field) ? 'checked' : '' }}>
              <label class="form-check-label">Texte</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radios-{{ $i }}" value="date" {{ preg_match('/\(date\)/', $field) ? 'checked' : '' }}>
              <label class="form-check-label">Date</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radios-{{ $i }}" value="time" {{ preg_match('/\(time\)/', $field) ? 'checked' : '' }}>
              <label class="form-check-label">Heure</label>
            </div>
            <div class="form-check">
              @php
                $nb_checked = preg_match('/\(nb\)/', $field) ? true : false;
                $nb_has_unit = preg_match('/\(.+\).+$/', $field) ? true : false;
              @endphp
              <input class="form-check-input {{ $nb_checked ? 'checked' : '' }}" type="radio" name="radios-{{ $i }}" value="nb" {{ $nb_checked ? 'checked' : '' }}>
              <label class="form-check-label">Nombre</label>
              <input class='unit {{ $nb_checked ? '' : 'd-none' }}' type="text" value="{{ $nb_has_unit ? preg_replace('/^.+\(nb\)/', '', $field) : '' }}"/>
            </div>
          </div>
          <div class="remove-field-button" id=""><i class="fas fa-minus-circle"></i></div>
          <div class="up-button" id=""><i class="fas fa-arrow-circle-up"></i></div>
          <div class="down-button" id=""><i class="fas fa-arrow-circle-down"></i></div>
        </section>
      @endforeach
    @endif
  </section>
  <div class="d-none" id="fields-length">{{ $i }}</div>
  <div class="form-row justify-content-end">
    <div class="col-2" id="add-field-button"><i class="fas fa-plus-circle"></i></div>
  </div>
  <div class="form-group">
    @if($operation == 'edit')
      <p>On peut ajouter, supprimer ou modifier des champs.<br>
      Attention ! Chaque opération doit être faite séparément.</p>
    @endif
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
        <input class="form-check-input" type="radio" name="default_filtre" value="created_at"{{ $operation == 'edit' && $type->default_filtre  == 'created_at' ? 'checked' : '' }}{{ $operation == 'create' ? 'checked' : '' }}/>
        <label class="form-check-label"> date de création</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="default_filtre" value="updated_at"{{ $operation == 'edit' && $type->default_filtre  == 'updated_at' ? 'checked' : '' }}/>
        <label class="form-check-label"> dernière mise à jour</label>
      </div>
      @if($operation == 'edit')
        @foreach($champs as $champ)
          <div class="form-check">
            <input class="form-check-input" type="radio" name="default_filtre" value="{{ $champ }}" {{ $type->default_filtre  == $champ ? 'checked' : '' }}/>
            <label class="form-check-label"> {{ preg_replace('/\(.*\).*$/', '', $champ) }}</label>
          </div>
        @endforeach
      @endif
    </div>
  </div>
  <div class="form-group">
    <label for="descendant">Tri décroissant :</label>
    <input name="descendant" value="1" type="checkbox"{{ $operation == 'edit' && $type->descendant ? 'checked' : '' }}>
  </div>
  <div class="form-group">
    <label for="nb_per_page">Nombre à afficher (0 désactive la pagination):</label>
    <input name="nb_per_page" class="form-control" value="{{ $operation == 'edit' ? $type->nb_per_page : 0 }}" type="number">
  </div>

  <div class="form-row">
    <div class="col-3 col-form-label">
      <label for="child_of"> Appartient à :</label>
    </div>
    <div class="col-9 form-group">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="child_of" value=0 {{ ($operation == 'edit' && $type->child_of == null) ? 'checked' : '' }}/>
        <label class="form-check-label"> Aucun</label>
      </div>
      @foreach($types as $parent_type)
        @if($operation == 'edit' && $parent_type->content_type != $type->content_type)
          <div class="form-check">
            <input class="form-check-input" type="radio" name="child_of" value="{{ $parent_type->id }}"{{ ($operation == 'edit' && $parent_type->id == $type->child_of) ? 'checked' : '' }}/>
            <label class="form-check-label"> {{ $parent_type->content_type }}</label>
          </div>
        @elseif($operation == 'create')
          <div class="form-check">
            <input class="form-check-input" type="radio" name="child_of" value="{{ $parent_type->id }}"{{ ($operation == 'edit' && $parent_type->id == $type->child_of) ? 'checked' : '' }}/>
            <label class="form-check-label"> {{ $parent_type->content_type }}</label>
          </div>
        @endif
      @endforeach
    </div>
  </div>

  @if($operation == 'create')
    {!! Form::submit('Créer', ['class' => 'btn btn-info']) !!}
    <a href="javascript:history.back()" class="btn btn-primary pull-right">
      <i class="fa fa-redo"></i> Retour
    </a>
    {!! Form::close() !!}
  @endif
</div>
