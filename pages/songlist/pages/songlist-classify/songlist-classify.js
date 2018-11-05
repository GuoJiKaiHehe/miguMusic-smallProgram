// pages/songlist/pages/伤感.js

const request = require('../../../../utils/request')
const configs = require('../../../../utils/config')
let { musicMigu } = configs
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TNData:[],
    isHasMore: false,
    startIndex: 0,
    overIndex: 30,
    tagId:'',
    title:''
  },

  getShangGanData(options) {//获取数据的方法
    wx.showNavigationBarLoading()
    let { startIndex, overIndex } = this.data
    if (overIndex - startIndex <= 0) {
      this.setData({
        isHasMore: true
      })
      wx.hideNavigationBarLoading()
      return false
    }
    request({
      url: musicMigu + 'migu/remoting/playlist_bycolumnid_tag',
      data: {
        playListType: 2,
        type: 1,
        columnId:'',
        tagId: this.data.tagId,
        startIndex: startIndex
      },
      success: res => {
        console.log("我是TNData", res.data.retMsg.playlist)
        let TNData = this.data.TNData.concat(res.data.retMsg.playlist)
        this.setData({
          TNData: TNData
        })
        this.data.startIndex += 10
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      tagId: options.tagId,
      title: options.title
    })
    this.getShangGanData(options)
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
    wx.setNavigationBarTitle({
      title: this.data.title
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
    this.getShangGanData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})