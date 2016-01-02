// ----------------------------------------------------------------------
// BoomBoxKlass
// ----------------------------------------------------------------------
// new BoomBoxKlass(
//   'File Path For MP3 or MP4',
//   'BoomBox'
// );
// ----------------------------------------------------------------------
/**
 * @classdesc BoomBox Class
 * @param {string}  soundSrc         - 音源のファイルパス
 * @param {string}  bindName         - BoomBox内でのネーミングスペース名
 * @param {boolean} instantReplayFlg - 読み込み後即時無限再生するか否か
 * @prop  {object}  soundInstance    - BoomBoxの内部インスタンス
 * @prop  {boolean} pausedFlg        - 一時停止しているか否か
 * @prop  {boolean} loadedFlg        - 音源が読み込み完了しているか否か
 * @constructor
 */
var BoomBoxKlass = function(soundSrc, bindName, instantReplayFlg){
  var self = this;
  self.src = soundSrc;
  self.bindName = bindName;
  self.instantReplayFlg = instantReplayFlg;
  self.soundInstance = null;
  self.pausedFlg = false;
  self.loadedFlg = false;
  if(window.boombox){
    boombox.setup(
      {
        webaudio : {
          use : false
        },
        htmlaudio : {
          use : true
        },
        htmlvideo : {
          use : true
        }
      }
    ).load(
      bindName,
      {
        src : [
          {
            path  : self.src,
            media : (function(){
              if(/.mp3/.exec(self.src)){
                return 'audio/mpeg';
              }
              if(/.mp4/.exec(self.src)){
                return 'audio/mp4';
              }
            })()
          }
        ]
      },
      function(err){
        if(err){
          // self.loadedFlg = false;
          console.error('=== boombox - ' + self.bindName + ' : LOADING ERROR ===');
        }else{
          self.loadedFlg = true;
          self.soundInstance = boombox.get(self.bindName);
          // ToDo - Refine
          self.soundInstance.volume(1);
          console.info('=== boombox - ' + self.bindName + ' : LOADED ===');
          console.info('=== boombox - Instant Replay Flg : ' + self.instantReplayFlg);
          if(self.instantReplayFlg){
            self.soundInstance.setLoop(boombox.LOOP_ORIGINAL);
            self.soundInstance.play();
          }
        }
      }
    );
  }else{
    self = {
      getSelf : function(){},
      play    : function(){},
      stop    : function(){}
    }
  }
  return self;
};
BoomBoxKlass.prototype = {
  /**
   * 自己参照
   * @method
   * @protected
   * @return {object} 自分自身
   */
  getSelf : function(){
    return this;
  },
  /**
   * 再生
   * @method
   * @public
   * @param {boolean} loopFlg - 繰り返し再生するか否か
   * @return {null}
   */
  play : function(loopFlg){
    var self = this.getSelf();
    if(self.loadedFlg){
      if(loopFlg){
        console.info('=== boombox - ' + self.bindName + ' : LOOP [ON] ===');
        self.soundInstance.setLoop(boombox.LOOP_NATIVE);
      }else{
        console.info('=== boombox - ' + self.bindName + ' : LOOP [OFF] ===');
      }
      self.soundInstance.power(boombox.POWER_ON);
      if(self.pausedFlg){
        self.soundInstance.resume();
        self.pausedFlg = false;
      }else{
        self.soundInstance.play();
      }
      console.info('=== boombox - ' + self.bindName + ' : PLAYED ===');
    }
  },
  /**
   * 再生（終了検知）
   * @method
   * @public
   * @param {function} callBack - 再生終了後のコールバック関数
   * @return {null}
   */
  playWithAction : function(callBack){
    var self = this.getSelf();
    if(self.loadedFlg){
      self.soundInstance.power(boombox.POWER_ON);
      self.soundInstance.stop();
      self.soundInstance.play();
      self.soundInstance.onEnded = function(){
        callBack();
        self.soundInstance.power(boombox.POWER_OFF);
        self.soundInstance.stop();
      }
    }else{
      callBack();
    }
  },
  /**
   * 一時停止
   * @method
   * @public
   * @return {null}
   */
  pause : function(){
    var self = this.getSelf();
    if(self.loadedFlg){
      self.soundInstance.pause();
      self.soundInstance.power(boombox.POWER_OFF);
      self.pausedFlg = true;
      console.info('=== boombox - ' + self.bindName + ' : PAUSED ===');
    }
  },
  /**
   * 停止
   * @method
   * @public
   * @return {null}
   */
  stop : function(){
    var self = this.getSelf();
    if(self.loadedFlg){
      self.soundInstance.stop();
      console.info('=== boombox - ' + self.bindName + ' : STOPPED ===');
    }
  }
};
module.exports = BoomBoxKlass;