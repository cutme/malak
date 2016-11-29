(function(window, document, $, malak, undefined) {
	'use strict';
	
	var Overlay = malak.Overlay = function () { };
	
	var flky = new Flickity( '.js-flickity', {
		cellAlign: 'left',
		contain: true,
		freeScroll: true,
		prevNextButtons: false,
		pageDots: false,
		watchCSS: true
	});

	Overlay.prototype.init = function() {
		this.events();
		this.mobile();
	};

	Overlay.prototype.mobile = function() {
		var addresses = document.getElementById('addresses'), 
			categoriesHome = document.getElementById('categories'),
			contactform = document.getElementById('contact-form'), 
			sidebar = document.getElementById('sidebar'), statusContact = false;
		
		function moveContact() {
			$(addresses).detach();
			$(contactform).before($(addresses));
			statusContact = true;
		}

		window.addEventListener('resize', function(e) {
			if (malak.helper.isWindowSmallerThan(1025) === true) {
				if (statusContact === false) {
					moveContact();
				}
			} else {
				if (statusContact === true) {
					$(addresses).detach();
					$(sidebar).append($(addresses));
					statusContact = false;
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
		$(document.getElementById('overlay')).removeClass('is-visible');
		$(document.getElementsByTagName('body')).removeClass('no-scroll');
		malak.contactForm.destroy();
	};
	
	Overlay.prototype.enable = function() {

		var body = document.getElementsByTagName('body'),
			overlay = document.getElementById('overlay');
			
		$(body).addClass('no-scroll');
		$(overlay).addClass('is-visible');
				
		malak.contactForm.enable();		
		
setTimeout(function() {
			$('.js-flickity').show();
			flky.resize();
			
		}, 1000);

		
	};


}(window, document, jQuery, window.malak = window.malak || {}));

