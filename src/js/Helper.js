(function(window, document, $, malak, undefined) {
	'use strict';

	var Helper = function() {
        return {
        	animOnScroll: animOnScroll,
            exist: exist,
            goToTarget: goToTarget,
            isMobile: isMobile,
            isWindowSmallerThan: isWindowSmallerThan
        };
    };
    
    function animOnScroll() {
   		new AnimOnScroll( document.getElementById( 'grid' ), {
			minDuration : 0.4,
			maxDuration : 0.7,
			viewportFactor : 0.2
		} );
    }

    function exist(o) {
		return ($(o).length > 0) ? true : false;
	}
	
	function goToTarget(target) {
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, {
			duration: 1000,
			easing: 'easeOutCubic'
		});
	}
	
	function isMobile() {
		return malak.helper.isWindowSmallerThan(641);
	}
	
	function isWindowSmallerThan(resBorder) {
        return window.innerWidth < parseInt(resBorder, 10);
    }
	
	malak.helper = new Helper();

}(window, document, jQuery, window.malak = window.malak || {}));