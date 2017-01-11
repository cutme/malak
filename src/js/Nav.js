(function(window, document, $, malak, undefined) {
	'use strict';
	
	var Nav = malak.Nav = function () { };
	
	Nav.prototype.init = function() {
		this.enable();
		this.dropdownCategories();
	};

	Nav.prototype.enable = function() {
		var container = document.getElementById('nav'),
			content = document.getElementById('nav-content'),
			item_nav = $('.c-nav__item', container),
			item_content = $('.c-content__item', content);

		container.addEventListener("click", function(e) {
			e.preventDefault();
			var $$ = $(e.target).parent(), index = $$.index();

			item_content.
				removeClass('is-visible').
				eq(index).addClass('is-visible');
				
			item_nav.removeClass('is-active');
			$$.addClass('is-active');				
		});
	};
	
	Nav.prototype.dropdownCategories = function() {
		var button = document.getElementById('dropdownTrigger'),
			categories = document.getElementById('mainCategories');
			
		button.addEventListener('click', function() {
			$(categories).toggleClass('is-opened');				
			malak.thumbs.reset();
		});
	};
	
	malak.nav = new Nav();

}(window, document, jQuery, window.malak = window.malak || {}));


