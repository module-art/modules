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
    <button class="btn btn-info" type="submit"><i class="far fa-save"></i>{{ isset($type_content) ? ' Modifier' : ' Insérer'}}</button>
    <a href="javascript:history.back()" class="btn btn-primary">
      <i class="fa fa-redo"></i> Retour
    </a>
  </div>
  {!! Form::close() !!}
</div>

