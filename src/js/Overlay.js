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
			contactform = document.getElementById('contact-form'), 
			sidebar = document.getElementById('sidebar'), status = false;

		function init() {
			$(addresses).detach();
			$(contactform).before($(addresses));
			status = true;
		}
		
		$(window).resize(malak.helper.debouncer(function() {
			if (malak.helper.isWindowSmallerThan(1025) === true) {
				if (status === false) {
					init();
				}
			} else {
				if (status === true) {
					$(addresses).detach();
					$(sidebar).append($(addresses));
					status = false;
				}
			}			
		}));
		
		if (malak.helper.isWindowSmallerThan(1025) === true) {
			init();
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
		malak.contactForm.destroy();
	};
	
	Overlay.prototype.enable = function() {

		var body = document.getElementsByTagName('body'),
			overlay = document.getElementById('overlay');
			
		$(body).addClass('no-scroll');
		$(overlay).addClass('is-visible');
				
		malak.contactForm.enable();		
		flky.resize();
	};


}(window, document, jQuery, window.malak = window.malak || {}));

