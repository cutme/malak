/**
 * jQuery Vimelar plugin
 * @author: Sozonov Alexey
 * @version: v.1.0
 * licensed under the MIT License
 * updated: July 5, 2015
 * since 2015
 * Enjoy.
 */

;(function ($, window) {

    // defaults
    var defaults = {
        ratio: 16/9, // usually either 4/3 or 16/9 -- tweak as needed
        videoId: '8970192',
        width: $(window).width(),
        wrapperZIndex: 99
    };

    // methods
    var vimelar = function(node, options) { // should be called on the wrapper div
        var opts = $.extend({}, defaults, options),
        $node = $(node); // cache wrapper node

        // build container
        $('<iframe />', {
            name: 'myFrame',
            id: 'vimelar-player',
            src: '//player.vimeo.com/video/' + opts.videoId + '?portrait=0&badge=0&byline=0&title=0&hd_off=1&api=1',
            style: 'position: absolute;',
            frameborder: 0,
            webkitallowfullscreen: 1,
            mozallowfullscreen: 1,
            allowfullscreen: 1
        }).prependTo('#vid').wrap('<div id="vimelar-container" style="overflow: hidden; position: absolute; z-index: 1; width: 100%; height: 100%"></div>').after('<div id="vimelar-overlay" style="width: 100%; height: 100%; z-index: 2; position: absolute; left: 0; top: 0;"></div>');

        $node.css({position: 'relative', 'z-index': opts.wrapperZIndex});

        // resize handler updates width, height and offset of player after resize/init
        var resize = function() {
            var width = $(window).width(),
                pWidth, // player width, to be defined
                height = $(window).height() - 200,
                pHeight, // player height, tbd
                $vimelarPlayer = $('#vimelar-player');

            // when screen aspect ratio differs from video, video must center and underlay one dimension
            if (width / opts.ratio < height + 100) { // if new video height < window height (gap underneath)
                pWidth = Math.ceil(height * opts.ratio); // get new player width
                $vimelarPlayer.height(height + 102).css({ top: -50}); // player width is greater, offset left; reset top
            } else { // new video width < window width (gap to right)
                pHeight = Math.ceil(width / opts.ratio); // get new player height
                $vimelarPlayer.height(pHeight).css({top: (height - pHeight ) / 2}); // player height is greater, offset top; reset left
            }

        };

        // events
        $(window).load(function() {
            resize();
        });

        $(window).on('resize.vimelar', function() {
            resize();
        });

    };

    // create plugin
    $.fn.vimelar = function (options) {
        return this.each(function () {
            if (!$.data(this, 'vimelar_instantiated')) { // let's only run one
                $.data(this, 'vimelar_instantiated',
                    vimelar(this, options));
            }            
        });
    };

})(jQuery, window);