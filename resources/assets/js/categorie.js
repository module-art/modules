$(document).ready(function()
{
  var edit = false;

  $("#ajout-categorie").click(function(){
    var idType = parseInt( $('[name="type_id"]').val() ),
        url = edit ? '/coulisses/categorie/'+edit : '/coulisses/categorie';

    $.ajax({
      method: 'post',
      url: url,
      data: {
        _token: $('[name="csrf-token"]').attr('content'),
        name: $('[name="name"]').val(),
        type_id: idType,
      },
      dataType: "json"
    })
    .done(function(data) {
      $.each(data, function (key, value) {
        console.log(key+' - '+value);
      });
      $('#categories-container').load('/coulisses/categorie?type_id='+idType, function(){
        listenToEdit();
        listenToRemove();
      });
      $('#modalCategorie').modal('hide');
      edit = false;
      $('#title-ajout').html('Ajouter une catégorie');
    })
    .fail(function(data) {
      console.log(data);
      var errors = '';
      $.each(data.responseJSON['errors'], function (key, value) {
        console.log(key+' : '+value);
        errors += value+"\n";
        var input = 'input[name=' + key + ']';
        $(input).addClass('is-invalid');
      });
      alert(errors);
    });
  });

  $(".close").click(function(){
    edit = false;
    $('#title-ajout').html('Ajouter une catégorie');
  });

  function listenToRemove(){
    $(".categoriex").click(function(){
      if(confirm('Étes-vous sûr?')){
        var elem = $(this);
          categorie_id = $(this).attr('data-id');
        $.ajax({
          method: 'delete',
          url: '/coulisses/categorie/'+categorie_id,
          data: {
            _token: $('[name="csrf-token"]').attr('content'),
          },
        })
        .done(function(data) {
          console.log(data);
          elem.parents('tr').first().remove();
        })
        .fail(function(data) {
          console.log(data);
          alert('Connexion impossible pour supprimer la séance.');
        });
      }
    });
  }
  listenToRemove();

  function listenToEdit(){
    $(".categorieo").click(function(){
      var elem = $(this);
        categorie_id = $(this).attr('data-id');
      $.ajax({
        method: 'get',
        url: '/coulisses/categorie/'+categorie_id,
        //data: {
          //_token: $('[name="csrf-token"]').attr('content'),
        //},
      })
      .done(function(data) {
        $('#modalCategorie').modal('show');
        $('[name="name"]').val(data['name']);
        edit = categorie_id;
        $('#title-ajout').html('Modifier une catégorie');
      })
      .fail(function(data) {
        console.log(data);
        alert('Connexion impossible pour éditer la séance.');
      });
    });
  }
  listenToEdit();

});
