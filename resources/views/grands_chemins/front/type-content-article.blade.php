  @php
  $titre = $type_content->blocs()->where('type','titre')->first();
  $texte = $type_content->blocs()->where('type','texte')->first();
  @endphp
  <div class="large-bloc type-content">
    {{ ( new Date($titre->created_at) )->format('D j F Y') }}
    <div>{!! $titre->contenu !!}</div>
    <div>{!! $texte->contenu !!}</div>
    @foreach($type_content->categories as $categorie)
      {{ $categorie->name }}
    @endforeach
  </div>
