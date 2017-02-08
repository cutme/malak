(function(window, document, $, malak, undefined) {
	'use strict';
	
	var Player = malak.Player = function () {
		malak.currentVideo = 0;
	}
	
	Player.prototype.init = function() {
		this.enable();
		this.nav();
	};
	
	Player.prototype.nav = function(firstVid) {

		var grid = document.getElementById('grid'),
			gridItem = $('.c-thumbs__item', grid),
			fullButton = document.getElementById('fullscreen-button'),
			nextButton = document.getElementById('next-button'),
			prevButton = document.getElementById('prev-button'),
			playerTouch = document.getElementById('playerTouch');

		fullButton.addEventListener('click', function() {
			if (BigScreen.enabled) {
				BigScreen.toggle();
			}
		}, false);		

		nextButton.addEventListener('click', function() {
			malak.currentVideo ++;
			malak.thumbs.showVideo(gridItem.eq(malak.currentVideo));				
			
			if (malak.currentVideo > 0) {
				$(prevButton).removeClass('is-hidden');
			}
			
			if (malak.currentVideo == grid.length) {
				$(this).addClass('is-hidden');
			}
			
			$('i', playerTouch).removeClass('is-visible');
		}, false);		

		prevButton.addEventListener('click', function() {
			malak.currentVideo --;
			malak.thumbs.showVideo(gridItem.eq(malak.currentVideo));	
			
			if (malak.currentVideo === 0) {
				$(prevButton).addClass('is-hidden');
			}

			$(nextButton).removeClass('is-hidden');
			
			$('i', playerTouch).removeClass('is-visible');
		}, false);

	};

	Player.prototype.enable = function() {
		var firstThumbVideo = $('.c-thumbs__item').eq(0);			
		
		malak.thumbs.showVideo(firstThumbVideo, true);
		
		$('.c-player').addClass('is-loading');
	};

	malak.player = new Player();
	

}(window, document, jQuery, window.malak = window.malak || {}));


