<table class="table">
  <thead>
    <tr>
      <th>date de création</th>
      @foreach($json_fields as $field)
        <th>{{ $field->name }}</th>
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
        @php
          $bloc_fields = $result->blocs;
        @endphp
        @foreach ($json_fields as $y => $field)
          @php
            $bloc_field = $bloc_fields->where('type', $field->name)->first();
            $contenu = $bloc_field->contenu;
          @endphp
          @if($field->type == 'date')
            @php
              if(!preg_match('/^\d{4}-\d{2}-\d{2}$/', $contenu)) $contenu = "2004-08-15";
            @endphp
            <td>
              <div class="input-group editdate" id="datetimepicker{{ $i.$y }}" data-target-input="nearest" data-bloc_id="{!! $bloc_field->id !!}">
                <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker{{ $i.$y }}" value="{!! date_format(date_create($contenu), 'd/m/Y') !!}" data-toggle="datetimepicker"/>
              </div>
            </td>
          @elseif($field->type == 'time')
            @php
              if(!preg_match('/^\d{2}:\d{2}:\d{2}$/', $contenu)) $contenu = "12:00:00";
            @endphp
            <td>
              <div class="input-group editheure" id="datetimepicker{{ $i.$y }}" data-target-input="nearest" data-bloc_id="{!! $bloc_field->id !!}">
                <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker{{ $i.$y }}" value="{!! date_format(date_create($contenu), 'H:i') !!}" data-toggle="datetimepicker"/>
              </div>
            </td>
          @elseif($field->type == 'nb')
            @php
              if(!preg_match('/^\d+$/', $contenu)) $contenu = 0;
            @endphp
            <td>
              <span class="editnumber" data-bloc_id="{!! $bloc_field->id !!}">{!! $contenu !!}</span>
            </td>
          @elseif(preg_match('/titre/i', $field->name))
            <td>
              <div class="edititre" data-bloc_id="{!! $bloc_field->id !!}">{!! $contenu !!}</div>
            </td>
          @else
            <td>
              <div class="editable" data-bloc_id="{!! $bloc_field->id !!}">{!! $contenu !!}</div>
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
