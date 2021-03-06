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
      alert(data['response']);
      form[0].reset();
    })
    .fail(function(data) {
      $('.fa-cog').css('display', 'none');
      //console.log(data);
      var errors = '';
      $.each(data.responseJSON.errors, function (key, value) {
        errors += value + '\n';
      });
      errors += data.responseJSON.message;
      alert(errors);
      //history.back();
    });
  });
});
