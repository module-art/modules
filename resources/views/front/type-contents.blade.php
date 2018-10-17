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
        @foreach ($results as $result)
          <tr>
            <td><?php echo $result->contenu; ?></td>
            @foreach ($result->blocs as $bloc)
              @if(preg_match('/date/', $bloc->type))
                <td>
                  <div>{!! preg_replace('/(19|20)(\d{2})(\d{2})(\d{2})/', '$4/$3/$1$2', $bloc->contenu) !!}</div>
                </td>
              @else
                <td>
                  <div>{!! $bloc->contenu !!}</div>
                </td>
              @endif
            @endforeach
          </tr>
        @endforeach
      </tbody>
    </table>
      
  </body>
</html>
