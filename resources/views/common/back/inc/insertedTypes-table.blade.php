<table class="table">
  <thead>
    <tr>
      @if($type->default_filtre == 'place')
        <th>Place</th>
      @elseif($type->default_filtre == 'updated_at')
        <th>Mis à jour</th>
      @else
        <th>date</th>
      @endif
      <th>Publié</th>
      <th>Archivé</th>
      @foreach($json_fields as $field)
        @if( !in_array(strtolower($field->name), ['image', 'photo']) )
          <th>{{ $field->name }}</th>
        @endif
      @endforeach
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    @php //dd($results); @endphp
    @if($results->count() > 0)
      @foreach ($results as $result)
        <tr>
          @if($type->default_filtre == 'place')
            <td>{{ $result->place }}</td>
          @elseif($type->default_filtre == 'updated_at')
            <td>{{ $result->updated_at }}</td>
          @else
            <td>
              {{ ( new Date($result->created_at) )->format('j M Y') }}
            </td>
          @endif
          <td data-toggle="content-publication" data-content_id="{{ $result->id }}">
            {!! $result->publie ? '<span class="published"><i class="far fa-check-circle"></i></span>' : '<span class="unpublished"><i class="far fa-times-circle"></i></span>' !!}
          </td>
          <td data-toggle="content-archivage" data-content_id="{{ $result->id }}">
            {!! $result->archive ? '<span class="published"><i class="far fa-check-circle"></i></span>' : '<span class="unpublished"><i class="far fa-times-circle"></i></span>' !!}
          </td>
          @php
            $bloc_fields = $result->blocs;
          @endphp
          @foreach ($json_fields as $field)
            @php
              $contenu = $bloc_fields->where('type', $field->name)->first()->contenu;
            @endphp
            @if($field->type == 'date')
              @php
                if(!preg_match('/^\d{4}-\d{2}-\d{2}$/', $contenu)) $contenu = "2004-08-15";
              @endphp
              <td>
                {!! date_format(date_create($contenu), 'd/m/Y') !!}
              </td>
            @elseif($field->type == 'time')
              @php
                if(!preg_match('/^\d{2}:\d{2}:\d{2}$/', $contenu)) $contenu = "12:00:00";
              @endphp
              <td>
                {!! date_format(date_create($contenu), 'H:i') !!}
              </td>
            @elseif($field->type == 'nb')
              <td>
                {!! $contenu !!}
              </td>
            @elseif($field->type == 'checkbox')
              <td>
                {!! $contenu ? 'oui':'non' !!}
              </td>
            @elseif(preg_match('/titre/i', $field->name))
              <td>
                {!! strip_tags($contenu) !!}
              </td>
            @elseif( in_array(strtolower($field->name), ['image', 'photo']) )
            @else
              <td>
                {!! str_limit(strip_tags($contenu), $limit = 50, $end = ' [...]') !!}
                {{--<div data-bloc_id="{!! $bloc->id !!}">{!! $bloc->contenu !!}</div>--}}
              </td>
            @endif
          @endforeach
          <td>
            <a class="btn btn-sm btn-success" href="{{ route('type_content', [str_slug($type->content_type), $result->id]) }}"><i class="far fa-eye"></i><span class="sr-only">voir</span></a>
          </td>
          <td>
            <a class="btn btn-sm btn-primary" href="{{ route('type.editInsert', [$type->content_type, $result->id]) }}"><i class="fas fa-edit"></i></a>
          </td>
          <td class="type-index">
            <button class="btn btn-sm btn-danger btn-destroy" data-rubrique_id="{{ $result->id }}"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      @endforeach
    @else
      <td>Il n'y a pas de résultat.</td>
    @endif
  </tbody>
</table>

@if($results->count() > 0)
  {{ $results->links('themes.'.config('modules.theme').'.vendor.pagination.bootstrap-4') }}
@endif
