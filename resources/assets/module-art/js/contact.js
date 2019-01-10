$(function()
{
  var form = $('#form-contact');

  $(form).submit(function(event) {
    event.preventDefault();

    $('.fa-cog').css('display', 'inline-block');

    var formData = $(form).serialize();

    console.log(formData);

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
      //var errors = data.responseJSON.message + '\n';
      var errors = '';
      $.each(data.responseJSON.errors, function (key, value) {
        errors += value + '\n';
      });
      alert(errors);
      //history.back();
    });

  });
});
