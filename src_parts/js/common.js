// ========================================================
// COMMON
// ========================================================
/**
 * @namespace COMMON
 * @type {object}
 */
var COMMON = {
  /**
   * @namespace COMMON.cache
   * @prop {object} _w - Window Via jQuery
   * @prop {object} _d - Document Via jQuery
   * @prop {object} _b - Body Via jQuery
   * @prop {object} _r - Html + Body Via jQuery
   */
  cache : {
    _w : null,
    _d : null,
    _b : null,
    _r : null
  },
  /**
   * @namespace COMMON.config
   * @prop {string} ua  - User Agent [ lowercase ]
   * @prop {string} app - App Version [ lowercase ]
  */
  config : {
    ua       : window.navigator.userAgent.toLowerCase(),
    app      : window.navigator.appVersion.toLowerCase()
  },
  /**
   * @namespace COMMON.marker
   * @prop {string} def       - ___marker
   * @prop {string} hover     - ___hover
   * @prop {string} err       - ___error
   * @prop {string} loading   - ___loading
   * @prop {string} pc        - ___pc
   * @prop {string} ie        - ___ie
   * @prop {string} tablet    - ___tablet
   * @prop {string} cellphone - ___cellphone
  */
  marker : {
    def       : null,
    hover     : null,
    err       : null,
    loading   : null,
    pc        : null,
    ie        : null,
    tablet    : null,
    cellphone : null
  },
  /**
   * @namespace COMMON.handle
  */
  handle : {
    /**
     * Get URL Parameter
     * @memberof COMMON.handle
     * @return {object.<string, string>} Parameter 'Key-Value' Object
    */
    param : function(){
      var resultParam = {};
      var paramBase = location.search.substring(1);
      if(paramBase == ''){
        return null;
      }else{
        var param = paramBase.split('&');
        var paramCache = null;
        for(var i = 0, il = param.length; i < il; i++){
          paramCache = param[i].split('=');
          resultParam[paramCache[0]] = paramCache[1]
        }
        return resultParam;
      }
    },
    /**
     * Load Image
     * @memberof COMMON.handle
     * @param {array} imgArr - Image Path Array
     * @return {null} null
    */
    preload : function(imgArr){
      var imgCache = null;
      for(var i = 0, il = imgArr.length; i < il; i++){
        imgCache = new Image();
        imgCache.src = imgArr[i];
      }
    },
    /**
     * View
     * @memberof COMMON.handle
     * @param {number}   duration  - Duration
     * @param {string}   easing    - Easing
     * @param {function} bCallBack - 1st CallBack
     * @param {function} aCallBack - 2nd CallBack
     * @return {null} null
    */
    view : function(duration, easing, bCallBack, aCallBack){
      COMMON.cache._b
      .velocity(
        {
          'opacity' : 1
        },
        {
          begin    : function(){
            if(bCallBack){
              bCallBack();
            }
          },
          duration : duration || 800,
          easing   : easing || 'swing',
          complete : function(){
            if(aCallBack){
              aCallBack();
            }
          }
        }
      );
    },
    /**
     * Bind Css Animation End
     * @memberof COMMON.handle
     * @param {object} elm        - jQuery Element Object @ Css Animation
     * @param {function} callBack - CallBack After Css Animation Ended
     * @return {null} null
    */
    bindAnimationEnd : function(elm, callBack){
      elm.on(
        'animationend webkitAnimationEnd',
        function(){
          if(callBack){
            callBack();
          }
        }
      );
    },
    /**
     * Kill User Event
     * @memberof COMMON.handle
     * @param {object} evt - jQuery Event Object
     * @return {boolean} false
    */
    killEvt : function(evt){
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    },
    /**
     * Bind Hover Action For Cellphone
     * @memberof COMMON.handle
     * @return {null} null
    */
    customHover : function(){
      $('a')
        .bind(
          'touchstart',
          function(){
            $(this).addClass(COMMON.marker.hover);
          }
        )
        .bind(
          'touchend',
          function(){
            $(this).removeClass(COMMON.marker.hover);
          }
        );
    },
    /**
     * Set Redirect Marker
     * @memberof COMMON.handle
     * @return {null} null
    */
    setRedirectMarker : function(){
      if(COMMON.config.ua.indexOf('iphone') > 0){
        // SP [ iphone ]
        COMMON.cache._b.addClass(COMMON.marker.cellphone + '_iphone');
      }else if(COMMON.config.ua.indexOf('ipad') > 0){
        // TAB [ ipad ]
        COMMON.cache._b.addClass(COMMON.marker.tablet + '_ipad');
      }else if(COMMON.config.ua.indexOf('android') > 0){
        if(COMMON.config.ua.indexOf('mobile') > 0){
          // SP [ android ]
          COMMON.cache._b.addClass(COMMON.marker.cellphone + '_android');
        }else{
          // TAB [ android ]
          COMMON.cache._b.addClass(COMMON.marker.tablet + '_android');
        }
      }else if(COMMON.config.ua.match(/msie/) || COMMON.config.ua.match(/trident/)){
        // PC [ Legacy IE ]
        COMMON.cache._b.addClass(
          COMMON.marker.ie + '_' + parseInt(COMMON.config.ua.match(/(msie\s|rv:)([\d\.]+)/)[2])
        );
      }else if(COMMON.config.ua.match(/edge/)){
        // PC [ Edge ]
        COMMON.cache._b.addClass(COMMON.marker.ie + '_edge');
      }else{
        // PC [ chrome, safari, opera, firefox ]
        if(COMMON.config.ua.indexOf('chrome') != -1){
          COMMON.cache._b.addClass(COMMON.marker.pc + '_chrome');
        }else if(COMMON.config.ua.indexOf('safari') != -1){
          COMMON.cache._b.addClass(COMMON.marker.pc + '_safari');
        }else if(COMMON.config.ua.indexOf('opera') != -1){
          COMMON.cache._b.addClass(COMMON.marker.pc + '_opera');
        }else if(COMMON.config.ua.indexOf('firefox') != -1){
          COMMON.cache._b.addClass(COMMON.marker.pc + '_firefox');
        }
      }
    }
  },
  /**
   * Initialize<br><br> - COMMON.handle.setRedirectMarker<br> - COMMON.handle.customHover<br> - COMMON.handle.view
   * @memberof COMMON
   * @param {number} duration    - Duration For COMMON.handle.view
   * @param {string} easing      - Easing For COMMON.handle.view
  　* @param {function} bCallBack - 1st CallBack For COMMON.handle.view
  　* @param {function} aCallBack - 2nd CallBack For COMMON.handle.view
   * @return {null} null
  */
  init : function(duration, easing, bCallBack, aCallBack){
    COMMON.cache = {
      _w : $(window),
      _d : $(document),
      _b : $('body'),
      _r : $('html, body')
    };
    COMMON.marker = {
      def       : '___marker',
      hover     : '___hover',
      err       : '___error',
      loading   : '___loading',
      pc        : '___pc',
      ie        : '___ie',
      tablet    : '___tablet',
      cellphone : '___cellphone'
    };
    COMMON.handle.setRedirectMarker();
    COMMON.handle.customHover();
    COMMON.handle.view(duration, easing, bCallBack, aCallBack);
  }
};
module.exports = COMMON;