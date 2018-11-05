// pages/ranking/pages/rank.js

const request = require('../../../../utils/request')
const configs = require('../../../../utils/config')
let { musicMigu } = configs
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weekMusicData:null,
    musicItemData:[],
    isShowPlayPauseId:'',
    nid:'',
    imgUrl:''
  },

  getWeekMusicData() {//获取数据的方法
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        nid: 23603695,
        type: 2011,
        pageNo: 0,
        pageSize: 1
      },
      success: (res) => {
        console.log("我是weekMusicData", res.data.result.results)
        this.setData({
          weekMusicData: res.data.result.results
        })
      }
    })
  },

  getMusicItemData() {//获取数据的方法
    wx.showNavigationBarLoading()
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        nid: this.data.nid,
        pageSize: 200,
        pageNo: 0
      },
      success: (res) => {
        console.log("我是musicItemData", res.data.result.results)
        this.setData({
          musicItemData: res.data.result.results
        })
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    if(options.imgUrl){
      this.setData({
        nid: options.nid,
        imgUrl: options.imgUrl
      })
    }else{
      this.setData({
        nid: options.nid
      })
    }

    switch (options.type) {
      case 'week':
        this.getWeekMusicData()
        this.getMusicItemData() 
        break;
      case 'music':
        this.getMusicItemData()
        break;
    }

    innerAudioContext.onPlay(()=>{
      console.log('开始播放')
    })
    
    innerAudioContext.onStop(() => {
      console.log('停止播放')
      this.setData({
        isShowPlayPauseId: ''
      })
    })

    innerAudioContext.onEnded(() => {
      console.log('录音播放结束')
      this.setData({
        isShowPlayPauseId:''
      })
      wx.removeStorage({ key: 'isShowPlayPauseId' })
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

  palyBtn(e){
    console.log(e)
    innerAudioContext.src = e.currentTarget.dataset.musicurl
    innerAudioContext.play()
    setTimeout(()=>{
      this.setData({
        isShowPlayPauseId: e.currentTarget.id
      })
    },100)
    wx.setStorage({
      key: 'isShowPlayPauseId',
      data: e.currentTarget.id,
    })
  },

  pauseBtn(){
    this.setData({
      isShowPlayPauseId: ''
    })
    innerAudioContext.pause()
    wx.removeStorage({key: 'isShowPlayPauseId'})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'isShowPlayPauseId',
      success: res =>{
        this.setData({
          isShowPlayPauseId: res.data
        })
      }
    })
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
    // innerAudioContext.destroy()
    innerAudioContext.pause()
    wx.removeStorage({ key: 'isShowPlayPauseId' })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('666')
    // wx.showNavigationBarLoading()
    // this.getWeekMusicData()
    // this.getMusicItemData()
    // wx.stopPullDownRefresh()  
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