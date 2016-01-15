$(function(){

  var CONFIG       = require('../../../../src_parts/js/config.js');
  var COMMON       = require('../../../../src_parts/js/common.js');

  COMMON.init(
    CONFIG.stack.defaultDuration,
    CONFIG.stack.defaultEasing,
    function(){

    },
    function(){
      console.log('jQuery version : ' + $.fn.jquery);
    }
  );

});