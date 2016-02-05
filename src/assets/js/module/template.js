$(function(){
  // ========================================================
  // CONFIG
  // ========================================================
  var CONFIG            = require('config');
  var COMMON            = require('common');
  var SlickHandlerKlass = require('klass/Slick');
  var GULP_TEMPLATE     = {};
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
      new SlickHandlerKlass($('#slickRoot ul')).init();
      new SlickHandlerKlass(
        $('#filterImageRoot ul'),
        {
          dots           : true,
          infinite       : true,
          speed          : 400,
          slidesToShow   : 4,
          slidesToScroll : 1,
          autoplay       : true,
          autoplaySpeed  : 800,
          responsive     : [
            {
              breakpoint : 1024,
              settings   : {
                slidesToShow   : 3,
                slidesToScroll : 1
              }
            },
            {
              breakpoint : 600,
              settings   : {
                slidesToShow   : 2,
                slidesToScroll : 1
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
        }
      ).init();
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