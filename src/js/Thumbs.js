(function(window, document, $, malak, undefined) {
	'use strict';
	
	var Thumbs = malak.Thumbs = function () { };
	
	Thumbs.prototype.init = function() {
		this.enable();
		this.events();
	};
	
	Thumbs.prototype.events = function() {
		$(document).on('click', '.c-thumbs__item', function() {
			malak.thumbs.showVideo(this);
		});
		
		window.addEventListener('resize', function(e) {
			if (malak.helper.isWindowSmallerThan(641) === false) {
				malak.thumbs.reset();
			}
		});
	}

	Thumbs.prototype.enable = function() {
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
	};
	
	Thumbs.prototype.reset = function() {
		var thumbVideo = document.getElementById('thumbVideo');

		if (thumbVideo) {
			$(thumbVideo).remove();
			$('.c-thumbs__item.is-active .c-thumb').show();
			$('.c-thumbs__item.is-active').removeClass('is-active');
			malak.helper.animOnScroll();
		}
	}
	
	Thumbs.prototype.showVideo = function(o) {
		var $$ = $(o),
			body = document.getElementsByTagName('body'),
			vId = $$.data('src'),
			playButton = document.getElementById('play-button');				
		
		function loadThumbVideo() {
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
				player = $f('#thumbVideo'),
				ww = window.innerWidth,
				wwResize = window.addEventListener('resize', function(e) {
					ww = window.innerWidth;
					$(iframe).css('width', ww);
				});
				
			// When the player is ready/loaded, add a finish event listener
			player.addEvent('ready', function() {
				//Adds an event 'finish' that executes a function 'onFinish' when the video has ended.
				alert('f');
				player.addEvent('finish', onFinish);
			});
			
			//Define the onFinish function that will be called
			function onFinish(id) {
				alert('THE VIDEO HAS FINISHED PLAYING');
			}
			
			$thumb.hide();
			$(iframe).css('width', ww);
			
			iframe.addEventListener('load', function(e) {
				malak.helper.animOnScroll();
			});	
		}
		
		function loadBigVideo() {
			var player = $('#vimelar-player'),
				src = '//player.vimeo.com/video/'+vId+'?portrait=0&badge=0&byline=0&title=0&hd_off=1&api=1';
			
			player.fadeOut(500, function() { $(this).attr('src', src); });
			$('.c-player').addClass('is-loading');
			$(playButton).removeClass('icon-pause').addClass('icon-play');
		}
		
		if (malak.helper.isWindowSmallerThan(641) === false) {		
			if ($(window).scrollTop() !==0 ) {
				$('html, body').animate({
					scrollTop: 0
				}, {
					duration: 1000,
					easing: 'easeOutCubic',
					complete: loadBigVideo
				});
			} else {
				malak.thumbs.loadBigVideo();
			}
		} else {
			loadThumbVideo();
		}
	}

	malak.thumbs = new Thumbs();
	

}(window, document, jQuery, window.malak = window.malak || {}));


