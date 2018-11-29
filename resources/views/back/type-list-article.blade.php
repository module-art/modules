<!DOCTYPE html>
<html>
  <body>

    @foreach ($results as $result)
      @php
        $titre = $result->blocs()->where('type','titre')->first();
        $texte = $result->blocs()->where('type','texte')->first();
      @endphp
      <div class="type-content">
        <button class="btn btn-sm btn-outline-danger btn-destroy" data-rubrique_id="{{ $result->id }}"><i class="fas fa-trash-alt"></i></button>
        <section class="articles">
          <p class="text-muted">Publié le {{ ( new Date($result->created_at) )->format('D j F Y') }}</p>
          <a href="{{ route('type_content', [$type->content_type, $result->id]) }}" class="titre text-dark">
            {!! $titre->contenu !!}
          </a>
          <div class="editable" data-bloc_id="{!! $texte->id !!}">{!! $texte->contenu !!}</div>
        </section>
      </div>
    @endforeach
      
  </body>
</html>
