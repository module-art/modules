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
<div class="card-header">
  <p>Type de contenu : {{ $type->content_type }}</p>
  <h2>Catégories</h2>
</div>
<br/>
<div class="card-body"> 
  @if($type->categories()->count() > 0)
    <div id="categories-checkbox">
      @foreach($type->categories as $categorie)
        <div class="form-check">
          <input type="checkbox" name="categorie{{ $categorie->id }}" value="{{ $categorie->id }}" {{-- in_array($categorie->id, $categories_ids) ? 'checked' : '' --}} />
          <label for="{{ $categorie->id }}">{{ $categorie->name }}</label><br />
        </div>
      @endforeach
    </div>
  @endif
  <button class="btn btn-info btn-lg" type="submit"><i class="far fa-save"></i> {{ $button_text }}</button>
  <a href="javascript:history.back()" class="btn btn-primary pull-right">
    <i class="fa fa-redo"></i> Retour
  </a>
  {!! Form::close() !!}
</div>

