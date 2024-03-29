// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

jQuery.fn.exists            = function(){return this.length>0;}
jQuery.fn.centerWidth       = function(){
    var winWidth;
    if ( $.browser.msie && $.browser.version == '8.0' ) {
        
        winWidth    = $(window).width() / 2;
    } else {
        
        winWidth    = window.innerWidth / 2;
    }
    
    var elemWidth   = $( this ).width() / 2;
    
    if ( parseInt( winWidth - elemWidth ) < 100 ) {
        
        winWidth    = $( 'body' ).innerWidth() / 2;
    }
    
    var elemLeft    = winWidth - elemWidth;
    
    this.css( 'left', elemLeft + 'px' );
}
jQuery.fn.centerHeight      = function(){
    var winHeight;
    if ( $.browser.msie && $.browser.version == '8.0' ) {
        
        winHeight = $(window).height() / 2;
    } else {
        
        winHeight = window.innerHeight / 2;
    }
    
    var elemHeight = $( this ).height() / 2;
    var elemTop = winHeight - elemHeight;

    this.css( 'top', elemTop + 'px' );
}
//
//  @codekit-append "vendor/jquery.form.js", "vendor/jquery.validate.js", "vendor/additional-methods.js";