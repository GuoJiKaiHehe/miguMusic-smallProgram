// pages/ranking/ranking.js

const request = require('../../utils/request')
const configs = require('../../utils/config')
let { musicMigu } = configs
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
    isTjNew:false,
    isHasMore:false,
    startIndex:0,
    overIndex: 30
  },
  

  getTNData() {//获取数据的方法
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
        columnId: 15127315,
        startIndex: startIndex,
        tagId: ''
      },
      success: res => {
        console.log("我是TNData",res.data.retMsg.playlist)
        let TNData = this.data.TNData.concat(res.data.retMsg.playlist)
        this.setData({
          TNData: TNData
        })
        this.data.startIndex += 10
        wx.hideNavigationBarLoading()
      }
    })
  },

  getNewData() {//获取数据的方法
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
        columnId: 15127272,
        startIndex: startIndex,
        tagId: ''
      },
      success: res => {
        console.log("我是TNData", res.data.retMsg.playlist)
        let NewData = this.data.NewData.concat(res.data.retMsg.playlist)
        this.setData({
          NewData: NewData
        })
        this.data.startIndex += 10
        wx.hideNavigationBarLoading()
      }
    })
  },


  // getNewData() {//获取数据的方法
  //   request({
  //     url: musicMigu + 'migu/remoting/playlist_bycolumnid_tag',
  //     data: {
  //       playListType: 2,
  //       type: 1,
  //       columnId: 15127272,
  //       startIndex: 0,
  //       tagId: ''
  //     },
  //     success: (res) => {
  //       console.log('我是newData',res.data.retMsg.playlist)
  //       this.setData({
  //         NewData: res.data.retMsg.playlist
  //       })
  //     }
  //   })
  // },

  TShowHid(){
    this.setData({
      isTjNew: false,
      isHasMore: false,
      startIndex: 0,
      TNData: []
    })
    this.getTNData()
  },

  NShowHid() {
    this.setData({
      isTjNew: true,
      isHasMore: false,
      startIndex:0,
      NewData:[]
    })
    this.getNewData()
  },


  loadingTotal(){
    this.getTNData()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadingTotal()
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
    console.log('666')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.isTjNew ? setTimeout(()=>{
      this.getNewData()
    }, 500) : setTimeout(() => {
        this.loadingTotal()
    }, 500)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})