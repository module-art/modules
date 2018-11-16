@php
  switch($operation){
    case 'create':
      $button_text = 'Créer';
      break;
    case 'edit':
      $button_text = 'Modifier';
      break;
    case 'insert':
      $button_text = 'Insérer';
      break;
  }
@endphp
<div class="card-header"><h2>Catégories {{ $operation == 'insert' ? $type_name : 'du type' }}</h2></div>
<br/>
<div class="card-body"> 
  @if($operation != 'create')
    @if($type->categories()->count() > 0)
      <div id="categories-container">
        @include('back.inc.categorie_table')
      </div>
    @endif
    <div class="form-group d-flex justify-content-between">
      <button type="button" class="btn btn-primary col-5" data-toggle="modal" data-target="#modalCategorie">
        Créer une catégorie
      </button>
      {!! Form::text('choose_cat', null, ['class' => 'form-control col-5', 'placeholder' => 'Chercher...']) !!}
    </div>
  @else
    <p>Les catégories s'ajoute en éditant un type déjà existant.</p>
  @endif
  <button class="btn btn-info btn-lg" type="submit"><i class="far fa-save"></i> {{ $button_text }}</button>
  <a href="javascript:history.back()" class="btn btn-primary pull-right">
    <i class="fa fa-redo"></i> Retour
  </a>
  {!! Form::close() !!}
</div>

<!-- Modal -->
<div class="modal fade" id="modalCategorie" tabindex="-1" role="dialog" aria-labelledby="modalCategorieTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="title-ajout" >
          Ajouter une catégorie
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          {!! Form::label('name', 'Nom', ['class' => 'control-label'], false) !!}
          {!! Form::text('name', null, array('class' => 'form-control') ) !!}
          {!! Form::number('type_id', $type->id, array('class' => 'd-none') ) !!}
        </div>
      </div>
      <div class="modal-footer">
        <button id="ajout-categorie" type="button" class="btn btn-primary"><i class="far fa-save"></i> Enregistrer</button>
      </div>
    </div>
  </div>
</div>

