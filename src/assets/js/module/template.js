$(function(){
  // ========================================================
  // CONFIG
  // ========================================================
  var CONFIG       = require('../../../../src_parts/js/config.js');
  var COMMON       = require('../../../../src_parts/js/common.js');
  var GULP_TEMPLATE = {};
  // ========================================================
  // PROJECT - DEFINITION
  // ========================================================
  GULP_TEMPLATE = {
    init : function(){

      // --------------------------------------------
      // CSS ANIMATION
      // --------------------------------------------
      var cssAnimationRoot = $('#cssAnimationRoot');
      cssAnimationRoot.find('a').each(function(){
        var self = $(this);
        self.on('click', function(){
          cssAnimationRoot.addClass(self.attr('id'));
        });
      });
      COMMON.handle.bindAnimationEnd(
        cssAnimationRoot,
        function(){
          cssAnimationRoot.removeClass();
        }
      );

      // --------------------------------------------
      // SLICK
      // --------------------------------------------
      var SlickHandlerKlass = require('../../../../src_parts/js/klass/Slick.js');
      new SlickHandlerKlass($('#slickRoot ul')).init();

      // --------------------------------------------
      // CHECK JQUERY VERSION
      // --------------------------------------------
      console.log('jQuery version : ' + $.fn.jquery);

    }
  };
  // ========================================================
  // PROJECT - INIT
  // ========================================================
  COMMON.init(
    CONFIG.stack.defaultDuration,
    CONFIG.stack.defaultEasing,
    function(){
      GULP_TEMPLATE.init();
    },
    function(){}
  );
});