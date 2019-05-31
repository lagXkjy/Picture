// pages/myBox/Orderdetails/Orderdetails.js
const $common = require('../../../utils/common.js')
const $api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: $api.Cover,//图片拼接
    Oid:'',//订单id
    list:{},
  },
  GetOrderInfo() {
    // 参数：【OpenId】【page】【pagesize】【seaK】搜索字段
    // 错误提示：【errType = 1  参数不正确】【errType = 2  用户不存在】
    this.data.page++
    $common.request($api.GetOrderInfo, {
      Oid:this.data.Oid
    }).then(res => {
      if (res.data.res) {
        let list = res.data.OrderInfo
        list.IgoPurchaseTime=$common.timeStamp(list.IgoPurchaseTime).showTime;
        this.setData({
          list
        })

        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Oid:options.Oid
    })
    this.GetOrderInfo()
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
    this.GetOrderInfo()
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