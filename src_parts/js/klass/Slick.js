// ========================================================
// CONFIG
// ========================================================
require('../sub_libs/slick.js')($);
// ========================================================
// SLICK HANDLER KLASS
// ========================================================
/**
 * @classdesc For Slick Image Gallery<br><br><pre>new SlickHandlerKlass(
  $elm : jQuery Object,
  config
).init();
 * @param {object}  elm   - jQuery Object For Slick
 * @param {object} config - Settings For Slick
 * @prop {object} elm     - jQuery Object For Slick
 * @prop {object} options - Default Settings For Slick
 * @prop {boolean} options.dots - Dots Flg
 * @prop {boolean} options.infinite - Infinite Loop Flg
 * @prop {boolean} options.speed - Speed For Slider
 * @prop {boolean} options.slidesToShow - Slide Number In View
 * @prop {boolean} options.slidesToScroll - Slide Number By Scroll
 * @prop {array} options.responsive - Responsive Settings
 * @constructor
 */
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
            slidesToScroll : 3
          }
        },
        {
          breakpoint : 600,
          settings   : {
            slidesToShow   : 2,
            slidesToScroll : 2
          }
        },
        {
          breakpoint : 480,
          settings   : {
            slidesToShow   : 1,
            slidesToScroll : 1
          }
        }
      ]
    },
    config
  );
  return self;
};
SlickHandlerKlass.prototype = {
  /**
   * Get Self
   * @return {object} SlickHandlerKlass
   */
  getSelf : function(){
    return this;
  },
  /**
   * Initialize Slick
   * @return {object} SlickHandlerKlass
   */
  init : function(){
    var self = this.getSelf();
    self.elm.slick(self.options);
    return self;
  }
};
// ========================================================
// EXPORTS
// ========================================================
module.exports = SlickHandlerKlass;