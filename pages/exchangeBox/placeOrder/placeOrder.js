// pages/seevisit/seevisit.jsconst $common = require('../../../utils/common.js');
const $common = require('../../../utils/common.js')
const $api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: $api.Cover,//图片拼接
    region: [], //所在地区
    customItem: '',
    phonenumber: '', //手机号
    Name: '', //收货人
    area: '',//详细地址
    focus: {},
    IgId:'',//商品id
    list:{},//详情
    detailes:'',//信息
  },
  //省份
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  //行业
  visit(e) {
    this.setData({
      visit: e.detail.value,
    })
  },
  //客户类别
  plan(e) {
    this.setData({
      plan: e.detail.value
    })
  },
  toast(str) {
    $common.showToast(str)
  },
  getFocus(key) { //使其主动获得焦点
    let {
      focus
    } = this.data
    if (!focus[key]) focus[key] = false
    let keys = `focus.${key}`
    this.setData({
      [keys]: true
    })
  },
  Submission(data) { //判断所填信息是否完善
    let t = $common.trim(data)
    switch (false) {
      case t('Name'):
        return (this.getFocus('Name'), this.toast('请填写收货人'));
        break
      case t('phonenumber'):
        return (this.getFocus('phonenumber'), this.toast('请填写手机号'));
        break
      case t('area'):
        return (this.getFocus('area'), this.toast('请填写详细地址'));
        break
      default:
        return true
    }
  },
  submit(e) {
    let data = e.detail.value
    let { IgId, Name, phonenumber, region, area, } = this.data
    if (region.length < 1) return this.toast('请选择所在地区');
    if (!this.Submission(data)) return
    if (!$api.phoneReg.test(data.phonenumber)) {
      return this.toast('手机号有误');
      }

    $common.loading()
  //     参数：【OpenId】【IgId】礼品ID【Consignee】联系人【Phone】电话号码【Region】地区（省市区）【Address】详细地址
  //   错误提示：【errType = 1  参数不正确】【errType = 2  用户不存在】【errType = 3  商品不存在】【errType = 4   商品已下架】【errType = 5  积分不够】【errType = -1  添加订单失败】
      $common.request($api.PutGiftOrder,{
        OpenId: wx.getStorageSync('openid'),
        IgId: IgId,
        Consignee: data.Name,
        Phone: data.phonenumber,
        Region: region[0] + region[1] + region[2],
        Address: data.area
      }).then(res=>{
        if(res.data.res){
          $common.hide()
          this.toast('兑换成功')
          let detailes={
            Consignee: data.Name,
            Phone: data.phonenumber,
            Region0: region[0],
            Region1: region[1],
            Region2: region[2],
            Address: data.area
          }
          wx.setStorageSync('detailes', detailes)
          setTimeout(function () {
            wx.redirectTo({
              url: './../../myBox/exchange/exchange',
            })
          }, 500);
          
        }else{
          if (res.data.errType==1){
            this.toast('参数不正确')
          } else if (res.data.errType == 2){
            this.toast('用户不存在')
          } else if (res.data.errType == 3) {
            this.toast('商品不存在')
          } else if (res.data.errType == 4) {
            this.toast('商品已下架')
          } else if (res.data.errType == 5) {
            this.toast('积分不够')
          } else if (res.data.errType == -1) {
            this.toast('添加订单失败')
          } else {
            this.toast('兑换失败')
          }         
        }
      })
  },
  //获取详情
  giftInfo() {
    $common.request($api.giftInfo, {
      IgId: this.data.IgId
    }).then(res => {
      if (res.data.res) {
        this.setData({
          list: res.data.Data
        })
        // console.log(this.data.list)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let detailes = wx.getStorageSync('detailes')
    this.setData({
      IgId: options.IgId,
      Name: detailes.Consignee,
      region: [detailes.Region0, detailes.Region1, detailes.Region2],
      phonenumber: detailes.Phone,
      area: detailes.Address
    })
    this.giftInfo()
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