(function(window, document, $, malak, undefined) {
	'use strict';
	
	var Player = malak.Player = function () { };
	
	Player.prototype.init = function() {
		this.enable();
		this.buttons();
	};

	
	Player.prototype.buttons = function() {

		var currentVideo = 0,
			grid = document.getElementById('grid'),
			gridItem = $('.c-thumbs__item', grid),
			iframe = document.getElementById('vimelar-player'),
			nextButton = document.getElementById('next-button'),
			prevButton = document.getElementById('prev-button'),
			player = new Vimeo.Player(iframe),
			playerTouch = document.getElementById('playerTouch');;

		document.getElementById('fullscreen-button').addEventListener('click', function() {
			if (BigScreen.enabled) {
				BigScreen.toggle();
			}
		}, false);		

		nextButton.addEventListener('click', function() {
			currentVideo ++;
			malak.thumbs.showVideo(gridItem.eq(currentVideo));				
			
			if (currentVideo > 0) {
				$(prevButton).removeClass('is-hidden');
			}
			
			if (currentVideo == grid.length) {
				$(this).addClass('is-hidden');
			}
			
			$('i', playerTouch).removeClass('is-visible');
		}, false);		

		prevButton.addEventListener('click', function() {
			currentVideo --;
			malak.thumbs.showVideo(gridItem.eq(currentVideo));	
			
			if (currentVideo === 0) {
				$(prevButton).addClass('is-hidden');
			}

			$(nextButton).removeClass('is-hidden');
			
			$('i', playerTouch).removeClass('is-visible');
		}, false);
		
		document.getElementById('play-sound').addEventListener('click', function() {
			$(this).toggleClass('no-sound');
			$(this).hasClass('no-sound') ? player.setVolume(0) : player.setVolume(1);
		}, false);

	};

	Player.prototype.enable = function() {
		var firstThumbVideo = ($('.c-thumbs__item').eq(0));			
					
		//$('#vid').vimelar({ videoId: firstThumbVideo });
		
		malak.thumbs.showVideo(firstThumbVideo);
		
		$('.c-player').addClass('is-loading');
	};

	malak.player = new Player();
	

}(window, document, jQuery, window.malak = window.malak || {}));


