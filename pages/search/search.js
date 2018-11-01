// pages/search/search.js

let request = require('../../utils/request')
let configs = require('../../utils/config')
let { musicMigu } = configs


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearchData:[],
    isHostSearch: false,
    searchResult: null,
    value:''
  },

  getHotSearchData(){
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        pageSize: 10,
        nid: 24041523,
        pageNo: 0,
        type: 2005
      },
      success: (res) => {
        console.log("我是hotSearchData", res.data.result.results)
        this.setData({
          hotSearchData: res.data.result.results
        })
      }
    })
  },
  
  onSearch(e){
    console.log(e)
    // this.setData({
    //   value:'123'
    // })
  },

  search(e){
    var viewText = e.target.dataset.text; 
    this.setData({
      value: viewText,
      isHostSearch:true
    })
    
    wx.request({
      url: musicMigu + 'v3/search',
      data: {
        keyword: viewText
      },
      success: (res) => {
        console.log(res)
        this.setData({
          searchResult: res
        })
      }
    })
    console.log(viewText); //输出该文本
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotSearchData()
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
    this.getHotSearchData()
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