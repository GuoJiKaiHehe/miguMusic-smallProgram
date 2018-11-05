// pages/index/components/newSongExpress/newSongExpress.js
const innerAudioContext = wx.createInnerAudioContext();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newSongExpressData:Object
  },

  /**
   * 组件的初始数据
   */
  
  data: {
    isSelect:''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //开始播放
    playBtm(e){
      console.log(e.currentTarget.dataset.musicurl)
      innerAudioContext.src = e.currentTarget.dataset.musicurl
      innerAudioContext.play()
      setTimeout(()=>{
        this.setData({
          isSelect: e.currentTarget.id
        })
      },100)
      
    },
    //停止播放
    pauseBtn(){
      this.setData({
        isSelect: ''
      })
      innerAudioContext.pause();
    }
  },

  ready: function(){
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })

    innerAudioContext.onStop(() => {
      console.log('停止播放')
      this.setData({
        isSelect: ''
      })
    })

    innerAudioContext.onEnded(() => {
      console.log('录音播放结束')
      this.setData({
        isSelect: ''
      })
    })

    innerAudioContext.onError((res) => {
      console.log("error errMsg" + res.errMsg)
      console.log("error errCode" + res.errCode)
    })

    innerAudioContext.onWaiting(() => {
      console.log("onWaiting")
    })

    innerAudioContext.onCanplay(() => {
      innerAudioContext.play()
      console.log("onCanplay")
    })
    
  }

})
