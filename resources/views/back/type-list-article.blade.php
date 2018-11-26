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
        <div class="editable" data-bloc_id="{!! $texte->id !!}">{!! $texte->contenu !!}</div>
        <div class="gallerys editable" data-bloc_id="{!! $dossiers_image->id !!}">
          {{ preg_replace('/\[gal\](.*)\[\/gal\]/', '$1', $dossiers_image->contenu) }}
          {{--Créer une class pour traiter les dossiers images en créant un sous dossier thumbs s'il est absent et le remplir puis afficher la galerie d'images touch touch ou autre.--}}
        </div>
      </section>
    @endforeach

    {{--<table class="table">
      <tbody>
        @php //dd($results); @endphp
        @foreach ($results as $i => $result)
          <tr>
            <td>
              <a href="{{ route('type_content', [$type->content_type, $result->id]) }}">link</a>
            </td>
            <td class="type-content">
              <button class="btn btn-sm btn-outline-danger btn-destroy" data-rubrique_id="{{ $result->id }}"><i class="fas fa-trash-alt"></i></button>
              {{ ( new Date($result->created_at) )->format('D j F Y') }}
            </td>
            @foreach ($result->blocs as $y => $bloc)
              @if(preg_match('/date/', $bloc->type))
                <td>
                  <div class="input-group editdate" id="datetimepicker{{ $i.$y }}" data-target-input="nearest" data-bloc_id="{!! $bloc->id !!}">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker{{ $i.$y }}" value="{!! preg_replace('/(19|20)(\d{2})(\d{2})(\d{2})/', '$4/$3/$1$2', $bloc->contenu) !!}" data-toggle="datetimepicker"/>
                  </div>
                </td>
              @elseif(preg_match('/heure|horaire/', $bloc->type))
                <td>
                  <div class="input-group editheure" id="datetimepicker{{ $i.$y }}" data-target-input="nearest" data-bloc_id="{!! $bloc->id !!}">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker{{ $i.$y }}" value="{!! preg_replace('/(\d{2})(\d{2})/', '$1:$2', $bloc->contenu) !!}" data-toggle="datetimepicker"/>
                  </div>
                </td>
              @elseif(preg_match('/\(nb\)/', $bloc->type))
                @php
                  $unit = preg_replace('/^.*\(nb\)/', '', $bloc->type);
                @endphp
                <td>
                  <span class="editnumber" data-bloc_id="{!! $bloc->id !!}">{!! $bloc->contenu !!}</span><span> {!! $unit !!}</span>
                </td>
              @elseif(preg_match('/titre/', $bloc->type))
                <td>
                  <div class="edititre" data-bloc_id="{!! $bloc->id !!}">{!! $bloc->contenu !!}</div>
                </td>
              @else
                <td>
                  <div class="editable" data-bloc_id="{!! $bloc->id !!}">{!! $bloc->contenu !!}</div>
                </td>
              @endif
            @endforeach
          </tr>
        @endforeach
      </tbody>
    </table>--}}
      
  </body>
</html>
