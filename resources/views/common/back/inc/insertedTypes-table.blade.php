<table class="table">
  <thead>
    <tr>
      <th>date</th>
      <th>Publié</th>
      <th>Archivé</th>
      @foreach($champs as $champ)
        @if(preg_match('/\(nb\)/', $champ))
          @php
            $field_name = preg_replace('/\(nb\)/', '', $champ);
          @endphp
          <th>{{ preg_replace('/_/', ' ', $field_name) }}</th>
        @else
          <th>{{ preg_replace('/_/', ' ', $champ) }}</th>
        @endif
      @endforeach
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    @php //dd($results); @endphp
    @foreach ($results as $i => $result)
      <tr>
        <td class="">
          {{ ( new Date($result->created_at) )->format('j M Y') }}
        </td>
        <td data-toggle="content-publication" data-content_id="{{ $result->id }}">
          {!! $result->publie ? '<span class="published"><i class="far fa-check-circle"></i></span>' : '<span class="unpublished"><i class="far fa-times-circle"></i></span>' !!}
        </td>
        <td data-toggle="content-archivage" data-content_id="{{ $result->id }}">
          {!! $result->archive ? '<span class="published"><i class="far fa-check-circle"></i></span>' : '<span class="unpublished"><i class="far fa-times-circle"></i></span>' !!}
        </td>
        @foreach ($result->blocs as $y => $bloc)
          @if(preg_match('/date/i', $bloc->type))
            <td>
              {!! date_format(date_create($bloc->contenu), 'd/m/Y') !!}
            </td>
          @elseif(preg_match('/heure|horaire/i', $bloc->type))
            <td>
              {!! date_format(date_create($bloc->contenu), 'H:i') !!}
            </td>
          @elseif(preg_match('/\(nb\)/', $bloc->type))
            @php
              $unit = preg_replace('/^.*\(nb\)/', '', $bloc->type);
            @endphp
            <td>
              <span>{!! $bloc->contenu !!}</span><span> {!! $unit !!}</span>
            </td>
          @elseif(preg_match('/titre/i', $bloc->type))
            <td>
              <div>{!! strip_tags($bloc->contenu) !!}</div>
            </td>
          @else
            <td>
              {!! str_limit(strip_tags($bloc->contenu), $limit = 50, $end = ' [...]') !!}
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
  </tbody>
</table>

{{ $results->links('themes.'.config('app.theme').'.vendor.pagination.bootstrap-4') }}
