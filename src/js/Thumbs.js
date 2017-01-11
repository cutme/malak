(function(window, document, $, malak, undefined) {
	'use strict';
	
	var Thumbs = malak.Thumbs = function () { };
	
	Thumbs.prototype.init = function() {
		this.enable();
		this.events();
	};
	
	Thumbs.prototype.events = function() {
		$('.c-thumbs__item').on('click', '.js-play', function(e) {
			e.preventDefault();
			malak.thumbs.showVideo($(this).parents('.c-thumbs__item'));
		});
		
		window.addEventListener('resize', function(e) {
			if (malak.helper.isWindowSmallerThan(641) === false) {
				malak.thumbs.reset();
			}
		});
	};

	Thumbs.prototype.enable = function() {
		var thumbLoaded = 0;
		
		function showThumbs() {
			var button = document.getElementById('showThumbs');
			
			button.addEventListener('click', function(e) {
				e.preventDefault();
				$('body').removeClass('no-scroll');
				malak.helper.goToTarget($(this).attr('href'), 100);
			});
		}
		
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
			/*
videoThumb.bind('load', function(e) {
				thumbLoaded ++;
				
				if (thumbLoaded == $('.c-thumbs__item').length) {
					
					// if thumbnails loaded, show arrow and lets scroll the page
					$('body').removeClass('no-scroll');
					$('.c-badges .icon-arrow_down').removeClass('is-hidden').css('opacity', 0).animate({ opacity: 1 });			
				}					
			});
*/
		});
		
		showThumbs();
		
	};
	
	Thumbs.prototype.reset = function() {
		var thumbVideo = document.getElementById('thumbVideo');

		if (thumbVideo) {
			$(thumbVideo).remove();
			$('.c-thumbs__item.is-active .c-thumb').show();
			$('.c-thumbs__item.is-active').removeClass('is-active');
		}
	};
	
	Thumbs.prototype.showVideo = function(o) {
		var $$ = o,
			body = document.getElementsByTagName('body'),
			vId = $$.data('src');
			
		
		function loadMobileVideo() {
			var grid = document.getElementById('grid'),
				$thumb = $('.c-thumb', o),
				thumbVideo = document.getElementById('thumbVideo');	
						
			malak.thumbs.reset();			
			
			$(o).addClass('is-active');
		
			$('<iframe />', {
				name: 'myFrame',
				id: 'thumbVideo',
				src: '//player.vimeo.com/video/' + vId + '?autoplay=1&portrait=0&badge=0&byline=0&title=0&hd_off=1&api=1',
				frameborder: 0,
				height: 360,
				webkitallowfullscreen: 1,
				mozallowfullscreen: 1,
				allowfullscreen: 1
			}).prependTo(o);
			
			var iframe = document.getElementById('thumbVideo'),
				ww = window.innerWidth,
				wwResize = window.addEventListener('resize', function(e) {
					ww = window.innerWidth;
					$(iframe).css('width', ww);
				});

			$thumb.hide();
			$(iframe).css('width', ww);	
		}

		function loadDesktopVideo() {
		
			$('#vid').addClass('is-loading');
			$('#vimelar-container').remove();
			$('#vid').vimelar({ videoId: vId });
			
			var iframe = document.getElementById('vimelar-player'),
				player = new Vimeo.Player(iframe),
				playButton = document.getElementById('play-button'),
				playerTouch = document.getElementById('playerTouch'),
			PlayStop = function() {
				$(this).toggleClass('icon-play icon-pause');
				$(this).hasClass('icon-pause') ? player.play() : player.pause();
			},
			onEnded = function() {
				console.log('end');
			},
			onPlay = function() {
				$(playButton).removeClass('icon-play').addClass('icon-pause');
				$('i', playerTouch).removeClass('is-visible');
			},
			onPause = function() {
				$(playButton).addClass('icon-play').removeClass('icon-pause');
		        $('i', playerTouch).addClass('is-visible');
			},
			onTouch = function() {
				$('i', this).toggleClass('is-visible');
				$('i', this).hasClass('is-visible') ? player.pause() : player.play();
			};
			
			$('i', playerTouch).removeClass('is-visible');
			
			player.on('play', onPlay);
			player.on('pause', onPause);
			player.on('ended', onEnded);
			
			$(iframe).fadeOut(0);
			
			iframe.addEventListener('load', function(e) {	
				$(iframe).fadeIn(1000);
				$('#vid').removeClass('is-loading');
			});
					
			$(playButton).unbind('click').on('click', PlayStop);
			$(playerTouch).unbind('click').on('click', onTouch);

		}
		
		if (malak.helper.isWindowSmallerThan(641) === false) {		
			if ($(window).scrollTop() !==0 ) {
				$('html, body').animate({
					scrollTop: 0
				}, {
					duration: 1000,
					easing: 'easeOutCubic',
					complete: loadDesktopVideo
				});
			} else {
				loadDesktopVideo();
			}
		} else {
			loadMobileVideo();
		}
	};

	malak.thumbs = new Thumbs();
	

}(window, document, jQuery, window.malak = window.malak || {}));


