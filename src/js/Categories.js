(function(window, document, $, malak, undefined) {
	'use strict';
	
	var Categories = malak.Categories = function () { };
	
	Categories.prototype.init = function() {
		this.events();
		this.mobileCategories();
	};
	
	Categories.prototype.mobileCategories = function() {
		var status = false,
			flky = new Flickity( '.c-categories--home .js-categoryCarousel', {
				cellAlign: 'left',
				contain: true,
				freeScroll: true,
				prevNextButtons: false,
				pageDots: false,
				watchCSS: true
			});
		
		flky.resize();		
	};
	
	Categories.prototype.events = function() {
	
		var item = '.js-category';

		$(document).on('click', item, function() {		
			var $$ = $(this),
				v = $$.val(), 
				checkedInputs = '';

			if ($$.hasClass('js-category--all')) {
				$(item).prop('checked', false).parents().removeClass('is-active');
				
			} else {
				$('.js-category--all').prop('checked', false).parents().removeClass('is-active');	
			}
			
			// Check if Overlay is open	
			if ( $('.c-overlay.is-visible').length>0 ) {
				$('body').removeClass('no-scroll');
				malak.overlay.destroy();
				malak.helper.goToTarget('#badges');
				malak.contactForm.destroy();
			} 
			
			$(item+'[value="'+v+'"]').
				prop('checked', $$.prop("checked")).
				parent().toggleClass('is-active');
			
			// Get all selected checkboxes
			$('#mainCategories input[type="checkbox"]:checked').each(function() { 
				checkedInputs += $(this).val();
			});
			
			Categories.prototype.filterThumbs(checkedInputs);
		});
	};
	
	Categories.prototype.filterThumbs = function(cat) {
		var thumb = '.c-thumbs__item';

		$(thumb).removeClass('is-visible').hide();
		$(thumb+cat).addClass('is-visible').show();
	};
	
	malak.categories = new Categories();

}(window, document, jQuery, window.malak = window.malak || {}));


