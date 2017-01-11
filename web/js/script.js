!function(e,t,i,n,o){"use strict";var a=n.Categories=function(){};a.prototype.init=function(){this.events(),this.mobileCategories()},a.prototype.mobileCategories=function(){var e=new Flickity(".c-categories--home .js-categoryCarousel",{cellAlign:"left",contain:!0,freeScroll:!0,prevNextButtons:!1,pageDots:!1,watchCSS:!0});e.resize()},a.prototype.events=function(){var e=".js-category";i(t).on("click",e,function(){var t=i(this),o=t.val(),s="";t.hasClass("js-category--all")?i(e).prop("checked",!1).parents().removeClass("is-active"):i(".js-category--all").prop("checked",!1).parents().removeClass("is-active"),i(".c-overlay.is-visible").length>0&&(i("body").removeClass("no-scroll"),n.overlay.destroy(),n.helper.goToTarget("#badges"),n.contactForm.destroy()),i(e+'[value="'+o+'"]').prop("checked",t.prop("checked")).parent().toggleClass("is-active"),i('#mainCategories input[type="checkbox"]:checked').each(function(){s+=i(this).val()}),a.prototype.filterThumbs(s)})},a.prototype.filterThumbs=function(e){var t=".c-thumbs__item";i(t).removeClass("is-visible").hide(),i(t+e).addClass("is-visible").show()},n.categories=new a}(window,document,jQuery,window.malak=window.malak||{}),function(e,t,i,n,o){"use strict";var a=n.ContactForm=function(){};a.prototype.init=function(){this.enable()},a.prototype.ajax=function(){var e=i(t.getElementById("contact-form")),n=e.attr("action"),o=e.attr("post"),a=i(".o-form__fields"),s=i(".o-form__thanks");i.ajax({cache:!1,url:n,type:o,data:e.serialize(),success:function(e,t,i){"success"==t&&(s.removeClass("is-hidden"),a.addClass("is-hidden"))},error:function(e){console.log("error: "+e.status+" "+e.statusText)}})},a.prototype.enable=function(){var n=t.getElementById("contact-form"),o={trigger:"change",successClass:"has-success",errorClass:"has-error",classHandler:function(e){return e.$element.closest(".o-form__row")}};i(n).parsley(o),n.reset(),e.Parsley.on("form:submit",function(){return a.prototype.ajax(),!1})},a.prototype.destroy=function(){i("#contact-form").parsley().destroy()},n.contactForm=new a}(window,document,jQuery,window.malak=window.malak||{}),function(e,t,i,n,o){"use strict";function a(e){return i(e).length>0}function s(e,t){t=t||0,i("html, body").animate({scrollTop:i(e).offset().top+t},{duration:1e3,easing:"easeOutCubic"})}function r(){function t(){var a=(e.pageYOffset,i(e).scrollTop()+e.innerHeight);return n==e.pageYOffset?(o(t),!1):(n=e.pageYOffset,i(".animate").each(function(){if(i(this).offset().top<a){var e=i(this),t=Math.round(500*Math.random())+500;setTimeout(function(){e.addClass("is-visible")},t)}}),void(i(".animate").length!=i(".animate.is-visible").length&&setTimeout(function(){o(t)},500)))}var n=-1,o=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||e.oRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)};t()}function l(){return n.helper.isWindowSmallerThan(641)}function c(t){return e.innerWidth<parseInt(t,10)}var d=function(){return{exist:a,goToTarget:s,isInView:r,isMobile:l,isWindowSmallerThan:c}};n.helper=new d}(window,document,jQuery,window.malak=window.malak||{}),function(e,t,i,n,o){"use strict";var a=n.Nav=function(){};a.prototype.init=function(){this.enable(),this.dropdownCategories()},a.prototype.enable=function(){var e=t.getElementById("nav"),n=t.getElementById("nav-content"),o=i(".c-nav__item",e),a=i(".c-content__item",n);e.addEventListener("click",function(e){e.preventDefault();var t=i(e.target).parent(),n=t.index();a.removeClass("is-visible").eq(n).addClass("is-visible"),o.removeClass("is-active"),t.addClass("is-active")})},a.prototype.dropdownCategories=function(){var e=t.getElementById("dropdownTrigger"),o=t.getElementById("mainCategories");e.addEventListener("click",function(){i(o).toggleClass("is-opened"),n.thumbs.reset()})},n.nav=new a}(window,document,jQuery,window.malak=window.malak||{}),function(e,t,i,n,o){"use strict";var a=n.Overlay=function(){};a.prototype.init=function(){this.events(),this.mobile()},a.prototype.mobile=function(){function o(){i(a).detach(),i(s).before(i(a)),l=!0}var a=t.getElementById("addresses"),s=(t.getElementById("categories"),t.getElementById("contact-form")),r=t.getElementById("sidebar"),l=!1;e.addEventListener("resize",function(e){n.helper.isWindowSmallerThan(1025)===!0?l===!1&&o():l===!0&&(i(a).detach(),i(r).append(i(a)),l=!1)}),n.helper.isWindowSmallerThan(1025)===!0&&o()},a.prototype.events=function(){i(t).on("click",".js-exit",function(){a.prototype.destroy()}),i(t).on("click",".js-menu",function(){a.prototype.enable()}),i(t).keyup(function(e){27==e.keyCode&&a.prototype.destroy()})},a.prototype.destroy=function(){i(t.getElementById("mainCategories")).removeClass("is-opened"),i(t.getElementById("overlay")).removeClass("is-visible"),i(t.getElementsByTagName("body")).removeClass("no-scroll"),i(".o-form__fields").removeClass("is-hidden"),i(".o-form__thanks").addClass("is-hidden"),n.contactForm.destroy();var e=new Flickity(".js-carousel");e.destroy()},a.prototype.enable=function(){function e(){o=new Flickity(".js-carousel",{cellAlign:"left",contain:!0,freeScroll:!0,prevNextButtons:!1,pageDots:!1,watchCSS:!0})}var o,a=t.getElementsByTagName("body"),s=t.getElementById("overlay");i(a).addClass("no-scroll"),i(s).addClass("is-visible"),n.helper.isWindowSmallerThan(1025)===!0&&(e(),o.resize()),n.contactForm.init()},n.overlay=new a}(window,document,jQuery,window.malak=window.malak||{}),function(e,t,i,n,o){"use strict";var a=n.Player=function(){};a.prototype.init=function(){this.enable(),this.buttons()},a.prototype.buttons=function(){var e=0,o=t.getElementById("grid"),a=i(".c-thumbs__item",o),s=t.getElementById("vimelar-player"),r=t.getElementById("next-button"),l=t.getElementById("prev-button"),c=new Vimeo.Player(s),d=t.getElementById("playerTouch");t.getElementById("fullscreen-button").addEventListener("click",function(){BigScreen.enabled&&BigScreen.toggle()},!1),r.addEventListener("click",function(){e++,n.thumbs.showVideo(a.eq(e)),e>0&&i(l).removeClass("is-hidden"),e==o.length&&i(this).addClass("is-hidden"),i("i",d).removeClass("is-visible")},!1),l.addEventListener("click",function(){e--,n.thumbs.showVideo(a.eq(e)),0===e&&i(l).addClass("is-hidden"),i(r).removeClass("is-hidden"),i("i",d).removeClass("is-visible")},!1),t.getElementById("play-sound").addEventListener("click",function(){i(this).toggleClass("no-sound"),i(this).hasClass("no-sound")?c.setVolume(0):c.setVolume(1)},!1)},a.prototype.enable=function(){var e=i(".c-thumbs__item").eq(0);n.thumbs.showVideo(e),i(".c-player").addClass("is-loading")},n.player=new a}(window,document,jQuery,window.malak=window.malak||{}),function(e,t,i,n,o){"use strict";var a=n.Thumbs=function(){};a.prototype.init=function(){this.enable(),this.events()},a.prototype.events=function(){i(".c-thumbs__item").on("click",".js-play",function(e){e.preventDefault(),n.thumbs.showVideo(i(this).parents(".c-thumbs__item"))}),e.addEventListener("resize",function(e){n.helper.isWindowSmallerThan(641)===!1&&n.thumbs.reset()})},a.prototype.enable=function(){function e(){var e=t.getElementById("showThumbs");e.addEventListener("click",function(e){e.preventDefault(),i("body").removeClass("no-scroll"),n.helper.goToTarget(i(this).attr("href"),100)})}i(".c-thumbs__item").each(function(){var e=i(this),t=e.data("src"),n=i(".c-thumb__title",this),o=i(".o-media",this);i.getJSON("//www.vimeo.com/api/v2/video/"+t+".json?callback=?",{format:"json"},function(e){o.attr("src",e[0].thumbnail_large),n.text(e[0].title)})}),e()},a.prototype.reset=function(){var e=t.getElementById("thumbVideo");e&&(i(e).remove(),i(".c-thumbs__item.is-active .c-thumb").show(),i(".c-thumbs__item.is-active").removeClass("is-active"))},a.prototype.showVideo=function(o){function a(){var a=(t.getElementById("grid"),i(".c-thumb",o));t.getElementById("thumbVideo");n.thumbs.reset(),i(o).addClass("is-active"),i("<iframe />",{name:"myFrame",id:"thumbVideo",src:"//player.vimeo.com/video/"+l+"?autoplay=1&portrait=0&badge=0&byline=0&title=0&hd_off=1&api=1",frameborder:0,height:360,webkitallowfullscreen:1,mozallowfullscreen:1,allowfullscreen:1}).prependTo(o);var s=t.getElementById("thumbVideo"),r=e.innerWidth;e.addEventListener("resize",function(t){r=e.innerWidth,i(s).css("width",r)});a.hide(),i(s).css("width",r)}function s(){i("#vid").addClass("is-loading"),i("#vimelar-container").remove(),i("#vid").vimelar({videoId:l});var e=t.getElementById("vimelar-player"),n=new Vimeo.Player(e),o=t.getElementById("play-button"),a=t.getElementById("playerTouch"),s=function(){i(this).toggleClass("icon-play icon-pause"),i(this).hasClass("icon-pause")?n.play():n.pause()},r=function(){console.log("end")},c=function(){i(o).removeClass("icon-play").addClass("icon-pause"),i("i",a).removeClass("is-visible")},d=function(){i(o).addClass("icon-play").removeClass("icon-pause"),i("i",a).addClass("is-visible")},u=function(){i("i",this).toggleClass("is-visible"),i("i",this).hasClass("is-visible")?n.pause():n.play()};i("i",a).removeClass("is-visible"),n.on("play",c),n.on("pause",d),n.on("ended",r),i(e).fadeOut(0),e.addEventListener("load",function(t){i(e).fadeIn(1e3),i("#vid").removeClass("is-loading")}),i(o).unbind("click").on("click",s),i(a).unbind("click").on("click",u)}var r=o,l=(t.getElementsByTagName("body"),r.data("src"));n.helper.isWindowSmallerThan(641)===!1?0!==i(e).scrollTop()?i("html, body").animate({scrollTop:0},{duration:1e3,easing:"easeOutCubic",complete:s}):s():a()},n.thumbs=new a}(window,document,jQuery,window.malak=window.malak||{}),function(e,t){var i={ratio:16/9,videoId:"8970192",width:e(t).width(),wrapperZIndex:99},n=function(n,o){var a=e.extend({},i,o),s=e(n);e("<iframe />",{name:"myFrame",id:"vimelar-player",src:"//player.vimeo.com/video/"+a.videoId+"?autoplay=1&portrait=0&badge=0&byline=0&title=0&hd_off=1&api=1",style:"position: absolute;",frameborder:0,webkitallowfullscreen:1,mozallowfullscreen:1,allowfullscreen:1}).prependTo("#vid").wrap('<div id="vimelar-container" style="overflow: hidden; position: absolute; z-index: 1; width: 100%; height: 100%"></div>').after('<div id="vimelar-overlay" style="width: 100%; height: 100%; z-index: 2; position: absolute; left: 0; top: 0;"></div>'),s.css({position:"relative","z-index":a.wrapperZIndex});var r=function(){var i,n,o=e(t).width(),s=e(t).height()-200,r=e("#vimelar-player");o/a.ratio<s+100?(i=Math.ceil(s*a.ratio),r.height(s+102).css({top:-50})):(n=Math.ceil(o/a.ratio),r.height(n).css({top:(s-n)/2}))};e(t).load(function(){r()}),e(t).on("resize.vimelar",function(){r()})};e.fn.vimelar=function(t){return this.each(function(){e.data(this,"vimelar_instantiated")||e.data(this,"vimelar_instantiated",n(this,t))})}}(jQuery,window),function(e,t,i,n,o){"use strict";n.overlay.init(),n.nav.init(),n.thumbs.init(),n.categories.init(),n.player.init(),i(t).ready(function(){i(this).scrollTop(0),i(t).on("click",".js-goto",function(e){if(e.preventDefault(),i(this).data("offset")){var t=i(this).data("offset");n.helper.goToTarget(i(this).attr("href"),t)}else n.helper.goToTarget(i(this).attr("href"))}),n.helper.isInView()})}(window,document,jQuery,window.malak=window.malak||{});