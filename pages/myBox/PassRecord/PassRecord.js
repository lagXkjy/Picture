// pages/myBox/PassRecord/PassRecord.js
const $common = require('../../../utils/common.js')
const $api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    false:false,
    images: $api.images,//图片拼接
    video: $api.video,//图片拼接
    FileType: 1001,//图片或视频
    currentIndex:1,
    page: 0,
    pagesize: 15,
    play: 1, //视频播放
    videosrc: '', //视频路径
    list:[]
  },
  end() {
    this.setData({
      play: 1
    })
  },
  play(e) {
    this.setData({
      videosrc: e.target.dataset.src,
      play: 2
    })
  },
  previewImage(e){
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: [e.target.dataset.src]
    })
  },
  active(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.index == 1) {
      this.data.FileType = 1001
    } else {
      this.data.FileType = 1002
    }
    this.data.list=[]
    this.data.page=0;
    this.GetUserLoadFileList()
  },

// 参数：【OpenId】【page】【pagesize】【FileType   1001：图片列表     1002：视频列表】
//   错误提示：【errType=1  参数不正确】【errType=2  用户不存在】
  GetUserLoadFileList() {
    $common.loading()
    this.data.page++
    $common.request($api.GetUserLoadFileList, {
      OpenId: wx.getStorageSync('openid'),
      page:this.data.page,
      pagesize:this.data.pagesize,
      FileType: this.data.FileType
    }).then(res => {
      if (res.data.res) {
        $common.hide()
        let list = this.data.list
        list = this.data.list.concat(res.data.DataInfo);
        for (let i = 0, len = list.length; i < len; i++) {
          let data = list[i].LoadTime
          let date = $common.timeStamp(data).showTime;
          list[i].LoadTimes = date
        }
        this.setData({
          list
        })
        wx.stopPullDownRefresh()
      }else{
        if (res.data.errType == 1) {
          $common.showToast('参数不正确')
        } else if (res.data.errType == 2) {
          $common.showToast('用户不存在')
        } else {
          $common.showToast('获取失败')
        } 
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetUserLoadFileList()
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
    this.GetUserLoadFileList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.GetUserLoadFileList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})