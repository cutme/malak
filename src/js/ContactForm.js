(function(window, document, $, malak, undefined) {
	'use strict';
	
	var ContactForm = malak.ContactForm = function () { };
	
	ContactForm.prototype.init = function() {
		this.enable();
		//this.ajax();
	};
	
	ContactForm.prototype.ajax = function() {
		var $form = $(document.getElementById('contact-form')),
			formAction = $form.attr('action'),
			formType = $form.attr('post'),
			fields = $('.o-form__fields'),
			thanks = $('.o-form__thanks');

		$.ajax({
			cache: false,
			url: formAction,
			type: formType,
			data: $form.serialize(),
			success: function(data, statusText, jqXHR) {
				if (statusText == 'success') {
					thanks.removeClass('is-hidden');
					fields.addClass('is-hidden');
				}
			}, error: function(result) {
				console.log('error: ' + result.status + ' ' + result.statusText);
			}
		});
	};

	ContactForm.prototype.enable = function() {
		var form = document.getElementById('contact-form');
		
		var options = {
			trigger:		'change',
			successClass:	'has-success',
			errorClass:		'has-error',
			classHandler:	function (el) {
				return el.$element.closest('.o-form__row');
			}
		};
		
		$(form).parsley(options);
		form.reset();
		
		window.Parsley.on('form:submit', function() {			
			ContactForm.prototype.ajax();
			return false; 
		});
	};
	
	ContactForm.prototype.destroy = function() {
		$('#contact-form').parsley().destroy();	
	};
	
	malak.contactForm = new ContactForm();
	

}(window, document, jQuery, window.malak = window.malak || {}));


