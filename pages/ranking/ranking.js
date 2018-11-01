// pages/ranking/ranking.js
const request = require('../../utils/request')
const configs = require('../../utils/config')
let { musicMigu } = configs
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MiGuLeBangData:null,
    MGGFBDataA: null,
    MGGFBDataB: null,
    MGGFBDataC: null,
    MGGFBDataD: null,
    MGGFBDataE: null,
    MGGFBDataF: null
  },

  getMiGuLeBangData() {//获取数据的方法
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        nid: 23603695,
        type: 2011,
        pageNo: 0,
        pageSize: 1
      },
      success: (res) => {
        this.setData({
          MiGuLeBangData: res.data.result.results
        })
      }
    })
  },

  getMGGFBDataA() {//获取数据的方法
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        nid: 23603703,
        pageSize: 3,
        pageNo: 0
      },
      success: (res) => {
        let result = res.data.result.results
        let { results } = res.data.result
        let MGGFBDataA = [{ id: 1, imgUrl: 'http://m.music.migu.cn/migu/fs/media/p/154/359/11447/image/20180816/1344396.jpg', res: results}
        ]
        this.setData({
          MGGFBDataA: MGGFBDataA
        })
        
      }
    })
  },

  getMGGFBDataB() {//获取数据的方法
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        nid: 23603721,
        pageSize: 3,
        pageNo: 0
      },
      success: (res) => {
        let result = res.data.result.results
        let { results } = res.data.result
        let MGGFBDataB = [{ id: 1, imgUrl: 'http://m.music.migu.cn/migu/fs/media/p/154/359/11447/image/20180816/1344397.jpg', res: results }]
        this.setData({
          MGGFBDataB: MGGFBDataB
        })
      }
    })
  },
  getMGGFBDataC() {//获取数据的方法
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        nid: 23603926,
        pageSize: 3,
        pageNo: 0
      },
      success: (res) => {
        let result = res.data.result.results
        let { results } = res.data.result
        let MGGFBDataC = [{ id: 1, imgUrl: 'http://m.music.migu.cn/migu/fs/media/p/154/359/11447/image/20180816/1344390.jpg', res: results }]
        this.setData({
          MGGFBDataC: MGGFBDataC
        })
      }
    })
  },
  getMGGFBDataD() {//获取数据的方法
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        nid: 23603954,
        pageSize: 3,
        pageNo: 0
      },
      success: (res) => {
        let result = res.data.result.results
        let { results } = res.data.result
        let MGGFBDataD = [{ id: 1, imgUrl: 'http://m.music.migu.cn/migu/fs/media/p/154/359/11447/image/20180816/1344389.jpg', res: results }]
        this.setData({
          MGGFBDataD: MGGFBDataD
        })
      }
    })
  },
  getMGGFBDataE() {//获取数据的方法
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        nid: 23603974,
        pageSize: 3,
        pageNo: 0
      },
      success: (res) => {
        let result = res.data.result.results
        let { results } = res.data.result
        let MGGFBDataE = [{ id: 1, imgUrl: 'http://m.music.migu.cn/migu/fs/media/p/154/359/11447/image/20180816/1344391.jpg', res: results }]
        this.setData({
          MGGFBDataE: MGGFBDataE
        })
      }
    })
  },
  getMGGFBDataF() {//获取数据的方法
    request({
      url: musicMigu + 'migu/remoting/cms_list_tag',
      data: {
        nid: 23603982,
        pageSize: 3,
        pageNo: 0
      },
      success: (res) => {
        console.log(res.data.result)
        let result = res.data.result.results
        let { results } = res.data.result
        let MGGFBDataF = [{ id: 1, imgUrl: 'http://m.music.migu.cn/migu/fs/media/p/154/359/11447/image/20180816/1344392.jpg', res: results }]
        this.setData({
          MGGFBDataF: MGGFBDataF
        })
      }
    })
  },

  loadingAll(){
    this.getMiGuLeBangData()
    this.getMGGFBDataA()
    this.getMGGFBDataB()
    this.getMGGFBDataC()
    this.getMGGFBDataD()
    this.getMGGFBDataE()
    this.getMGGFBDataF()
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadingAll()
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
    this.loadingAll()
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