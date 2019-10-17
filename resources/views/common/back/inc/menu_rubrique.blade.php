  <div class="dropdown cols-button">
    <button id="dropdownBlocsButton" type="button" class="dropdown-toggle btn btn-secondary btn-sm" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true" >Organiser</button>

    <div class="dropdown-menu" aria-labelledby="dropdownBlocsButton">
      <a class="dropdown-item change-col" data-colonnes="1">1 colonne</a>
      <a class="dropdown-item change-col" data-colonnes="2">2 colonnes</a>
      <a class="dropdown-item change-col" data-colonnes="3">3 colonnes</a>
      <a class="dropdown-item ranger">actualiser</a>
      <a class="dropdown-item inverser">inverser</a>
      <a class="dropdown-item deplacer">déplacer</a>
    </div>
  </div>

  <div class="dropdown bloc-button">
    <button id="dropdownAddButton" type="button" class="dropdown-toggle btn btn-secondary btn-sm" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true" >Ajouter</button>
    <div class="dropdown-menu" aria-labelledby="dropdownAddButton">
      <a class="dropdown-item add-bloc" data-format="large" data-order="{{ $order }}" >bloc large</a>
      <a class="dropdown-item add-bloc" data-format="normal" data-order="{{ $order }}" >bloc normal</a>
      @if(!isset($rubrique->type_contents))
        @foreach($types as $type)
          <a class="dropdown-item change-type" data-contentType="{{ $type->content_type }}" data-dbAction="add">Les {{ $type->content_type }}s</a>
        @endforeach
      @else
        <a class="dropdown-item change-type" data-contentType="{{ $rubrique->inclusive_type['content_type'] }}" data-dbAction="remove">Retirer les<br>{{ $rubrique->inclusive_type['content_type'] }}s</a>
      @endif

      <div class="dropdown-item">
        <label for="gallery">Galerie d'images</label><br>
        <input name="gallery" type="text" class="select-gallery" placeholder="Choisir..." autocomplete="off" data-toggle="popover" data-content="error"/>
      </div>
    </div>
  </div>
