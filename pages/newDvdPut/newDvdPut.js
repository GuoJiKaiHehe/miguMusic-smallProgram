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
    this.getListHeadData(options)
    this.getContentListData(options)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadingTotal(options)
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