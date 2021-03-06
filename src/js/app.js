/*jshint expr:true */

(function(window, document, $, malak, undefined) {
	'use strict';
		
	malak.overlay.init();
	malak.nav.init();
	malak.thumbs.init();
	malak.categories.init();
	malak.player.init();
	

	$(document).ready(function() {
	
		$(this).scrollTop(0);

		$(document).on('click', '.js-goto', function(e) {
			e.preventDefault();
						
			if ($(this).data('offset')) {
				var offset = $(this).data('offset');
				malak.helper.goToTarget($(this).attr('href'), offset);
			} else {
				malak.helper.goToTarget($(this).attr('href'));
			}
			
		});
		
		$(document).on('click', '.js-logo', function(e) {
			e.preventDefault();
			
			var grid = document.getElementById('grid'),
				gridItem = $('.c-thumbs__item', grid);

			malak.thumbs.showVideo(gridItem.eq(0));
			malak.currentVideo = 0;
		});

		
		malak.helper.isInView();
	});

		
}(window, document, jQuery, window.malak = window.malak || {}));

