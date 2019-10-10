<div class="card-header">
  <p>Type de contenu : {{ $type->content_type }}</p>
  <h4>Catégories</h4>
</div>
<br/>
<div class="card-body"> 

  <div class="form-group" id="categories-container">
    @if($type->categories()->count() > 0)
      @include('common.back.inc.categorie_table')
    @endif
  </div>
  <div class="form-group">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCategorie">
      Créer une catégorie
    </button>
  </div>
  <div class="form-group">
    {!! Form::text('choose_cat', null, ['class' => 'form-control', 'placeholder' => 'Chercher...']) !!}
  </div>

  <div class="d-flex justify-content-between">
    <button class="btn btn-info" type="submit"><i class="far fa-save"></i> {{ 'Modifier' }}</button>
    <a href="javascript:history.back()" class="btn btn-primary">
      <i class="fa fa-redo"></i> Retour
    </a>
  </div>
  {!! Form::close() !!}
</div>
<div class="card-footer d-flex justify-content-end">
  <a class="btn btn-primary btn-sm" href="{{ route('page.home') }}"><i class="fa fa-redo"></i> retour à l'accueil</a>
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
          <small class="invalid-feedback"></small>
          {!! Form::number('type_id', $type->id, array('class' => 'd-none') ) !!}
        </div>
      </div>
      <div class="modal-footer">
        <button id="ajout-categorie" type="button" class="btn btn-primary"><i class="far fa-save"></i> Enregistrer</button>
      </div>
    </div>
  </div>
</div>

