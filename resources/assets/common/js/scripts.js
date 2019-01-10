require('./bootstrap');

$(document).ready(function() {
  
  //fancybox
  $('.gallery').each(function(){
    $('.fancy', this).fancybox({
      transitionEffect: "slide",
      closeExisting: true,
      loop: false,
    });
  });

  $('#global-wrapper').fadeIn(500);
  
  //insertion des liste par type
  
  /*var typeContents = $('.type-contents');

  typeContents.each(function(){
    var type = $(this).attr('data-content_type');

    $(this).load('/get-type-contents/'+type+'?orderby=titre&order=asc', function(response, status, xhr){
      if( status == "error" ){
        console.log(xhr.statusText);
      }
    });
  });*/

	/* Bouton retour en haut */
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 1000,
    //grab the "back to top" link
    $back_to_top = $('.cd-top'),
    $rubrique = $('.heading.first').first(),
    $paddingTop = parseInt( $rubrique.css('padding-top') ),
    $paddingBottom = parseInt( $rubrique.css('padding-bottom') );
      
	//Smooth scroll
	$(document).on('click', 'a[href^="#"]', function (event) {
	    event.preventDefault();

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top
	    }, scroll_top_duration);
	});

	//hide or show the "back to top" link
	$(window).scroll(function(){
    //console.log($(this).scrollTop());
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
	  		$back_to_top.addClass('cd-fade-out');
		}else if( $(this).scrollTop() < offset_opacity ){
	  		$back_to_top.removeClass('cd-fade-out');
    }
    /* reduction du header en scrollant
     if($(this).scrollTop() > 10){
      $rubrique.css({
        paddingTop: $paddingTop-200,
        paddingBottom: $paddingBottom-150
      });
    }else if($(this).scrollTop() < 2){
      $rubrique.css({
        paddingTop: $paddingTop,
        paddingBottom: $paddingBottom
      });
    }*/
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
	event.preventDefault();
	$('body,html').animate({
	  scrollTop: 0
	  }, scroll_top_duration
	);
	});

});   
