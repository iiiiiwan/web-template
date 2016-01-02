// ========================================================
// COMMON
// ========================================================
/**
 * @namespace COMMON
 * @type {object}
 * @prop {object} cache            - 共通DOMキャッシュ
 * @prop {object} cache._w         - Window Via jQuery
 * @prop {object} cache._d         - Document Via jQuery
 * @prop {object} cache._b         - Body Via jQuery
 * @prop {object} cache._r         - Html + Body Via jQuery
 * @prop {object} config           - ブラウザ基本情報
 * @prop {object} config.ua        - User Agent [ lowercase ]
 * @prop {object} config.app       - App Version [ lowercase ]
 * @prop {object} marker           - 共通クラス情報
 * @prop {object} marker.def       - マーカークラス [ '___marker'    ]
 * @prop {object} marker.hover     - マーカークラス [ '___hover'     ]
 * @prop {object} marker.err       - マーカークラス [ '___error'     ]
 * @prop {object} marker.loading   - マーカークラス [ '___loading'   ]
 * @prop {object} marker.pc        - マーカークラス [ '___pc'        ]
 * @prop {object} marker.ie        - マーカークラス [ '___ie'        ]
 * @prop {object} marker.tablet    - マーカークラス [ '___tablet'    ]
 * @prop {object} marker.cellphone - マーカークラス [ '___cellphone' ]
 */
var COMMON = {
  cache : {
    _w : null,
    _d : null,
    _b : null,
    _r : null
  },
  config : {
    ua       : window.navigator.userAgent.toLowerCase(),
    app      : window.navigator.appVersion.toLowerCase()
  },
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
   * @namespace COMMON > handle
  */
  handle : {
    /**
     * URLからパラメータを取得
     * @memberof COMMON > handle
     * @return {object.<string, string>} パラメータオブジェクト
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
     * 画像を先読み
     * @memberof COMMON > handle
     * @param {array} imgArr - 画像ファイルパスを要素とする配列
     * @return {null}
    */
    preload : function(imgArr){
      var imgCache = null;
      for(var i = 0, il = imgArr.length; i < il; i++){
        imgCache = new Image();
        imgCache.src = imgArr[i];
      }
    },
    /**
     * 初期表示
     * @memberof COMMON > handle
     * @param {number}   duration  - 表示アニメーションのインターバル
     * @param {string}   easing    - イージングタイプ名
     * @param {function} bCallBack - 事「前」コールバック関数
     * @param {function} aCallBack - 事「後」コールバック関数
     * @return {null}
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
     * CSSアニメーションの終了検知
     * @memberof COMMON > handle
     * @param {object} elm        - jQuery Element Object
     * @param {function} callBack - CSSアニメーション終了時のコールバック関数
     * @return {null}
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
     * イベントの抹殺
     * @memberof COMMON > handle
     * @param {object} evt - jQuery Event Object
     * @return {boolean} false
    */
    killEvt : function(evt){
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    },
    /**
     * スマホ用にホバーを設定
     * @memberof COMMON > handle
     * @return {null}
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
     * 端末判定リダイレクト
     * @memberof COMMON > handle
     * @return {null}
    */
    setRedirectMarker : function(){
      if(
        COMMON.config.ua.indexOf('iphone') > 0 ||
        COMMON.config.ua.indexOf('android') > 0 && COMMON.config.ua.indexOf('mobile') > 0
      ){
        // SP
        COMMON.cache._b.addClass(COMMON.marker.cellphone);
      }else if(COMMON.config.ua.indexOf('ipad') > 0 || COMMON.config.ua.indexOf('android') > 0){
        // TAB
        COMMON.cache._b.addClass(COMMON.marker.tablet);
      }else if(COMMON.config.ua.match(/msie/) || COMMON.config.ua.match(/trident/)){
        // IE
        COMMON.cache._b.addClass(COMMON.marker.ie);
      }else{
        // PC [ firefox , chrome , opera -> re-recheck ]
        COMMON.cache._b.addClass(COMMON.marker.pc);
        // ---------------------------------------------
        // Inner Check
        // ---------------------------------------------
        if(COMMON.config.ua.indexOf('chrome') != -1){
          console.warn('=== chrome ===');
        }else if(COMMON.config.ua.indexOf('safari') != -1){
          console.warn('=== safari ===');
        }else if(COMMON.config.ua.indexOf('opera') != -1){
          console.warn('=== opera ===');
        }else if(COMMON.config.ua.indexOf('firefox') != -1){
          console.warn('=== firefox ===');
        }
      }
    }
  },
  /**
   * 初期化
   * @memberof COMMON
   * @param {number} duration    - 初期表示のタイミング
   * @param {string} easing      - 初期表示のイージング名
  　* @param {function} bCallBack - 事「前」コールバック関数
  　* @param {function} aCallBack - 事「後」コールバック関数
   * @return {null}
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