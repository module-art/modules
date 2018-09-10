$(function()
{
  var form = $('#form-contact');

  $(form).submit(function(event) {
    event.preventDefault();

    $('.fa-cog').css('display', 'inline-block');

    var formData = $(form).serialize();

    $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData,
        dataType: 'json'
    })
    .done(function(data) {
      $('.fa-cog').css('display', 'none');
      alert(data['response']);
      form[0].reset();
      $('.redactor-in').html('');
    })
    .fail(function(data) {
      $('.fa-cog').css('display', 'none');
      //console.log(data);
      var errors = data.responseJSON.message + '\n';
      $.each(data.responseJSON.errors, function (key, value) {
        errors += value + '\n';
      });
      alert(errors);
      //history.back();
    });

  });
});
