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
            <td class="type-content">
              <button class="btn btn-sm btn-outline-danger btn-destroy" data-rubrique_id="{{ $result->id }}"><i class="fas fa-trash-alt"></i></button>
              <?php echo $result->contenu; ?>
            </td>
            @foreach ($result->blocs as $bloc)
              <td>
                <div class="editable" data-bloc_id="{!! $bloc->id !!}">{!! $bloc->contenu !!}</div>
              </td>
            @endforeach
          </tr>
        @endforeach
      </tbody>
    </table>
      
  </body>
</html>
