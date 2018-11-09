<!DOCTYPE html>
<html>
  <body>

    <table class="table">
      <thead>
        <tr>
          <th></th>
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
        </tr>
      </thead>
      <tbody>
        {{--results are rubriques--}}
        @foreach ($results as $result)
          <tr>
            <td><?php echo $result->contenu; ?></td>
            @foreach ($result->blocs as $bloc)
              @if(preg_match('/date/', $bloc->type))
                <td>
                  {!! preg_replace('/(19|20)(\d{2})(\d{2})(\d{2})/', '$4/$3/$1$2', $bloc->contenu) !!}
                </td>
              @elseif(preg_match('/\(nb\)/', $bloc->type))
                @php
                  $unit = preg_replace('/^.*\(nb\)/', '', $bloc->type);
                @endphp
                <td>
                  {!! $bloc->contenu !!} {!! $unit !!}
                </td>
              @elseif(preg_match('/heure|horaire/', $bloc->type))
                <td>
                  {!! preg_replace('/(\d{2})(\d{2})/', '$1:$2', $bloc->contenu) !!}
                </td>
              @else
                <td>
                  {!! $bloc->contenu !!}
                </td>
              @endif
            @endforeach
          </tr>
        @endforeach
      </tbody>
    </table>
      
  </body>
</html>
