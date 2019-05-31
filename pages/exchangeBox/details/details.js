// pages/exchangeBox/details/details.js
const $common = require('../../../utils/common.js')
const $api = require('../../../utils/api.js')
const WxParse = require('../../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: $api.Cover,//图片拼接
    hig:'',
    IgId:'',
    list:{},
  },
  imgH(e) {
    let winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    let winHit = wx.getSystemInfoSync().windowHeight; //获取当前屏幕的高度
    let imgh = e.detail.height; //图片高度
    let imgw = e.detail.width;
    let swiperH = winWid * imgh / imgw + "px";
    //等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      hig: swiperH
    })
  },
  submit(){
    wx.navigateTo({
      url: '../placeOrder/placeOrder?IgId=' + this.data.list.IgId,
    })
  },
  giftInfo() {
    $common.loading()
    $common.request($api.giftInfo, {
      IgId: this.data.IgId
    }).then(res => {
      if (res.data.res) {

        $common.hide()
        this.setData({
          list: res.data.Data
        })
        WxParse.wxParse('article', 'html', res.data.Data.IgContent, this, 5);
        wx.stopPullDownRefresh()
        // console.log(this.data.list)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   /*** const that = this;  WxParse.wxParse(bindName , type, data, target,imagePadding)
* 1.bindName绑定的数据名(必填)
* 2.type可以为html或者md(必填)
* 3.data为传入的具体数据(必填)
* 4.target为Page对象,一般为this(必填)
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)*/
    // var temp = WxParse.wxParse('article', 'html', data, that, 5);
    this.setData({
      IgId: options.IgId
    })
    this.giftInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.giftInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})