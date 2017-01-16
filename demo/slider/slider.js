( function( $ ) {
    'use strict';

    $.fn.slider = function( options ) {
        var $li = this.children().children(),
            playInterval = null,
            i = 0,
            len = $li.length,
            isDone = true;

        function play( li ) {
            var current_li = $( $li[ i ] );

            if ( isDone ) {
                isDone = false;

                if ( li )
                    current_li = li;

                current_li.fadeIn().siblings().fadeOut( function() {
                    isDone = true;
                } );
            }
        }

        function next() {
            if ( i == len - 1 )
                i = 0;
            else
                i++;
        }

        function prev() {
            if ( i == 0 )
                i = len - 1;
            else
                i--;
        }

        function replay( li ) {
            play( li );

            clearInterval( playInterval );

            playInterval = setInterval( function() {
                next();
                play();
            }, 2500 );
        }

        function initPagination() {
            var liHtml = [],
                index = 0;

            while ( index < len ) {
                liHtml.push( '<li slider-index="' + index + '">' + ( index + 1 ) + '</li>' );
                index++;
            }

            $( '.slider-pagination' ).html( liHtml.join( '' ) );
        }

        this.css( {
            'position': 'relative',
            'z-index': '1'
        } );

        this.children().css( {
            'list-style-type': 'none'
        } );

        $li.css( {
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'right': '0',
            'display': 'none'
        } );

        initPagination();

        $( '.slider-pagination' ).on( 'click', 'li', function() {
            replay( $( $li[ $( this ).attr( 'slider-index' ) ] ) );
            clearInterval( playInterval );
        } );

        $( '.slider-prev' ).on( 'click', function() {
            prev();
            replay();
        } );

        $( '.slider-next' ).on( 'click', function() {
            next();
            replay();
        } );

        $( $li[ 0 ] ).css( { 'display': 'block' } );
        this.css( { 'display': 'block' } );
        playInterval = setInterval( function() {
            next();
            play();
        }, 2500 );
    }
} )( jQuery )
