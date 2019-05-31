// pages/tabBar/gallery/gallery.js
const $common=require('../../../utils/common.js')
const $api=require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Cover:$api.Cover,
    imglist:[],
    videolist:[]
  },
  clicknav(e){
    let id=e.currentTarget.dataset.id
    let IvcId = e.currentTarget.dataset.ivcid
    wx.navigateTo({
      url: `../List/List?id=${id}&IvcId=${IvcId}`,
    })
  },
  FileCategoryList(){
    $common.loading()
    $common.request($api.FileCategoryList,{
    }).then(res=>{
      if (res.data.res) {
        $common.hide()
        this.setData({
          imglist: res.data.ImgCategoryList,
          videolist: res.data.VideoCategoryList
      })
        wx.stopPullDownRefresh()
      }
    })
  },
  //用户头像昵称
  PutUserInfo(){
    // 【OpenId】【NickName】【AvaUrl】
    $common.request($api.PutUserInfo,{
      OpenId:wx.getStorageSync('openid'),
      NickName: wx.getStorageSync('userInfo').nickName,
      AvaUrl: wx.getStorageSync('userInfo').avatarUrl,
    }).then(res=>{
      if(res.data.res){
        wx.setStorageSync('use', res.data.res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $common.getOpenId().then(res=>{
      this.PutUserInfo()
      this.FileCategoryList()
    })
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
    // this.data.imglist=[]
    // this.data.videolist=[]
    this.FileCategoryList()
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