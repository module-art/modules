<!DOCTYPE html>
<html>
  <body>

    @foreach ($results as $result)
      @php
        $titre = $result->blocs()->where('type','titre')->first();
        $texte = $result->blocs()->where('type','texte')->first();
      @endphp
      <section class="articles">
        <p class="text-muted">Publié le {{ ( new Date($result->created_at) )->format('D j F Y') }}</p>
        <a href="{{ route('type_content', [$type->content_type, $result->id]) }}" class="titre text-dark">
          {!! $titre->contenu !!}
        </a>
        <div>{!! $texte->contenu !!}</div>
      </section>
    @endforeach
    @if($type->nb_per_page > 0)
      {{ $results->links('grands_chemins.vendor.pagination.bootstrap-4') }}
    @endif
      
  </body>
</html>
