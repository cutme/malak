/*jshint expr:true */

(function(window, document, $, malak, undefined) {
	'use strict';

	var overlay = new malak.Overlay();		
		overlay.init();

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

	var Nav = {
		init: function() {
		
			var container = document.getElementById('nav'),
				content = document.getElementById('nav-content'),
				item_nav = $('.c-nav__item', container),
				item_content = $('.c-content__item', content);

			container.addEventListener("click", function(e) {
				var $$ = $(e.target).parent(), index = $$.index();

				item_content.
					removeClass('is-visible').
					eq(index).addClass('is-visible');
					
				item_nav.removeClass('is-active');
				$$.addClass('is-active');				
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
				Thumbs.replaceVideo(gridItem.eq(currentVideo));	
				
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
				Thumbs.replaceVideo(gridItem.eq(currentVideo));	
				
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
	
	var Thumbs = {
		createThumbs: function() {

			var thumbLoaded = 0;
			
			$('.c-thumbs__item').each(function() {
				var $$ = $(this),
					vimeoVideoID = $$.data('src'), videoTitle = $('.c-thumb__title', this), videoThumb = $('.o-media', this);

				$.getJSON('//www.vimeo.com/api/v2/video/' + vimeoVideoID + '.json?callback=?', {
					format: "json"
				}, 
				function(data) {
					videoThumb.attr('src', data[0].thumbnail_large);
					videoTitle.text(data[0].title);
				});
				
				// Check if images for grid loaded
				videoThumb.bind('load', function(e) {
					thumbLoaded ++;
					
					if (thumbLoaded == $('.c-thumbs__item').length) {
						
						// if thumbnails loaded, show arrow and lets scroll the page
						$('body').removeClass('no-scroll');
						$('.c-badges .icon-arrow_down').removeClass('is-hidden').css('opacity', 0).animate({ opacity: 1 });
						
						// initialize Masonry
						$('#grid').multipleFilterMasonry({
							itemSelector: '.c-thumbs__item',
							filtersGroupSelector:'.c-categories'
						});
						
						// initialize AnimOnScroll
						new AnimOnScroll( document.getElementById( 'grid' ), {
							minDuration : 0.4,
							maxDuration : 0.7,
							viewportFactor : 0.2
						} );

						// initialize inView
						$('.c-thumbs_item').on('inview');				
					}					
				});
			});
		},
		
		replaceVideo: function(o) {
			var $$ = $(o),
				src = '//player.vimeo.com/video/'+$$.data('src')+'?portrait=0&badge=0&byline=0&title=0&hd_off=1&api=1',
				player = $('#vimelar-player'),
				playButton = document.getElementById('play-button');
				
			function loadVideo() {
				player.fadeOut(500, function() { $(this).attr('src', src); });
				$('.c-player').addClass('is-loading');
				$(playButton).removeClass('icon-pause').addClass('icon-play');
			}		
			
			if ($(window).scrollTop() !==0 ) {
				$('html, body').animate({
					scrollTop: 0
				}, {
					duration: 1000,
					easing: 'easeOutCubic',
					complete: loadVideo
				});
			} else {
				loadVideo();
			}			
		},

		init: function() {
			$(document).on('click', '.c-thumbs__item', function() {
				Thumbs.replaceVideo(this);
			});

			Thumbs.createThumbs();
		}	
	};

	$(document).ready(function() {
		Nav.init();
		Categories.init();
		Thumbs.init();
		Player.init('#vid');
		
		$(document).on('click', '.js-goto', function(e) {
			e.preventDefault();
			malak.helper.goToTarget($(this).attr('href'));
		});
	});




		
}(window, document, jQuery, window.malak = window.malak || {}));

