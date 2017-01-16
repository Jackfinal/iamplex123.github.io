/**
 * dialog.js
 *
 * update:2016-12-13
 *    修复了各种bug
 *    增加了回车键和退出键事件
 */

;
( function( global, factory ) {

    'use strict';

    if ( typeof define === 'function' && define.amd ) {

        // 兼容AMD规范
        define( [ 'jquery' ], factory );
    } else {

        // 全局模式
        global.dialog = factory( global.jQuery );
    }

} )( this, function init( $ ) {

    'use strict';

    var dialog = {},

        template = $( [
            '<div class="mx-dialog">',
            '<h1 class="mx-dialog-title"></h1>',
            '<i class="mx-dialog-close"></i>',
            '<div class="mx-dialog-content"></div>',
            '<div class="mx-dialog-button">',
            '<i class="mx-dialog-loading"></i>',
            '<a href="javascript:;" class="mx-dialog-submit">确定</a>',
            ' ',
            '<a href="javascript:;" class="mx-dialog-cancel">取消</a>',
            '</div>',
            '</div>'
        ].join( '' ) ),

        // 遮罩层
        mask = $( '<div class="mx-dialog-mask"></div>' ),

        // 内容页管理器, 用于枚举不同的内容页
        contents = {},

        default_options = {
            showButton: true
        }


    // 显示弹出框
    dialog.init = function( options ) {
        var options = $.extend( {}, default_options, options );

        // 缓存模版
        if ( !contents[ options.id ] )
            contents[ options.id ] = $( '#' + options.id ).html();

        // 只能存在一个弹出框
        if ( $( '.mx-dialog' ).length > 0 ) {
            return;
        }

        // 移除页面上的内容页
        $( '#' + options.id ).remove();

        // 将内容页放入弹出框
        template.find( '.mx-dialog-content' )
            .css( {
                height: options.height - 125
            } )
            .html( contents[ options.id ] );

        // 设置弹出框高度和宽度
        template.css( {
            width: options.width,
            height: options.height,
            top: ( ( window.innerHeight || ( document.documentElement && document.documentElement.clientHeight ) || document.body.clientHeight ) - options.height ) / 2 * 0.7,
            left: ( ( window.innerWidth || ( document.documentElement && document.documentElement.clientWidth ) || document.body.clientWidth ) - options.width ) / 2
        } );

        // 隐藏loading动画
        template.find( 'i.mx-dialog-loading' ).css( {
                position: 'relative',
                top: 6
            } )
            .hide();

        // 设置标题
        if ( options.title )
            template.find( '.mx-dialog-title' ).html( options.title );
        else {
            // template.find( '.dialog-title' ).remove();
        }

        if ( options.showButton == true ) {
            template.find( '.mx-dialog-button' ).show();

            // 确定事件
            template.on( 'click', '.mx-dialog-submit', function() {
                if ( options.onSubmit )
                    options.onSubmit();
            } );
        } else {
            template.find( '.mx-dialog-button' ).hide();
        }

        // 关闭事件
        template.on( 'click', '.mx-dialog-close, .mx-dialog-cancel', function() {
            dialog.destroy( options.id );
        } );

        // 键盘事件
        $( 'body' ).on( 'keydown', function( event ) {
            if ( options.showButton == true ) {
                // 确定
                if ( event.keyCode == 13 ) {
                    if ( options.onSubmit )
                        options.onSubmit();
                }
            }

            // 关闭
            if ( event.keyCode == 27 )
                dialog.destroy( options.id );
        } );

        // 将内容页的id赋值给弹出框
        template.prop( 'id', options.id );

        // 显示弹出框
        $( 'body' ).append( template );
        $( 'body' ).append( mask );

        // 自定义初始化回调函数
        if ( options.onInit )
            options.onInit();
    }

    // 关闭弹出框
    dialog.destroy = function( id ) {
        $( '#' + id ).remove();
        mask.remove();

        $( 'body' ).off( 'keydown' );
    }

    return dialog;
} )
