( function( $ ) {
    'use strict';

    $.fn.header = function( options ) {
        var self = this,
            max_height = parseInt( self.css( 'height' ) ),
            real_height = 0,

            timer = null,

            lastScrollY = 0;

        function animation_v2( end ) {
            var speed = real_height < end ? 5 : -5;

            clearTimeout( timer );

            if ( real_height != end ) {
                self.css( {
                    top: ( real_height += speed ) + 'px'
                } );

                timer = setTimeout( animation_v2, 15 );
            }
        }

        function animation( end ) {
            clearTimeout( timer );

            timer = setInterval( function() {
                // var speed = real_height < end ? 5 : -5;
                var speed = (end - real_height) / 20;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if ( real_height == end )
                    clearTimeout( timer );
                else {
                    self.css( {
                        top: ( real_height += speed ) + 'px'
                    } );
                }
            }, 15 );
        }

        function getScrollY() {
            return (

                window.pageYOffset

                ||

                document.documentElement.scrollTop
            );
        }

        function scrollEvent( event ) {
            var currentScrollY = getScrollY();

            if ( currentScrollY == lastScrollY )
                return;

            if ( currentScrollY < lastScrollY || lastScrollY == 0 )
                animation( 0 );
            else
                animation( -max_height );

            lastScrollY = currentScrollY;
        }

        self.css( {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            background: '#292f36',
            zIndex: 999
        } );

        $( window ).on( 'scroll', scrollEvent );
    }
} )( jQuery )
