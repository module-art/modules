@foreach ($results as $result)
  @php
    $titre = $result->blocs()->where('type','titre')->first();
    $texte = $result->blocs()->where('type','texte')->first();
  @endphp
  <div class="type-content">
    <button class="btn btn-sm btn-outline-danger btn-destroy" data-rubrique_id="{{ $result->id }}"><i class="fas fa-trash-alt"></i></button>
    <a class="btn btn-sm btn-outline-primary btn-edit" href="{{ route('type.editInsert', [$type->content_type, $result->id]) }}"><i class="fas fa-edit"></i></a>
    <section class="articles">
      <p class="text-muted">Publié le {{ ( new Date($result->created_at) )->format('D j F Y') }}</p>
      <a href="{{ route('type_content', [$type->content_type, $result->id]) }}" class="titre text-dark">
        {!! $titre->contenu !!}
      </a>
      <div>{!! $texte->contenu !!}</div>
    </section>
  </div>
@endforeach

@if($type->nb_per_page > 0)
  {{ $results->links('grands_chemins.vendor.pagination.bootstrap-4') }}
@endif
