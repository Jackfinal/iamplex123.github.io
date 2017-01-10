﻿ /*
  * Quick Library
  *
  * Date: 2016-08-16
  */

 ( function( global, factory ) {
     'use strict';

     if ( typeof define === 'function' && define.amd ) {

         // 兼容AMD规范
         define( [ 'jquery' ], function( $ ) {
             return factory( global, $ );
         } );
     } else {

         // 全局模式
         global.q = factory( global, $ );
     }
 } )( this, function( global, $ ) {

     'use strict';

     var q = {},

         mainContainer = $( '.inner-content' );

     q = {
         getURL: function() {
             var path = location.hash.split( '#/' )[ 1 ],
                 search = '',
                 url = '';

             NProgress.start();

             if ( path ) {
                 search = path.split( '?' )[ 1 ];
                 url = path.split( '?' )[ 0 ] + '.html';

                 if ( search )
                     url += '?' + search;
             }

             return url;
         },

         toURL: function() {
             var path = q.getURL();

             // if ( !q.isFuckingBitch() )

             $.get( path, function( data, textStatus ) {
                 mainContainer.html( data );
                 NProgress.done();
             } );
         },

         isFuckingBitch: function() {
             return document.documentMode == 7 ? true : false;
         }
     };

     $( function() {
         var oldURL = '';

         if ( !q.isFuckingBitch() )
             global.onhashchange = q.toURL;
         else {
             setInterval( function() {
                 var newURL = q.getURL();

                 if ( oldURL != newURL ) {
                     oldURL = newURL;
                     q.toURL();
                 }
             }, 100 );
         }

         // 首次加载
         if ( location.hash === '' )
             location.href = '/#/components/header/header';
         else
             q.toURL();
     } );

     return q;
 } );
