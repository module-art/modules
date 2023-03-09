<div class="card-header">
  <h4>Catégories</h4>
</div>
<br/>
<div class="card-body"> 
  @if($type->categories()->count() > 0)
    <div class="form-group" id="categories-checkbox">
      @foreach($type->categories as $categorie)
        <div class="form-check">
          <input type="checkbox" name="categorie{{ $categorie->id }}" value="{{ $categorie->id }}" {{ isset($type_content) && in_array($categorie->id, $categories_ids) ? 'checked' : '' }} />
          <label for="{{ $categorie->id }}">{{ $categorie->name }}</label><br />
        </div>
      @endforeach
    </div>
  @endif
  <div class="d-flex justify-content-between">
    <button class="btn btn-info" name="submitbutton" type="submit" value="save"><i class="far fa-save"></i>{{ isset($type_content) ? ' Modifier' : ' Insérer'}}</button>
    @if(isset($type_content))
      <button class="btn btn-warning" name="submitbutton" type="submit" value="copy"><i class="far fa-copy"></i> Dupliquer</button>
      <a class="btn btn-danger" href="{{ route('type.destroyInsert', $type_content->id) }}" ><i class="far fa-trash-alt"></i> Supprimer</a>
    @endif
  </div>
  {!! Form::close() !!}
</div>
<div class="card-footer d-flex justify-content-between">
  <a href="javascript:history.back()" class="btn btn-primary btn-sm">
    <i class="fa fa-redo"></i> Retour
  </a>
  <a class="btn btn-primary btn-sm" href="{{ route('page.home') }}"><i class="fa fa-redo"></i> retour à l'accueil</a>
</div>

