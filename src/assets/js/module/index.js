$(function(){

  var CONFIG       = require('../../../../src_parts/js/config.js');
  var COMMON       = require('../../../../src_parts/js/common.js');

  var SlickHandlerKlass = require('../../../../src_parts/js/klass/Slick.js')

  COMMON.init(
    CONFIG.stack.defaultDuration,
    CONFIG.stack.defaultEasing,
    function(){
      new SlickHandlerKlass($('#slickRoot ul')).init();
    },
    function(){
      console.log('jQuery version : ' + $.fn.jquery);
    }
  );

});