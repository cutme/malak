(function(window, document, $, malak, undefined) {
	'use strict';

	var Helper = function() {
        return {
            exist: exist,
            goToTarget: goToTarget,
            isInView: isInView,
            isMobile: isMobile,
            isWindowSmallerThan: isWindowSmallerThan
        };
    };

    function exist(o) {
		return ($(o).length > 0) ? true : false;
	}
	
	function goToTarget(target, offset) {
		offset = offset || 0;
		
		$('html, body').animate({
			scrollTop: $(target).offset().top + offset
		}, {
			duration: 1000,
			easing: 'easeOutCubic'
		});
	}
	
	function isInView() {
	
		// Detect request animation frame
		var lastPosition = -1,
			scroll = window.requestAnimationFrame ||
		             window.webkitRequestAnimationFrame ||
		             window.mozRequestAnimationFrame ||
		             window.msRequestAnimationFrame ||
		             window.oRequestAnimationFrame ||
		             // IE Fallback, you can even fallback to onscroll
		             function(callback){ window.setTimeout(callback, 1000/60); };
		
		function loop() {
		
		    var top = window.pageYOffset,
		    	bottomOfWindow = $(window).scrollTop() + window.innerHeight,
		    	windowWidth = window.innerWidth;
		    
		    // Avoid calculations if not needed
		    if (lastPosition == window.pageYOffset) {
		        scroll(loop);
		        return false;
		    } else lastPosition = window.pageYOffset;
			
			$('.animate').each(function() {
				
				if ( $(this).offset().top < bottomOfWindow ) {
					var $$ = $(this);
					
					if (windowWidth > 640) {
						var rand = Math.round(Math.random() * (500)) + 500;
						
						setTimeout(function() {
							$$.addClass('is-visible');
						}, rand);
					} else {
						$$.addClass('is-visible');
					}
				}
			});
			
			if ($('.animate').length != $('.animate.is-visible').length) {
				setTimeout(function() {
					scroll( loop );
				}, 500);
			}
		}
		
		// Call the loop for the first time
		loop();
	}
	
	function isMobile() {
		return malak.helper.isWindowSmallerThan(641);
	}
	
	function isWindowSmallerThan(resBorder) {
        return window.innerWidth < parseInt(resBorder, 10);
    }
	
	malak.helper = new Helper();

}(window, document, jQuery, window.malak = window.malak || {}));