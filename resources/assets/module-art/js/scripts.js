require('./bootstrap');

$(document).ready(function() {

  //$('#global-wrapper').hide().fadeIn(1500);

	/* Bouton retour en haut */
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 1000,
    transitionDuration = 300,
    //grab the "back to top" link
    $smLogo = '50px',
    $logo = $('#logo'),
    $back_to_top = $('.cd-top');

  $('#navbars01').on('show.bs.collapse', function () {
    $logo.css('height', $smLogo);
  })

  $('#navbars01').on('hide.bs.collapse', function () {
    $logo.css('height', '');
  })
      
	//Smooth scroll
	$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    var tar = $($.attr(this, 'href'));
      
    $logo.css({
      height: $smLogo
    });

    setTimeout(function(){

      var topTarget = tar.offset().top;
      //console.log(topTarget);

      $('html, body').animate({
        scrollTop: topTarget
      }, scroll_top_duration);

    }, transitionDuration);

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

    if($(this).scrollTop() > 10){
      $logo.css({
        height: $smLogo
      });
    }else if($(this).scrollTop() < 2){
      $logo.css({
        height: ''
      });
    }
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
