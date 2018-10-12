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
              <td>
                <div>{!! $bloc->contenu !!}</div>
              </td>
            @endforeach
          </tr>
        @endforeach
      </tbody>
    </table>
      
  </body>
</html>
