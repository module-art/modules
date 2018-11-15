<table class="table" route="categorie">
  <thead>
    <tr>
      <th>Titre</th>
      <th>Opérations</th>
    </tr>
  </thead>
  <tbody>
    @foreach($type->categories as $categorie)
      <tr>
        <td class="titre">{!! $categorie->name !!}</td>
        <td>
          <button type="button" data-id="{{ $categorie->id }}" class="btn btn-outline-primary btn-sm categorieo"><i class="fal fa-pen-square"></i> <span class="sr-only">Modifier</span></button>
        </td>
        <td>
          <button type="button" data-id="{{ $categorie->id }}" class="btn btn-outline-danger btn-sm categoriex"><i class="fal fa-trash"></i> <span class="sr-only">Supprimer</span></button>
        </td>
      </tr>
    @endforeach
  </tbody>
</table>
