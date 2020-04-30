$(document).ready(function()
{
  var fieldsSection = $('#field-manage-script'),
      fieldLength = parseInt($('#fields-length').text()),
      currentEditedField;

  removeButtonListener();
  upButtonListener();
  downButtonListener();
  hideLimitButtons();
  listenToAddField();

  function listenToAddField(){
    $('#add-field-button').click(function(){
      showLimitButtons();
      fieldLength++;
      var newField = 
          '<section class="form-row justify-content-end">'+
            '<div class="form-group col-11 col-md-5">'+
              '<input type="text" name="champs-'+fieldLength+'" class="form-control new" />'+
              '<small class="invalid-feedback"></small>'+
            '</div>'+
            '<div class="form-group offset-1 col-11 offset-md-0 col-md-6">'+
              '<div class="form-check">'+
                '<input class="form-check-input" type="radio" name="type-'+fieldLength+'" value="text-raw" checked>'+
                '<label class="form-check-label">Texte brut</label>'+
              '</div>'+
              '<div class="form-check">'+
                '<input class="form-check-input" type="radio" name="type-'+fieldLength+'" value="text" checked>'+
                '<label class="form-check-label">Texte</label>'+
              '</div>'+
              '<div class="form-check">'+
                '<input class="form-check-input" type="radio" name="type-'+fieldLength+'" value="date">'+
                '<label class="form-check-label">Date</label>'+
              '</div>'+
              '<div class="form-check">'+
                '<input class="form-check-input" type="radio" name="type-'+fieldLength+'" value="time">'+
                '<label class="form-check-label">Heure</label>'+
              '</div>'+
              '<div class="form-check">'+
                '<input class="form-check-input" type="radio" name="type-'+fieldLength+'" value="nb">'+
                '<label class="form-check-label">Nombre</label>'+
              '</div>'+
              '<div class="form-check">'+
                '<input class="form-check-input" type="radio" name="type-'+fieldLength+'" value="checkbox">'+
                '<label class="form-check-label">Case à cocher</label>'+
              '</div>'+
            '</div>'+
            '<div class="remove-field-button" id=""><i class="fas fa-minus-circle"></i></div>'+
            '<div class="up-button" id=""><i class="fas fa-arrow-circle-up"></i></div>'+
            '<div class="down-button" id=""><i class="fas fa-arrow-circle-down"></i></div>'+
          '</section>';
      fieldsSection.append(newField);
      $('input[name=champs-'+fieldLength+']').focus().blur(function(){
        var inputs = [];
        fieldsSection.children('section').find('.form-control').each(function(){
          inputs.push($(this).val());
        });
        if(duplicate_in_array( inputs )){
          $('input[name=champs-'+fieldLength+']').addClass('is-invalid').next().html('Ce champ existe déjà.');
          $('button[type=submit]').prop('disabled', true);
          $('#add-field-button').off();
        }
      });
      $('input[name=champs-'+fieldLength+']').focus(function(){
        $(this).removeClass('is-invalid');
        $('button[type=submit]').prop('disabled', false);
        listenToAddField();
      });

      removeButtonListener();
      upButtonListener();
      downButtonListener();
      hideLimitButtons();
    });
  }

  $('#the-form').submit(function(event){
    //event.preventDefault();
    var fieldsObject = {fields:[]};

    fieldsSection.children('section').each(function(){
      var $type = $(this).find('input[type=radio]:checked').val(),
          $fieldInput = $(this).find('.form-control').first();
      fieldsObject.fields.push({ 
        name: $fieldInput.val(),
        type: $type,
        isNew: $fieldInput.hasClass('new') ? true : false
      });
    });
    makeJsonString(fieldsObject);
    //$('the-form').submit();
  });

  $('.field-editor').click(function(){
    currentEditedField = $(this).prev();
    $('#modalFieldEditor').modal('show');
    $('input[name=new-field]').val(currentEditedField.val());
    $('input[name=old-field]').val(currentEditedField.val());
    //alert($(this).parents('section').first().find('input[type=radio]:checked').val());
    $('input[name=new-type][value='+$(this).parents('section.form-row').find('input[type=radio]:checked').val()+']').prop('checked', true);
    $('input[name=old-type]').val($(this).parents('section.form-row').find('input[type=radio]:checked').val());
  });

  $("#field-update").click(function(){
    var newField = $('input[name=new-field]').val(),
        oldField = $('input[name=old-field]').val(),
        newType = $('input[name=new-type]:checked').val(),
        oldType = $('input[name=old-type]').val(),
        buttonSave = $(this);
    //alert(oldType + '  ' + newType);
    if(newField != oldField || newType != oldType){
      buttonSave.css('cursor', 'wait');
      $.ajax({
        method: 'put',
        url: '/coulisses/type-field/'+$('input[name=type_id]').val(),
        data: {
          _token: $('[name="csrf-token"]').attr('content'),
          newField: newField,
          oldField: oldField,
          newType: newType,
          oldType:oldType
        },
        dataType: "json"
      })
      .done(function(data) {
        buttonSave.css('cursor', 'default');
        //console.log(data);
        if ('error' in data){
          $('input[name=new-field]').addClass('is-invalid').next().html(data['error']);
        }else{
          /*$.each(data, function (key, value) {
            console.log(key+' - '+value);
          });*/
          $('input[name=new-field]').removeClass('is-invalid');
          currentEditedField.val(newField);
          currentEditedField.parents('section').first().find('input[type=radio][value='+newType+']').prop('checked', true);
          $('#modalFieldEditor').modal('hide');
        }
      })
      .fail(function(data) {
        buttonSave.css('cursor', 'default');
        //console.log(data);
        /*var errors = '';
        $.each(data.responseJSON['errors'], function (key, value) {
          errors += value+"\n";
          var input = 'input[name=' + key + ']';
          $(input).addClass('is-invalid');
          $(input).next().html(value);
        });*/
      });
    }else{
      $('#modalFieldEditor').modal('hide');
    }
  });

  function removeButtonListener(){
    $('.remove-field-button').click(function(){
      showLimitButtons();
      $(this).parent().remove();
      hideLimitButtons();
    });
  }

  function upButtonListener(){
    $('.up-button').click(function(){
      showLimitButtons();
      var sectionToMove = $(this).parent();
      sectionToMove.prev().before(sectionToMove);
      hideLimitButtons();
    });
  }

  function downButtonListener(){
    $('.down-button').click(function(){
      showLimitButtons();
      var sectionToMove = $(this).parent();
      sectionToMove.next().after(sectionToMove);
      hideLimitButtons();
    });
  }

  function makeJsonString(jsonFields){
    $('input[name=champs]').val(JSON.stringify(jsonFields));
  }
  
  function hideLimitButtons(){
    var currentFields = $('#field-manage-script').children('section'),
        currentFieldsLength = currentFields.length-1;
    if(currentFieldsLength){ 
      $('.remove-field-button').removeClass('d-none');
    }else{
      $('.remove-field-button').addClass('d-none');
    }
    currentFields.first().children('.up-button').first().addClass('d-none');
    currentFields.last().children('.down-button').first().addClass('d-none');
  }

  function showLimitButtons(){
    $('.up-button').removeClass('d-none');
    $('.down-button').removeClass('d-none');
  }

  function duplicate_in_array(arr) {
    var object = {};

    arr.forEach(function (item) {
      //if(!object[item]) object[item] = 0;
      //object[item] += 1;
      object[item] = object[item] ? object[item] += 1 : 1;
    });

    for (var prop in object) {
       if(object[prop] >= 2) {
         return true
       }
    }
    return false;
  }

});
