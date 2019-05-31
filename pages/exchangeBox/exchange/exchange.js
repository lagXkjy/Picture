// pages/exchangeBox/exchange/exchange.js
const $common = require('../../../utils/common.js')
const $api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    pagesize: 10,
    images: $api.Cover,//图片拼接
    list:[]
  },
details(e){
  let IgId=e.currentTarget.dataset.igid
  wx.navigateTo({
    url: '../details/details?IgId=' + IgId,
  })
},
  giftList(){
    this.data.page++
    $common.loading()
    $common.request($api.giftList,{
      page:this.data.page,
      Pagesize:this.data.pagesize
    }).then(res=>{
      if(res.data.res){
        $common.hide()
        let list = this.data.list
        list = this.data.list.concat(res.data.Data);
        this.setData({
          list: res.data.Data
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.giftList()
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
    this.data.page = 0;
    this.giftList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.giftList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})