(function(window, document, $, malak, undefined) {
	'use strict';
	
	var Overlay = malak.Overlay = function () {
		
	};

	Overlay.prototype.init = function() {
		this.events();
		this.mobile();
	};
	
	

	Overlay.prototype.mobile = function() {
		var addresses = document.getElementById('addresses'), 
			categoriesHome = document.getElementById('categories'),
			contactform = document.getElementById('contact-form'), 
			sidebar = document.getElementById('sidebar'), status = false;
		
		function moveContact() {
			$(addresses).detach();
			$(contactform).before($(addresses));
			status = true;
		}

		window.addEventListener('resize', function(e) {
			if (malak.helper.isWindowSmallerThan(1025) === true) {
				if (status === false) {
					moveContact();
				}
			} else {
				if (status === true) {
					$(addresses).detach();
					$(sidebar).append($(addresses));
					status = false;
				}
			}			
		});
		
		
		
		if (malak.helper.isWindowSmallerThan(1025) === true) {
			moveContact();
		}
	};
	
	Overlay.prototype.events = function() {

		$(document).on('click', '.js-exit', function() {
			Overlay.prototype.destroy();
		});

		$(document).on('click', '.js-menu', function() {
			Overlay.prototype.enable();
		});

		$(document).keyup(function(e) {
			if (e.keyCode == 27) { 
				Overlay.prototype.destroy();
			}
		});
	};
	
	Overlay.prototype.destroy = function() {
		$(document.getElementById('mainCategories')).removeClass('is-opened');
		$(document.getElementById('overlay')).removeClass('is-visible');
		$(document.getElementsByTagName('body')).removeClass('no-scroll');
		$('.o-form__fields').removeClass('is-hidden');
		$('.o-form__thanks').addClass('is-hidden');
		malak.contactForm.destroy();

		var flky = new Flickity( '.js-carousel' );
		flky.destroy();
	};
	
	

	Overlay.prototype.enable = function() {

		var body = document.getElementsByTagName('body'),
			overlay = document.getElementById('overlay'),
			status = false,
			flky;	

		$(body).addClass('no-scroll');
		$(overlay).addClass('is-visible');

		function enableFlickity() {
			flky = new Flickity( '.js-carousel', {
				cellAlign: 'left',
				contain: true,
				freeScroll: true,
				prevNextButtons: false,
				pageDots: false,
				watchCSS: true
			});
		}

		if (malak.helper.isWindowSmallerThan(1025) === true) {
			enableFlickity();
			flky.resize();
		}
		
		malak.contactForm.init();
	};
	
	malak.overlay = new Overlay();

}(window, document, jQuery, window.malak = window.malak || {}));

