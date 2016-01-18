// ----------------------------------------------------------------------
// KLASS - TEMPLATE
// ----------------------------------------------------------------------
var klass = function(id){
  var self = this;
  self.id = id;
  return self;
};
klass.prototype = {
  getSelf : function(){
    return this;
  },
  getId : function(){
    var self = this.getSelf();
    return self.id;
  }
};
module.exports = klass;