@foreach($type_content->blocs as $bloc)
  <div class="large-bloc type-content mt-4">
    <div>{!! $bloc->type !!}</div>
    <div class="editable" data-bloc_id="{!! $bloc->id !!}">{!! $bloc->contenu !!}</div>
  </div>
@endforeach
<h4>Catégories</h4>
@foreach($type_content->categories as $categorie)
  {{ $categorie->name }}
@endforeach
