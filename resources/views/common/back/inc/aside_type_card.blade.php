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
    <label for="choose_cat" class="control-label">Attacher une catégorie existante :</label>
    <input class="form-control" placeholder="Chercher..." name="choose_cat" type="text">
  </div>

  <div class="d-flex justify-content-between">
    <button class="btn btn-info" type="submit"><i class="far fa-save"></i> {{ 'Modifier' }}</button>
    <a href="javascript:history.back()" class="btn btn-primary">
      <i class="fa fa-redo"></i> Retour
    </a>
  </div>
  </form>
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
          <label for="name" class="control-label">Nom</label>
          <input class="form-control" name="name" type="text" id="name">
          <small class="invalid-feedback"></small>
          <input class="d-none" name="type_id" type="number" value="{{ $type->id }}">
        </div>
      </div>
      <div class="modal-footer">
        <button id="ajout-categorie" type="button" class="btn btn-primary"><i class="far fa-save"></i> Enregistrer</button>
      </div>
    </div>
  </div>
</div>

