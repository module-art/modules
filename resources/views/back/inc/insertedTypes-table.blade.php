<!DOCTYPE html>
<html>
  <body>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>date de création</th>
          @foreach($champs as $champ)
            @if(preg_match('/\(nb\)/', $champ))
              @php
                $field_name = preg_replace('/\(nb\).*$/', '', $champ);
              @endphp
              <th>{{ $field_name }}</th>
            @else
              <th>{{ $champ }}</th>
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
            <td>
              {{ $result->id }}
            </td>
            <td class="">
              {{ ( new Date($result->created_at) )->format('j M Y') }}
            </td>
            @foreach ($result->blocs as $y => $bloc)
              @if(preg_match('/date/', $bloc->type))
                <td>
                  <div class="input-group" id="datetimepicker{{ $i.$y }}" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker{{ $i.$y }}" value="{!! preg_replace('/(19|20)(\d{2})(\d{2})(\d{2})/', '$4/$3/$1$2', $bloc->contenu) !!}" data-toggle="datetimepicker"/>
                  </div>
                </td>
              @elseif(preg_match('/heure|horaire/', $bloc->type))
                <td>
                  <div class="input-group" id="datetimepicker{{ $i.$y }}" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker{{ $i.$y }}" value="{!! preg_replace('/(\d{2})(\d{2})/', '$1:$2', $bloc->contenu) !!}" data-toggle="datetimepicker"/>
                  </div>
                </td>
              @elseif(preg_match('/\(nb\)/', $bloc->type))
                @php
                  $unit = preg_replace('/^.*\(nb\)/', '', $bloc->type);
                @endphp
                <td>
                  <span>{!! $bloc->contenu !!}</span><span> {!! $unit !!}</span>
                </td>
              @elseif(preg_match('/titre/', $bloc->type))
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
              <a class="btn btn-sm btn-success" href="{{ route('type_content', [$type->content_type, $result->id]) }}"><i class="far fa-eye"></i><span class="sr-only">voir</span></a>
            </td>
            <td>
              <a class="btn btn-sm btn-primary" href="{{ route('type.editInsert', [$type->content_type, $result->id]) }}"><i class="fas fa-edit"></i></a>
            </td>
            <td class="type-content">
              <button class="btn btn-sm btn-danger btn-destroy" data-rubrique_id="{{ $result->id }}"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
        @endforeach
      </tbody>
    </table>

    {{ $results->links('vendor.pagination.bootstrap-4') }}
      
  </body>
</html>