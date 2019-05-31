// pages/myBox/exchange/exchange.js
const $common = require('../../../utils/common.js')
const $api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: $api.Cover,//图片拼接
    page: 0,
    pagesize: 10,
    value:'',
    list:[]
  },
  //获取搜索内容
  inputTyping(e) {
    this.data.value = e.detail.value
  },
  //订单查询回车搜索
  secrch(e){
    this.data.page=0
    this.data.list=[]
    this.GetOrderList()
  },
  //获取列表
  GetOrderList(){
    $common.loading()
    // 参数：【OpenId】【page】【pagesize】【seaK】搜索字段
    // 错误提示：【errType = 1  参数不正确】【errType = 2  用户不存在】
    this.data.page++
    $common.request($api.GetOrderList,{
      OpenId:wx.getStorageSync('openid'),
      page:this.data.page,
      pagesize: this.data.pagesize,
      seaK:this.data.value
    }).then(res=>{
      if (res.data.res) {
        $common.hide()
        let list=this.data.list
        list = this.data.list.concat(res.data.DataInfo);
        this.setData({
          list
        })

        wx.stopPullDownRefresh()
      }else{
        if (res.data.errType==1){
          $common.showToast('参数不正确')
          } else if (res.data.errType == 2){
          $common.showToast('用户不存在')
          } else{
          $common.showToast('获取失败')
          } 
      }
    })
  },
  //跳转到订单详情页
  order(e){
    let Oid=e.currentTarget.dataset.oid
    wx.navigateTo({
      url: '../Orderdetails/Orderdetails?Oid='+Oid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetOrderList()
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
    this.GetOrderList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.GetOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})