$(function()
{
  var form = $('#form-contact');
  $('.required').css('display', 'none');

  $(form).submit(function(event) {
    event.preventDefault();

    $('.fa-cog').css('display', 'inline-block');

    var formData = $(form).serialize();

    $.ajax({
        type: 'POST',
        headers: {  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')  },
        url: $(form).attr('action'),
        data: formData,
        dataType: 'json'
    })
    .done(function(data) {
      $('.fa-cog').css('display', 'none');
      form[0].reset();
      if(data['response']){
        console.log(data);
        form.prev().removeClass('d-none alert-danger').addClass('alert-success').html(data['response']);
        form.find('input').removeClass('is-invalid');
      }else{
        console.log(data);
        form.prev().removeClass('d-none alert-success').addClass('alert-danger').html(data['error']);
        form.find('input').addClass('is-invalid');
      }
    })
    .fail(function(data) {
      $('input,textarea').removeClass('is-invalid');
      $('.fa-cog').css('display', 'none');
      console.log(data);
      var errors = '';
      $.each(data.responseJSON.errors, function (key, value) {
        errors += value + '<br>';
        form.find('input[name="'+ key +'"]').addClass('is-invalid').after('<small class="invalid-feedback">'+value+'</small>');
        form.find('textarea[name="'+ key +'"]').addClass('is-invalid').after('<small class="invalid-feedback">'+value+'</small>');
        form.find('select[name="'+ key +'"]').addClass('is-invalid').after('<small class="invalid-feedback">'+value+'</small>');
      });
      errors += data.responseJSON.message;
      form.prev().removeClass('d-none alert-success').addClass('alert-danger').html(errors);
      //history.back();
    });
  });
});
