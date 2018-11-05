// pages/playList/playList.js

const request = require('../../utils/request')
const configs = require('../../utils/config')
let { musicMigu } = configs
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listHeadData:null,
    contentListData:null,
    musicSrc:'',
    idSelect:'',
    isShowPlayPauseBtn:''
  },

  getListHeadData(options) {
    console.log(options)
    request({
      url: musicMigu + 'migu/remoting/cms_album_detail_tag',
      data: {
        albumId: options.albumId
      },
      success: (res) => {
        console.log('我是ListHeadData', res)
        this.setData({
          listHeadData: res.data.data
        })
        wx.hideNavigationBarLoading()
      }
    })
  },

  getContentListData(options){
    request({
      url: musicMigu + 'migu/remoting/cms_album_song_list_tag',
      data: {
        albumId: options.albumId
      },
      success: (res) => {
        console.log("我是ContentListData", res.data.result.results)
        this.setData({
          contentListData: res.data.result.results
        })
      }
    })
  },

  loadingTotal(options){
    wx.showNavigationBarLoading()
    this.getListHeadData(options)
    this.getContentListData(options)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      albumId: options.albumId
    })
    this.loadingTotal(options)

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
  },

  playBtn(e){
    console.log(e)
    this.setData({
      isShowPlayPauseBtn: e.currentTarget.id
    })
    innerAudioContext.src = e.currentTarget.dataset.src
    innerAudioContext.play()
  },

  pauseBtn(){
    innerAudioContext.pause()
    this.setData({
      isShowPlayPauseBtn:''
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})