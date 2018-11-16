<table class="table" route="categorie">
  <thead>
    <tr>
      <th>Titre</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    @foreach($type->categories as $categorie)
      <tr>
        <td class="titre">{!! $categorie->name !!}</td>
        <td>
          <button type="button" data-id="{{ $categorie->id }}" class="btn btn-outline-primary btn-sm categorieo" title="Modifier"><i class="fal fa-pen-square"></i> <span class="sr-only">Modifier</span></button>
        </td>
        <td>
          <button type="button" data-id="{{ $categorie->id }}" class="btn btn-outline-danger btn-sm categoried" title="Détacher"><i class="fas fa-unlink"></i></i> <span class="sr-only">Détacher</span></button>
        </td>
        <td>
          <button type="button" data-id="{{ $categorie->id }}" class="btn btn-outline-danger btn-sm categoriex" title="Supprimer"><i class="fal fa-trash"></i> <span class="sr-only">Supprimer</span></button>
        </td>
      </tr>
    @endforeach
  </tbody>
</table>
