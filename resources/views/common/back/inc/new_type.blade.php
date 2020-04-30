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
      <section class="form-row justify-content-end">
        <div class="form-group col-11 col-md-5">
          <input type="text" name="champs-0" value="{{ old('champs-0') }}" class="form-control" />
          {!! $errors->first('champs-0', '<small class="invalid-feedback">:message</small>') !!}
        </div>
        <div class="form-group offset-1 col-11 offset-md-0 col-md-6">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="type-0" value="text-raw" checked>
            <label class="form-check-label">Texte brut</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="type-0" value="text" checked>
            <label class="form-check-label">Texte</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="type-0" value="date">
            <label class="form-check-label">Date</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="type-0" value="time">
            <label class="form-check-label">Heure</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="type-0" value="nb">
            <label class="form-check-label">Nombre</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="type-0" value="checkbox">
            <label class="form-check-label">Case à cocher</label>
          </div>
        </div>
        <div class="remove-field-button" id=""><i class="fas fa-minus-circle"></i></div>
        <div class="up-button" id=""><i class="fas fa-arrow-circle-up"></i></div>
        <div class="down-button" id=""><i class="fas fa-arrow-circle-down"></i></div>
      </section>
    @else
      @foreach($fields as $i => $field)
        <section class="form-row justify-content-end">
          <div class="form-group col-11 col-md-5">
            <div class="input-group">
              <input type="text" name="champs-{{ $i }}" value="{{ $field->name }}" class="form-control" disabled />
              <div class="input-group-append field-editor">
                <span class="input-group-text"><i class="fas fa-pen"></i></span>
              </div></div>
          </div>
          <div class="form-group offset-1 col-11 offset-md-0 col-md-6">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="type-{{ $i }}" value="text-raw" {{ $field->type == 'text-raw' ? 'checked' : '' }} disabled>
              <label class="form-check-label">Texte brut</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="type-{{ $i }}" value="text" {{ $field->type == 'text' ? 'checked' : '' }} disabled>
              <label class="form-check-label">Texte</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="type-{{ $i }}" value="date" {{ $field->type == 'date' ? 'checked' : '' }} disabled>
              <label class="form-check-label">Date</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="type-{{ $i }}" value="time" {{ $field->type == 'time' ? 'checked' : '' }} disabled>
              <label class="form-check-label">Heure</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="type-{{ $i }}" value="nb" {{ $field->type == 'nb' ? 'checked' : '' }} disabled>
              <label class="form-check-label">Nombre</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="type-{{ $i }}" value="checkbox" {{ $field->type == 'checkbox' ? 'checked' : '' }} disabled>
              <label class="form-check-label">Case à cocher</label>
            </div>
          </div>
          <div class="remove-field-button" id=""><i class="fas fa-minus-circle"></i></div>
          <div class="up-button" id=""><i class="fas fa-arrow-circle-up"></i></div>
          <div class="down-button" id=""><i class="fas fa-arrow-circle-down"></i></div>
        </section>
      @endforeach
    @endif
  </section>
  <div class="d-none" id="fields-length">{{ $operation == 'edit' ? $i : 0 }}</div>
  <div class="form-row justify-content-end">
    <div class="col-2 enabled" id="add-field-button"><i class="fas fa-plus-circle"></i></div>
  </div>
  <div class="form-group">
    <p>Chaque champ de type texte pourra être rempli avec du texte, des images, des vidéos.<br>
    Les parenthéses sont interdites dans les noms des champs.</p>
    <p>
      <a class="text-warning" data-toggle="collapse" href="#advanced-info" role="button" aria-expanded="false" aria-controls="advanced-info">
        Info développeur <i class="fas fa-caret-down"></i>
      </a>
    </p>
    <div class="collapse" id="advanced-info">
      <div class="card card-body">
        Par défaut, les types de contenus s'affichent dans un tableau assez moche.<br>
        Pour personnaliser l'affichage des types de contenu, il faut créer deux fichiers de vues dans Themes/{ton theme}/views/front.<br>
        Le premier doit se nommer type-list-{nom du type de contenu}.blade.php et s'affichera en liste.<br>
        Le second doit se nommer type-content-{nom du type de contenu}.blade.php et s'affichera en page complète.<br>
        Pour qu'une page dédiée à un type de contenu puisse s'afficher, il faut créer une page hors menu, publiée, avec pour titre le nom du type de contenu, par exemple : Article.
      </div>
    </div>
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
        @foreach($fields as $field)
          <div class="form-check">
            <input class="form-check-input" type="radio" name="default_filtre" value="{{ $field->name }}" {{ $type->default_filtre  == $field->name ? 'checked' : '' }}/>
            <label class="form-check-label"> {{ $field->name }}</label>
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
    <label for="available">Disponible pour les rubriques :</label>
    <input name="available" value="1" type="checkbox"{{ $operation == 'edit' && $type->available ? 'checked' : '' }}>
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
    <div class="d-flex justify-content-around">
      {!! Form::submit('Créer', ['class' => 'btn btn-info']) !!}
      <a href="javascript:history.back()" class="btn btn-primary">
        <i class="fa fa-redo"></i> Retour
      </a>
      {!! Form::close() !!}
    </div>
  @endif
</div>

@if($operation == 'edit')
  <!-- Modal -->
  <div class="modal fade" id="modalFieldEditor" tabindex="-1" role="dialog" aria-labelledby="modalFieldTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Modifier un champ
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <section class="form-row justify-content-end">
            <div class="form-group col-11 col-md-5">
              <input type="text" name="new-field" value="{{ old('champs-0') }}" class="form-control" />
              <small class="invalid-feedback"></small>
            </div>
            <div class="form-group offset-1 col-11 offset-md-0 col-md-6">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="new-type" value="text-raw" checked>
                <label class="form-check-label">Texte brut</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="new-type" value="text">
                <label class="form-check-label">Texte</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="new-type" value="date">
                <label class="form-check-label">Date</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="new-type" value="time">
                <label class="form-check-label">Heure</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="new-type" value="nb">
                <label class="form-check-label">Nombre</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="new-type" value="checkbox">
                <label class="form-check-label">Case à cocher</label>
              </div>
            </div>
            <input type="text" name="old-field" class="d-none"/>
            <input type="text" name="old-type" class="d-none"/>
            <input type="number" value="{{ $type->id }}" name="type_id" class="d-none"/>
          </section>
        </div>
        <div class="modal-footer">
          <button id="field-update" type="button" class="btn btn-primary"><i class="far fa-save"></i> Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
@endif
