// pages/playList/playList.js

const request = require('../../utils/request')
const configs = require('../../utils/config')
let { musicMigu } = configs

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeadData:null,
    contentListData:null,
    musicSrc:'',
    idSelect:''
  },

  getListHeadData(options) {
    request({
      url: musicMigu + 'migu/remoting/playlist_query_tag',
      data: {
        onLine: 1,
        queryChannel: 0,
        createUserId: '221acca8-9179 - 4ba7-ac3f - 2b0fdffed356',
        contentCountMin: 5,
        playListId: options.playListId
      },
      success: (res) => {
        console.log('我是ListHeadData', res.data.playlist)
        this.setData({
          listHeadData: res.data.playlist
        })
      }
    })
  },

  getContentListData(options){
    request({
      url: musicMigu + 'migu/remoting/playlistcontents_query_tag',
      data: {
        playListType: 2,
        playListId: options.playListId
      },
      success: (res) => {
        console.log("我是ContentListData",res.data.contentList)
        this.setData({
          contentListData: res.data.contentList
        })
      }
    })
  },

  loadingTotal(options){
    this.getListHeadData(options)
    this.getContentListData(options)
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.loadingTotal(options)
  },

  playBtn(e){
    
    console.log(e.target.id)
    this.setData({
      idSelect: e.target.id
    })
    this.audioCtx.pause()
    wx.showLoading({
      mask:true,
      title: '加载中...',
    })
    request({
      url: musicMigu + 'migu/remoting/cms_detail_tag',
      data: {
        pid: e.target.id
      },
      success: (res) => {
        console.log("我是musicData", res.data.data)
        let { listenUrl } = res.data.data
        this.setData({
          musicSrc: listenUrl
        })
        wx.hideLoading()
        this.audioCtx.play()
      }
    })
  },

  pauseBtn(){
    this.setData({
      idSelect: ''
    })
    this.audioCtx.pause()
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
    console.log('666')
    this.loadingTotal(options)
    wx.stopPullDownRefresh() 
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