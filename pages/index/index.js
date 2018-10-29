//index.js
//获取应用实例
const request = require('../../utils/request')
const app = getApp()

Page({
  data: {
    slideImgUrlData:[],
    songListData:[],
    newSongExpressData:[],
    newDvdPutData:[],
    newSongProduceDataA: null,
    newSongProduceDataB: null,
    newSongProduceDataC: null,
    newSongProduceDataD: null,
    newSongProduceDataE: null,
    videoClData:[],
    
    isStopPlayA: true,
    isStopPlayB: true,
    isStopPlayC: true
  
  },
  getSlideData () {//获取数据的方法
    request({
      url: 'http://m.music.migu.cn/migu/remoting/cms_list_tag',
      data: {
        pageSize: 10,
        nid: 23831003,
        pageNo: 0,
        type: 2006
      },
      success: (res) => {
        console.log(res.data.result.results)
        this.setData({
          slideImgUrlData: res.data.result.results
        })
      }
    })
  },

  getSongList() {
    request({
      url: 'http://m.music.migu.cn/migu/remoting/cms_list_tag',
      data: {
        pageSize: 10,
        nid: 23853969,
        pageNo: 0,
        type: 2006
      },
      success: (res) => {
        console.log("我是songlist",res.data.result.results)
        this.setData({
          songListData: res.data.result.results
        })
      }
    })
  },
  newSongExpress() {
    request({
      url: 'http://m.music.migu.cn/migu/remoting/cms_list_tag',
      data: {
        pageSize: 3,
				nid: 23853978,
				pageNo: 0
      },
      success: (res) => {
        let results = res.data.result.results
        results[0].songData.audio = 'audioA'
        results[1].songData.audio = 'audioB'
        results[2].songData.audio = 'audioC'

        results[0].songData.isStopPlay = 'isStopPlayA'
        results[1].songData.isStopPlay = 'isStopPlayB'
        results[2].songData.isStopPlay = 'isStopPlayC'
        console.log("我是newSongExpress", results)
        this.setData({
          newSongExpressData: results
        })
      }
    })
  },
  newDvdPut() {
    request({
      url: 'http://m.music.migu.cn/migu/remoting/cms_list_tag',
      data: {
        pageSize: 10,
				nid: 23854016,
				pageNo: 0,
				type: 2003
      },
      success: (res) => {
        console.log("我是newDvdPut",res.data.result.results)
        let result = res.data.result.results.slice(0,3)
        this.setData({
          newDvdPutData: result
        })
      }
    })
  },
  newSongProduce() {
    request({
      url: 'http://m.music.migu.cn/migu/remoting/cms_list_tag',
      data: {
        pageSize: 10,
				nid: 23854063,
				pageNo: 0,
				type: 2006
      },
      success: (res) => {
        console.log("我是newSongProduce",res.data.result.results)
        let result = res.data.result.results
        let newSongProduceDataA = result.slice(0, 1)
        let newSongProduceDataB = result.slice(1, 2)
        let newSongProduceDataC = result.slice(2, 3)
        let newSongProduceDataD = result.slice(3, 4)
        let newSongProduceDataE = result.slice(4, 5)
        this.setData({
          newSongProduceDataA,
          newSongProduceDataB,
          newSongProduceDataC,
          newSongProduceDataD,
          newSongProduceDataE
        })
      }
    })
  },
  videoCl() {
    request({
      url: 'http://m.music.migu.cn/migu/remoting/cms_list_tag',
      data: {
        pageSize: 10,
				nid: 24034103,
				pageNo: 0,
				type: 2038
      },
      success: (res) => {
        console.log("我是videoCl",res.data.result.results)
        this.setData({
          videoClData: res.data.result.results
        })
      }
    })
  },

  onLoad: function () {
    this.getSlideData()
    this.getSongList()
    this.newSongExpress()
    this.newDvdPut()
    this.newSongProduce()
    this.videoCl()
  },

  onReady:function(){
    this.audioCtxA = wx.createAudioContext('audioA')
    this.audioCtxB = wx.createAudioContext('audioB')
    this.audioCtxC = wx.createAudioContext('audioC')
  },

  audioAPlay: function () {
    this.setData({
      isStopPlayA: false
    })
    this.audioCtxA.play()
  },
  audioAStop: function(){
    this.setData({
      isStopPlayA: true
    })
    this.audioCtxA.pause()
  },

  audioBPlay: function () {
    this.setData({
      isStopPlayA: false
    })
    this.audioCtxB.play()
  },
  audioBStop: function () {
    this.setData({
      isStopPlayA: true
    })
    this.audioCtxB.pause()
  },

  audioCPlay: function () {
    this.setData({
      isStopPlayA: false
    })
    this.audioCtxC.play()
  },
  audioCStop: function () {
    this.setData({
      isStopPlayA: true
    })
    this.audioCtxC.pause()
  },
  
  
  
  
  
  
  
  

})
