<!DOCTYPE html>
<html>
  <body>

    <form id="gallery_form">
      <input type="hidden" name="_token" value="{{ csrf_token() }}" />
      <div class="form-row">
        <div class="form-group col-3">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="round_border" value="0" checked>
            <label class="form-check-label" for="exampleRadios1">
              Carrés
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="round_border" value="1">
            <label class="form-check-label" for="exampleRadios1">
              Ronds
            </label>
          </div>
          <button type="button" class="btn btn-primary btn-sm" id="insert-gallery">Insérer <i class="fas fa-cog fa-spin fa-lg"></i></button>
        </div>
        <div class="form-group col-9">
          <select multiple class="form-control" name="gallery">
            @foreach($galleries as $key => $value)
              <option class="select-gallery" value="{{ $value }}">{{ $key }}</option>
            @endforeach
          </select>
        </div>
      </div>
    </form>
      
  </body>
</html>
