// ========================================================
// CONFIG
// ========================================================
/**
 * @namespace CONFIG
 * @type {object}
 */
var CONFIG = {
  /**
   * @namespace CONFIG.stack
   * @prop {object} stack.defaultDuration     - Default Duration
   * @prop {object} stack.defaultEasing       - Default Easing
   * @prop {object} stack.styleObj            - Cache For Style Object
   * @prop {object} stack.styleObj.opacityOn  - opacity:1;
   * @prop {object} stack.styleObj.opacityOff - opacity:0;
   */
  stack : {
    defaultDuration : 800,
    minimumDuration : 10,
    defaultEasing   : 'easeInOutQuart',
    styleObj : {
      opacityOn : {
        'opacity' : 1
      },
      opacityOff : {
        'opacity' : 0
      }
    }
  },
  /**
   * Initialize<br><br> - String.prototype.trim<br> - window.requestAnimationFrame<br> - window.cancelAnimationFrame<br> - window.console
   * @memberof CONFIG
   * @return {object} CONFIG
  */
  init : function(){
    if(!String.prototype.trim){
      String.prototype.trim = function(){
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };
    }
    window.requestAnimationFrame = null;
    window.cancelAnimationFrame = null;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var i = 0, limit = vendors.length; i < limit && !window.requestAnimationFrame; i++){
      window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i]+'CancelRequestAnimationFrame'];
    }
    if(!window.requestAnimationFrame){
      window.requestAnimationFrame = function(callBack){
        return setTimeout(callBack, 1000 / 60);
      };
      window.cancelAnimationFrame = function(timerId){
        return clearTimeout(timerId);
      };
    }
    if(!window.console){
      window.console = {
        log   : function(msg){},
        warn  : function(msg){},
        info  : function(msg){},
        error : function(msg){},
        dir   : function(msg){}
      };
    }
    return CONFIG;
  }
};
module.exports = CONFIG.init();