// ========================================================
// VALIDATE
// ========================================================
/**
 * @namespace VALIDATE
 * @type {object}
 */
var VALIDATE = {
  /**
   * Check Empty + 2 bytes' String
   * @memberof VALIDATE
   * @param {string} str - Target String
   * @return {boolean} result (Empty Or Not)
  */
  filter : function(str){
    try{
      var strCache = str.trim();
      if(strCache == ''){
        return false;
      }else{
        return strCache.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s){
          return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
      }
    }catch(e){
      return false;
    }
  },
  /**
   * Check Byte
   * @memberof VALIDATE
   * @param {string} str  - Target String
   * @param {boolean} flg - 2 Bytes' Check Flg
   * @return {boolean} result (2 Bytes Or Not)
  */
  checkString : function(str, flg){
    for(var i = 0, il = str.length; i < il; i++){
      var c = str.charCodeAt(i);
      if(
        (c >= 0x0 && c < 0x81) ||
        (c == 0xf8f0) ||
        (c >= 0xff61 && c < 0xffa0) ||
        (c >= 0xf8f1 && c < 0xf8f4)
      ){
        if(!flg){
          return true;
        }
      }else{
        if(flg){
          return true;
        }
      }
    }
    return false;
  },
  /**
   * Check Half Size
   * @memberof VALIDATE
   * @param {string} str - Target String
   * @return {boolean} result (Half Size Or Not)
  */
  checkOneByteStr : function(str){
    var strCache = VALIDATE.filter(str);
    if(strCache !== false){
      return VALIDATE.checkString(strCache, 0);
    }else{
      return false;
    }
  },
  /**
   * Check 2 Bytes
   * @memberof VALIDATE
   * @param {string} str - Target String
   * @return {boolean} result (2 Bytes Or Not)
  */
  checkTwoByteStr : function(str){
    var strCache = VALIDATE.filter(str);
    if(strCache !== false){
      return VALIDATE.checkString(strCache, 1);
    }else{
      return false;
    }
  },
  /**
   * Check Kana
   * @memberof VALIDATE
   * @param {string} str - Target String
   * @return {boolean} result (Kana Or Not)
  */
  checkAllKanaStr : function(str){
    var strCache = VALIDATE.filter(str);
    if(strCache !== false){
      for(var i = 0; i < strCache.length; i++){
        if(strCache.charAt(i).match(/^[ァ-ヶー]*$/) == null){
          return false;
        }
      }
      return true;
    }else{
      return false;
    }
  },
  /**
   * Check Number (Half Size)
   * @memberof VALIDATE
   * @param {string} str - Target String
   * @return {boolean} result (Number Or Not)
  */
  checkAllNumStr : function(str){
    var strCache = VALIDATE.filter(str);
    if(strCache !== false){
      if(strCache.match(/[^0-9]+/)){
        return false;
      }else{
        return true;
      }
    }else{
      return false;
    }
  },
  /**
   * Check Mail Address
   * @memberof VALIDATE
   * @param {string} str - Target String
   * @return {boolean} result (Mail Address Or Not)
  */
  checkMailStr : function(str){
    var strCache = VALIDATE.filter(str);
    if(strCache !== false){
      if(str.match(/(([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+)/)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  /**
   * Check My Number
   * @memberof VALIDATE
   * @param {string} str - Target String
   * @return {boolean} result (My Number Or Not)
  */
  checkMyNumber : function(str){
    var strNum = str.length;
    var divisor = 11;
    var sigma = 11;
    var sum = 0;
    var pn = 0;
    var qn = 0;
    for (var n = 1; n <= sigma; n++) {
      pn = parseInt(str.substr(sigma - n, 1));
      qn = (n >= 1 && n <= 6) ? n + 1 : n - 5;
      sum += pn * qn;
    }
    return ((sum % sigma <= 1) ? 0 : divisor - (sum % divisor)).toString() === (str.substring(strNum - 1, strNum));
  }
};
module.exports = VALIDATE;