// pages/ranking/ranking.js

const request = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songListSel:[
      { id: 1, title: '伤感' },
      { id: 2, title: '华语' },
      { id: 3, title: '流行' },
      { id: 4, title: '影视热歌'}
    ],
    TNData:[],
    NewData: [],
    isTjNew:false
  },
  

  getTNData() {//获取数据的方法
    request({
      url: 'http://m.music.migu.cn/migu/remoting/playlist_bycolumnid_tag',
      data: {
        playListType: 2,
        type: 1,
        columnId: 15127315,
        startIndex: 0,
        tagId: ''
      },
      success: (res) => {
        console.log(res.data.retMsg.playlist)
        this.setData({
          TNData: res.data.retMsg.playlist
        })
        wx.showToast({
          title: '加载完成',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },


  getNewData() {//获取数据的方法
    request({
      url: 'http://m.music.migu.cn/migu/remoting/playlist_bycolumnid_tag',
      data: {
        playListType: 2,
        type: 1,
        columnId: 15127272,
        startIndex: 0,
        tagId: ''
      },
      success: (res) => {
        console.log('我是newData',res.data.retMsg.playlist)
        this.setData({
          NewData: res.data.retMsg.playlist
        })
      }
    })
  },

  TShowHid(){
    this.setData({
      isTjNew: false
    })
  },

  NShowHid() {
    this.setData({
      isTjNew: true
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTNData()
    this.getNewData()
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