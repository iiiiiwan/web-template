// ========================================================
// CONFIG
// ========================================================
require('../sub_libs/slick.js')($);
// ========================================================
// SLICK HANDLER KLASS
// ========================================================
var SlickHandlerKlass = function($elm, config){
  var self = this;
  self.elm = $elm;
  self.options = $.extend(
    {
      dots           : true,
      infinite       : true,
      speed          : 200,
      slidesToShow   : 4,
      slidesToScroll : 4,
      responsive     : [
        {
          breakpoint : 1024,
          settings   : {
            slidesToShow   : 3,
            slidesToScroll : 3,
            infinite       : true,
            dots           : true
          }
        },
        {
          breakpoint : 600,
          settings   : {
            slidesToShow   : 2,
            slidesToScroll : 2,
            infinite       : true,
            dots           : true
          }
        },
        {
          breakpoint : 480,
          settings   : {
            slidesToShow   : 1,
            slidesToScroll : 1,
            infinite       : true,
            dots           : true
          }
        }
      ]
    },
    config
  );
  return self;
};
SlickHandlerKlass.prototype = {
  getSelf : function(){
    return this;
  },
  init : function(){
    var self = this.getSelf();
    self.elm.slick(self.options);
  }
};
module.exports = SlickHandlerKlass;