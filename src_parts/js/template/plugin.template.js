(function(factory){
  if(typeof define === 'function' && define.amd){
    define(['jquery'], factory);
  }else if(typeof exports === 'object'){
    module.exports = factory;
  }else{
    factory(jQuery);
  }
}(function($){
  // ----------------------------------------------------------------------
  // PLUGIN - TEMPLATE
  // ----------------------------------------------------------------------
  $.fn.extend(
    {
      plugin : function(config){
        var options = $.extend({}, config);
        return $(this);
      }
    }
  );
}));