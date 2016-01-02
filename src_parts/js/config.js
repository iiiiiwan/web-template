// ========================================================
// POLYFILLs
// ========================================================
if(!String.prototype.trim){
  String.prototype.trim = function(){
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
// ========================================================
// CONFIG
// ========================================================
/**
 * @namespace CONFIG
 * @type {object}
 * @prop {object} stack                     - 共通設定
 * @prop {object} stack.logFlg              - ログ出力するか否か
 * @prop {object} stack.defaultDuration     - 各アニメーションの基本タイミング
 * @prop {object} stack.defaultEasing       - 各アニメーションの基本イージング名
 * @prop {object} stack.styleObj            - 共通スタイル
 * @prop {object} stack.styleObj.opacityOn  - opacity:1;
 * @prop {object} stack.styleObj.opacityOff - opacity:0;
 */
var CONFIG = {
  stack : {
    logFlg          : true,
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
   * 初期化
   * @memberof CONFIG
   * @return {object} CONFIG
  */
  init : function(){
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
    if(!window.console || !CONFIG.stack.logFlg){
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