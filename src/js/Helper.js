(function(window, document, $, malak, undefined) {
	'use strict';

	var Helper = function() {
        return {
        	debouncer: debouncer,
            exist: exist,
            goToTarget: goToTarget,
            isWindowSmallerThan: isWindowSmallerThan
        };
    };
    
    function debouncer(func, timeout) {
		var timeoutID;
		timeout = timeout || 200;
		return function() {
			var scope = this,
				args = arguments;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function() {
				func.apply(scope, Array.prototype.slice.call(args));
			}, timeout);
		};
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
	
	function isWindowSmallerThan(resBorder) {
        return window.innerWidth < parseInt(resBorder, 10);
    }
	
	malak.helper = new Helper();

}(window, document, jQuery, window.malak = window.malak || {}));