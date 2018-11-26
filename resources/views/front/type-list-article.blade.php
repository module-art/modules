<!DOCTYPE html>
<html>
  <body>

    @foreach ($results as $result)
      @php
        $titre = $result->blocs()->where('type','titre')->first();
        $texte = $result->blocs()->where('type','texte')->first();
        $dossiers_image = $result->blocs()->where('type','galeries')->first();
      @endphp
      <section class="articles">
        <p class="text-muted">Publié le {{ ( new Date($result->created_at) )->format('D j F Y') }}</p>
        <a href="{{ route('type_content', [$type->content_type, $result->id]) }}" class="titre text-dark">
          {!! $titre->contenu !!}
        </a>
        <div>{!! $texte->contenu !!}</div>
        <div class="gallerys">
          {{ $dossiers_image->contenu }}
          {{--Créer une class pour traiter les dossiers images en créant un sous dossier thumbs s'il est absent et le remplir puis afficher la galerie d'images touch touch ou autre.--}}
        </div>
      </section>
    @endforeach
      
  </body>
</html>
