<table class="table">
  <thead>
    <tr>
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
    </tr>
  </thead>
  <tbody>
    @php //dd($results); @endphp
    @foreach ($results as $i => $result)
      <tr class="type-content">
        <td>
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
        <td>
          <a class="btn btn-sm btn-success" href="{{ route('type_content', [str_slug($type->content_type), $result->id]) }}"><i class="far fa-eye"></i><span class="sr-only">voir</span></a>
        </td>
      </tr>
    @endforeach
  </tbody>
</table>
