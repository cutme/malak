/*jshint expr:true */

(function(window, document, $, malak, undefined) {
	'use strict';

	var overlay = new malak.Overlay(),
		nav = new malak.Nav(),
		thumbs = new malak.Thumbs();
	
		overlay.init();
		nav.init();
		thumbs.init();

	var Categories = {
		init: function() {
			var container = $('.c-categories'),
				item = $('.js-category'), v, checkBox;

			container.on('click', '.js-category', function() {		
				v = $(this).val();

				if ($(this).hasClass('js-category--all')) {
					container.find('.js-category').prop('checked', false).parents('li').removeClass('is-active');
					
				} else {
					container.find('.js-category--all').prop('checked', false).parents('li').removeClass('is-active');	
				}
							
				if ( $('.c-overlay.is-visible').length>0 ) {
					overlay.destroy();
					malak.helper.goToTarget('#badges');
					malak.contactForm.destroy();
				} else {
					$('body').removeClass("anim");
				}
				
				checkBox = $(this);
				$(".c-categories :input[value='"+v+"']").prop('checked', checkBox.prop("checked")).parents('li').toggleClass('is-active');
			});
		}
	};

	var Player = {
		
		buttons: function(o) {

			// $f == Froogaloop
			var currentVideo = 0,
				grid = document.getElementById('grid'),
				gridItem = $('.c-thumbs__item', grid),
				iframe = document.getElementById('vimelar-player'),
				nextButton = document.getElementById('next-button'),
				playButton = document.getElementById('play-button'),
				prevButton = document.getElementById('prev-button'),
				player = $f(iframe);
				
			document.getElementById('fullscreen-button').addEventListener('click', function() {
				if (BigScreen.enabled) {
					BigScreen.toggle();
				}
			}, false);
			
			nextButton.addEventListener('click', function() {
				currentVideo ++;
				Thumbs.showVideo(gridItem.eq(currentVideo));	
				
				if (currentVideo > 0) {
					$(prevButton).removeClass('is-hidden');
				}
				
				if (currentVideo == grid.length) {
					$(this).addClass('is-hidden');
				}
			}, false);
					
			playButton.addEventListener('click', function() {
				$(this).toggleClass('icon-play icon-pause');
				$(this).hasClass('icon-pause') ? player.api("play") : player.api("pause");
			}, false);
			
			prevButton.addEventListener('click', function() {
				currentVideo --;
				Thumbs.showVideo(gridItem.eq(currentVideo));	
				
				if (currentVideo === 0) {
					$(prevButton).addClass('is-hidden');
				}

				$(nextButton).removeClass('is-hidden');
			}, false);
			
			document.getElementById('play-sound').addEventListener('click', function() {
				$(this).toggleClass('no-sound');
				$(this).hasClass('no-sound') ? player.api('setVolume', 0) : player.api('setVolume', 1);
			}, false);

			iframe.addEventListener('load', function(e) {
				$(iframe).fadeIn(1000);
				$(o).removeClass('is-loading');
			});			
		},

		init: function(o) {

			var firstThumbVideo = ($('.c-thumbs__item').eq(0).data('src'));			
					
			$(o).vimelar({ videoId: firstThumbVideo });			
			$('.c-player').addClass('is-loading');
			Player.buttons(o);
		}
	};

	$(document).ready(function() {
		Categories.init();

		$(document).on('click', '.js-goto', function(e) {
			e.preventDefault();
			malak.helper.goToTarget($(this).attr('href'));
		});
		
		Player.init('#vid');
	});

		
}(window, document, jQuery, window.malak = window.malak || {}));

