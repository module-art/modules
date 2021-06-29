$(document).ready(function()
{
  var csrfToken = $('meta[name="csrf-token"]').attr('content'),//get csrf-field in head
      failMessage = 'Oups! une erreur a empêché la modification.';

  $('td[data-toggle="publication"]').click(function(){
    var idPage = $(this).attr('data-page_id'),
        nodeStatus = $(this).children().first();
    document.body.style.cursor = 'wait';
    togglePublished(nodeStatus, 'publicationpage', idPage);
  });

  $('td[data-toggle="content-publication"]').click(function(){
    var idContent = $(this).attr('data-content_id'),
        nodeStatus = $(this).children().first();
    document.body.style.cursor = 'wait';
    togglePublished(nodeStatus, 'publicationcontent', idContent);
  });

  $('td[data-toggle="content-archivage"]').click(function(){
    var idContent = $(this).attr('data-content_id'),
        nodeStatus = $(this).children().first();
    document.body.style.cursor = 'wait';
    togglePublished(nodeStatus, 'archivecontent', idContent);
  });

  function togglePublished(nodeStatus, routeUrl, idContent){
    $.ajax({
        method: 'post',
        url: '/coulisses/'+routeUrl+'/'+idContent,
        data: { _token: csrfToken},//token!!!
    })
    .done(function(data) {
      document.body.style.cursor = 'default';
      console.log(data);
      if(nodeStatus.is('.published')){
        nodeStatus.removeClass('published').addClass('unpublished').html('<i class="far fa-times-circle"></i>');
      }else{
        nodeStatus.removeClass('unpublished').addClass('published').html('<i class="far fa-check-circle"></i>');
      }
    })
    .fail(function() {
      document.body.style.cursor = 'default';
      alert(failMessage);
    });
  }

  //sort and reorder when type ordered by place
  var fromNumber = 0,
      toNumber = 0,
      newVal = 0;
      
  $("#sortable").sortable({
    axis: "y",
    start: function(event, ui){
      fromNumber = ui.item.children('.place-indicator').text();
    },
    update: function( event, ui ) {
      toNumber = ui.item.prev().children('.place-indicator').text();
      newVal = parseInt( toNumber )+1;
      if(isNaN(newVal)) newVal = 0;
      alert("l'élément de position " + fromNumber + " va devenir " + newVal);
    }
  });

});
