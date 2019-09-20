$(document).ready(function()
{
  var fieldsSection = $('#field-manage-script'),
      fieldLength = parseInt($('#fields-length').text());

  radioListener();
  removeButtonListener();
  upButtonListener();
  downButtonListener();

  $('#add-field-button').click(function(){
    fieldLength++;
    var newField = 
        '<section class="form-row justify-content-end">'+
          '<div class="form-group col-11 col-md-5">'+
            '<input type="text" name="champs-'+fieldLength+'" class="form-control" />'+
          '</div>'+
          '<div class="form-group offset-1 col-11 offset-md-0 col-md-6">'+
            '<div class="form-check">'+
              '<input class="form-check-input" type="radio" name="radios-'+fieldLength+'" value="text" checked>'+
              '<label class="form-check-label">Texte</label>'+
            '</div>'+
            '<div class="form-check">'+
              '<input class="form-check-input" type="radio" name="radios-'+fieldLength+'" value="date">'+
              '<label class="form-check-label">Date</label>'+
            '</div>'+
            '<div class="form-check">'+
              '<input class="form-check-input" type="radio" name="radios-'+fieldLength+'" value="time">'+
              '<label class="form-check-label">Heure</label>'+
            '</div>'+
            '<div class="form-check">'+
              '<input class="form-check-input" type="radio" name="radios-'+fieldLength+'" value="nb">'+
              '<label class="form-check-label">Nombre</label>'+
              '<input class="unit d-none" type="text"/>'+
            '</div>'+
          '</div>'+
          '<div class="remove-field-button" id=""><i class="fas fa-minus-circle"></i></div>'+
          '<div class="up-button" id=""><i class="fas fa-arrow-circle-up"></i></div>'+
          '<div class="down-button" id=""><i class="fas fa-arrow-circle-down"></i></div>'+
        '</section>';
    fieldsSection.append(newField);
    radioListener();
    removeButtonListener();
    upButtonListener();
    downButtonListener();
  });

  $('#test-field-button').click(function(){
    var fieldsObject = {fields:[]};

    fieldsSection.children('section').each(function(){
      var $type = $(this).find('input[type=radio]:checked').val();
      if($type == 'nb'){
        fieldsObject.fields.push({ 
          name: $(this).find('.form-control').first().val(),
          type: $type,
          unit: $(this).find('.unit').val()
        });
      }else{
        fieldsObject.fields.push({ 
          name: $(this).find('.form-control').first().val(),
          type: $type
        });
      }
    });
    console.log(JSON.stringify(fieldsObject));
    makeCsv(fieldsObject);
  });

  function removeButtonListener(){
    $('.remove-field-button').click(function(){
      $(this).parent().remove();
    });
  }

  function upButtonListener(){
    $('.up-button').click(function(){
      var sectionToMove = $(this).parent();
      sectionToMove.prev().before(sectionToMove);
    });
  }

  function downButtonListener(){
    $('.down-button').click(function(){
      var sectionToMove = $(this).parent();
      sectionToMove.next().after(sectionToMove);
    });
  }

  function radioListener(){
    $('input[type=radio]').change(function() {
      var sameName = $(this).attr('name'),
          nextNbRadio = $('input[value=nb][name='+sameName+']'),
          unitInput = nextNbRadio.nextAll('.unit').first();
      if (this.value != 'nb') {
        nextNbRadio.removeClass('checked');
        unitInput.addClass('d-none');
      }
      else {
        $(this).addClass('checked');
        unitInput.removeClass('d-none');
      }
    });
  }

  function makeCsv(jsonFields){
    var csv = '',
        firstLoop = true;
    jsonFields.fields.forEach(function(field, index){
      console.log(field);
      if(firstLoop){
        firstLoop = false;
        csv += field.name;
      }else{
        csv += ','+field.name;
        if(field.type == 'nb') csv += "(nb)";
        if(field.unit != null && field.unit != '') csv += field.unit;
      }
    });
    $('input[name=champs]').val(csv);
  }

});
