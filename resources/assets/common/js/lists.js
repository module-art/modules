$(document).ready(function()
{
  var csrfToken = $('meta[name="csrf-token"]').attr('content');//get csrf-field in head

  $('[data-toggle*="publication"]').click(function(){
    var idPage = $(this).attr('data-page_id'),
        nodeStatus = $(this).children().first();

    $.ajax({
        method: 'post',
        url: '/coulisses/publicationpage/'+ idPage,
        data: { _token: csrfToken},//token!!!
    })
    .done(function(data) {
      console.log(data);
      if(nodeStatus.is('.published')){
        nodeStatus.removeClass('published').addClass('unpublished').html('<i class="far fa-times-circle"></i>');
      }else{
        nodeStatus.removeClass('unpublished').addClass('published').html('<i class="far fa-check-circle"></i>');
      }
    })
    .fail(function() {
      alert('Oups! une erreur a empêché la modification.');
    });

  });
});
