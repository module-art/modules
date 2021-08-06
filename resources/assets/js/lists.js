$(document).ready(function()
{
  var csrfToken = $('meta[name="csrf-token"]').attr('content'),//get csrf-field in head
      failMessage = 'Oups! une erreur a empêché la modification.';

  if($('#typeList').length == 1){
    var refId = $('#typeList').attr('data-typeid'),
        sortUrl = '/coulisses/sorttyperubriques/',
        typeIndex = 1;
  }else{
    var refId = $('#pageList').attr('data-pageid'),
        sortUrl = '/coulisses/sortpagerubriques/',
        typeIndex = 0;
  }


  $('td[data-toggle="publication"]').click(function(){
  var idPage = $(this).attr('data-page_id'),
    nodeStatus = $(this).children().first();
  document.body.style.cursor = 'wait';
  togglePublished(nodeStatus, 'publicationpage', idPage);
  });

  $('td[data-toggle="rubrique-publication"]').click(function(){
  var idRubrique = $(this).attr('data-rubrique_id'),
    nodeStatus = $(this).children().first();
  document.body.style.cursor = 'wait';
  togglePublished(nodeStatus, 'publicationrubrique', idRubrique);
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
      newVal = 0,
      endItem = {};
      
  $("#sortable").sortable({
    axis: "y",
    start: function(event, ui){
      fromNumber = ui.item.children('.place-indicator').attr('data-place');
    },
    update: function( event, ui ) {
      document.body.style.cursor = 'wait';
      endItem = ui.item;
      toNumber = ui.item.prev().children('.place-indicator').attr('data-place');
      newVal = parseInt( toNumber )+1;
      if(isNaN(newVal)) newVal = 0;
      //alert("l'élément de position " + fromNumber + " va devenir " + newVal);
      $.ajax({
          method: 'post',
          url: sortUrl+refId,
          data: {
            _token: csrfToken,
            numFrom: fromNumber,
            numTo: newVal
          },
      })
      .done(function(data) {
        document.body.style.cursor = 'default';
        console.log(data);
        reOrderNumbers(fromNumber, newVal, endItem);
        //document.location.reload(true);
      })
      .fail(function() {
        document.body.style.cursor = 'default';
        alert(failMessage);
      });
    }
  });

  function reOrderNumbers(numFrom, numTo, endItem){
    let y = 0;
    if(numTo < numFrom){
      endItem.children('.place-indicator').attr('data-place', numTo).text(numTo);
      var item = endItem;
      for(let i = numTo+1; i <= numFrom; i++){
        y++;
        (function(index) {
          setTimeout(function(){
            item = item.next();
            item.children('.place-indicator').attr('data-place', i).text(i);
          }, y * 400);
        })(y);
      }
    }else{
      endItem.children('.place-indicator').attr('data-place', numTo-1).text(numTo-1);
      var item = endItem;
      for(let i = numTo-2; i >= numFrom; i--){
        y++;
        (function(index) {
          setTimeout(function(){
            item = item.prev();
            item.children('.place-indicator').attr('data-place', i).text(i);
          }, y * 400);
        })(y);
      }
    }
  }

  //rubrique destroy
  $(".btn-destroy-rubrique").click(function(){
    var idRubrique = $(this).attr('data-rubrique_id');
    if(confirm('Êtes vous sûr?')){
      if(confirm('Tous les blocs associés à cette rubrique seront effacés. Êtes vous vraiment sûr?')){

        $.ajax({
            method: 'post',
            url: '/coulisses/destroyrubrique/'+ idRubrique,
            data: { _token: csrfToken},//token!!!
          })
          .done(function(data) {
            console.log(data);
            document.location.reload(true);
          })
          .fail(function() {
            alert('Oups! une erreur a empêché la suppression.');
          });
      }
    }
  });

  function listenToEditClass(){
    $('.editclass').click(function(){
    $('.editclass').off();
      var target = $(this),
          rubriqueId = target.attr('data-rubrique_id'),
          innerText = target.text();
      //alert(innerText);
      target.html('<input type="text" name="class" id="classEdited" value="'+innerText+'">');
      $('#classEdited').keypress(function(event){
        if(event.which == 13){
          document.body.style.cursor = 'wait';
          target.html($(this).val());
          $.ajax({
              method: 'post',
              url: '/coulisses/updaterubriqueclass/'+rubriqueId,
              data: {
                rubriqueClass : $(this).val(),
                _token: csrfToken
              },
          })
          .done(function(data) {
            document.body.style.cursor = 'default';
            console.log(data);
          })
          .fail(function() {
            document.body.style.cursor = 'default';
            alert(failMessage);
          });
          listenToEditClass();
        }
      });
    });
  }
  listenToEditClass();

});
