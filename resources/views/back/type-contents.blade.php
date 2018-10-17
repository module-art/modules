<!DOCTYPE html>
<html>
  <body>

    <table class="table">
      <thead>
        <tr>
          <th></th>
          @foreach($champs as $champ)
            <th>{{ $champ }}</th>
          @endforeach
        </tr>
      </thead>
      <tbody>
        @foreach ($results as $i => $result)
          <tr>
            <td class="type-content">
              <button class="btn btn-sm btn-outline-danger btn-destroy" data-rubrique_id="{{ $result->id }}"><i class="fas fa-trash-alt"></i></button>
              <?php //echo $result->contenu; ?>
            </td>
            @foreach ($result->blocs as $y => $bloc)
              @if(preg_match('/date/', $bloc->type))
                <td>
                  <div class="input-group editdate" id="datetimepicker{{ $i.$y }}" data-target-input="nearest" data-bloc_id="{!! $bloc->id !!}">
                    <input type="text" class="form-control" data-target="#datetimepicker{{ $i.$y }}" value="{!! preg_replace('/(19|20)(\d{2})(\d{2})(\d{2})/', '$4/$3/$1$2', $bloc->contenu) !!}"/>
                    <div class="input-group-append" data-target="#datetimepicker{{ $i.$y }}" data-toggle="datetimepicker">
                      <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                  </div>
                </td>
              @elseif(preg_match('/_/', $bloc->type))
                @php
                  $unit = preg_replace('/^.*_/', '', $bloc->type);
                  if( $unit == 'nb' ) $unit = '';
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
    </table>
      
  </body>
</html>
