// pages/myBox/my/my.js
const $common = require('../../../utils/common.js')
const $api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { name: '我的上传记录', url: '../PassRecord/PassRecord' },
      { name: '礼品兑换记录', url: '../exchange/exchange' }
    ],
    listData:'',
  },
  listTap(e) {
    let url = e.target.dataset.url
    wx.navigateTo({
      url: url,
    })
  },
  GetUserInfo(){
    $common.request($api.GetUserInfo,{
      OpenId:wx.getStorageSync('openid')
    }).then(res=>{
      if(res.data.res){
        this.setData({
          listData: res.data.UserInfo
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
  // 参数：【OpenId】
  // 错误提示：【errType=1  参数不正确】【errType=2  用户不存在】
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetUserInfo()
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
    this.GetUserInfo()
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
    this.GetUserInfo()
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