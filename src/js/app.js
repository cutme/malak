/*jshint expr:true */

function exist(o) {
	return ($(o).length > 0) ? true : false;
}

function goToTarget(target) {
	var v = $('html, body'), o = $(target).offset().top;
	v.animate({
		scrollTop: o
	}, {
		duration: 1000,
		easing: 'easeOutCubic'
	});
}

jQuery(function($) {

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
					Overlay.destroy();
					goToTarget('#badges');
				} else {
					$('body').removeClass('anim');
				}
				
				checkBox = $(this);
				$(".c-categories :input[value='"+v+"']").prop('checked', checkBox.prop("checked")).parents('li').toggleClass('is-active');
			});
		}
	};

	var L = {
		init: function() {
			$(document).on('click', '.js-goto', function(e) {
				e.preventDefault();
				var target = $(this).attr('href');				
				goToTarget(target);
			});

		}
	};

	var Nav = {
		init: function() {
		
			var container = $('.c-nav'),
				content = $('.c-content'),
				item_nav = $('.js-nav__link', container),
				item_content = $('.c-content__item');
			
			item_nav.on('click', function(e) {
				e.preventDefault();
				item_content.removeClass('is-visible');
				item_nav.removeClass('is-active');
				$(this).addClass('is-active');
				$($(this).attr('href')).addClass('is-visible');
			});
		}
	};
	
	var Overlay = {
		destroy: function() {
			$('.c-overlay').removeClass('is-visible');			
		},
		
		enable: function() {
			$('.c-overlay').addClass('is-visible');
		},

		init: function() {
			$('.js-menu').on('click', Overlay.enable);
			$('.js-exit').on('click', Overlay.destroy);	
			
			$(document).keyup(function(e) {
				if (e.keyCode == 27) { 
					Overlay.destroy();
				}
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
				player = $f(iframe),
				playButton = document.getElementById('play-button'),
				prevButton = document.getElementById('prev-button'),
				soundButton = document.getElementById("play-sound");

			function nextVideo() {
				currentVideo ++;
				Thumbs.replaceVideo(gridItem.eq(currentVideo));	
				
				if (currentVideo > 0) {
					$(prevButton).removeClass('is-hidden');
				}
				
				if (currentVideo == grid.length) {
					$(nextButton).addClass('is-hidden');
				}
			}

			function playVideo() {
				$(this).toggleClass('icon-play').toggleClass('icon-pause');
				$(this).hasClass('icon-pause') ? player.api("play") : player.api("pause");
			}
			
			function prevVideo() {
				currentVideo --;
				Thumbs.replaceVideo(gridItem.eq(currentVideo));	
				
				if (currentVideo === 0) {
					$(prevButton).addClass('is-hidden');
				}
				
				$(nextButton).removeClass('is-hidden');
			}
			
			function sound() {
				$(this).toggleClass('no-sound');
				$(this).hasClass('no-sound') ? player.api('setVolume', 0) : player.api('setVolume', 1);
			}

			$(nextButton).on('click', nextVideo);
			$(playButton).on('click', playVideo);
			$(prevButton).on('click', prevVideo);
			$(soundButton).on('click', sound);
			
			iframe.addEventListener('load', function(e) {
				$(iframe).fadeIn(1000);
				$(o).addClass('is-ready');
			});
		},

		init: function(o) {
			$(o).vimelar({ videoId: '150163374' });			
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
				player = $('#vimelar-player');
				
			function loadVideo() {
				player.fadeOut(500, function() { $(this).attr('src', src); });
				$('#vid').removeClass('is-ready');	
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
		L.init();
		Nav.init();
		Categories.init();
		Overlay.init();
		Thumbs.init();
		Player.init('#vid');			
	});
});