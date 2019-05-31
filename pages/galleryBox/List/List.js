// pages/galleryBox/List/List.js
const $common = require('../../../utils/common.js')
const $api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserLoad:'',//是否有权限下载
    video: $api.video,//视频拼接
    images: $api.images,//图片拼接
    type: '',
    current: 0,
    hide: true,
    Hei: "", //这是swiper要动态设置的高度属性
    winHit: "", //屏幕高度
    imgurl: "", //下载图片路径
    idx: 0,
    Setting: true, //保存图片送授权
    IvcId:'',//图片id
    page:0,
    pagesize:30,
    list: [],
    videolist: [],
    model:'',//型号
    browsenum:'',//浏览次数
    totalCount:'',//总页数
    value:'',//搜索内容
  },
  //获取搜索内容
  inputTyping(e) {
    this.data.value = e.detail.value
  },
  //订单查询回车搜索
  secrch(e) {
    this.data.page = 0
    this.data.list = []
    this.GetCategoryList()
  },
  //滑动轮播
  swiperChange(e) {
    this.setData({
      idx: e.detail.current,
      model: this.data.list[e.detail.current].IviModel,
      browsenum: this.data.list[e.detail.current].RecordCount
    })
    this.browse(this.data.list[e.detail.current].IviId)
    console.log(e.detail.current)
    console.log(this.data.list.length)
    if (e.detail.current==this.data.list.length-1){
      this.GetCategoryList()
    }
  },
  //点击放大
  SeeImg(e) {
    console.log(e)
    let idx = e.currentTarget.dataset.id
    this.setData({
      hide: false,
      idx,
      model: this.data.list[idx].IviModel,
      browsenum: this.data.list[idx].RecordCount
    })
    this.browse(this.data.list[idx].IviId)
    if (idx == this.data.list.length - 1) {
      this.GetCategoryList()
    }
  },
  //添加浏览记录
  browse(IvcId){
    // 【OpenId】【IviId】视频 / 图片文件ID
    $common.request($api.PutFileRecord, {
      OpenId: wx.getStorageSync('openid'),
      IviId: IvcId,
    }).then(res => {
      if (res.data.res) {
        console.log(res)
      }
    })
  },
  //轮播的显示隐藏
  show() {
    this.setData({
      hide: true,
    })
  },
  //获取图片宽高
  imgH(e) {
    let winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    let winHit = wx.getSystemInfoSync().windowHeight; //获取当前屏幕的高度
    let imgh = e.detail.height; //图片高度
    let imgw = e.detail.width;
    let swiperH = winWid * imgh / imgw + "px";　　　　　　　
    //等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Hei: swiperH, //设置高度
      winHit: winHit + 'px',
    })
  },
  //保存图片到本地
  load() {
    let imgUrl=''
    let type = this.data.type
    if (type == '1') {
      imgUrl = this.data.images+this.data.list[this.data.idx].IviFileName; 
    } else {
      imgUrl = this.data.video + this.data.list[this.data.idx].IviFileName;
    }
    wx.downloadFile({ //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
      url: imgUrl,
      success: function(res) {
        // 下载成功后再保存到本地
        if (type == '1') {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath, //返回的临时文件路径，下载后的文件会存储到一个临时文件
            success: function(res) {
              wx.showToast({
                title: '成功保存到相册',
                icon: 'success'
              })
            }
          })
        } else {
          wx.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath, //返回的临时文件路径，下载后的文件会存储到一个临时文件
            success: function(res) {
              wx.showToast({
                title: '成功保存到相册',
                icon: 'success'
              })
            }
          })
        }
      }
    })
  },
  download(e) {
    let _this = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {
              console.log("授权成功");
              var imgUrl = _this.data.list[_this.data.idx];
              wx.downloadFile({ //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
                url: imgUrl,
                success: function(res) {
                  // 下载成功后再保存到本地
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath, //返回的临时文件路径，下载后的文件会存储到一个临时文件
                    success: function(res) {
                      wx.showToast({
                        title: '成功保存到相册',
                        icon: 'success'
                      })
                    }
                  })
                }
              })
            },
            fail() {
              console.log('失败')
              _this.setData({
                Setting: false
              })
            }
          })
        } else {
          _this.load()
        }

      },
    })
  },
  //拒绝后重新拉起授权
  handleSetting(e) {
    let that = this;
    // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '若不打开授权，则无法将图片保存在相册中！',
        showCancel: false
      })
      that.setData({
        saveImgBtnHidden: true,
        openSettingBtnHidden: false
      })
    } else {
      that.setData({
        Setting: true
      })
    }
  },
  //图片列表
    GetCategoryList() {
      $common.loading()
      this.data.page++
      // 【IvcId】分类ID【page】【pagesize】
      $common.request($api.GetCategoryList, {
        IvcId: this.data.IvcId,
        page: this.data.page,
        pagesize: this.data.pagesize,
        seaK:this.data.value,
      }).then(res => {
        if (res.data.res) {
          $common.hide()
          let list = this.data.list
          list = this.data.list.concat(res.data.CategoryList);
          this.setData({
            list,
            totalCount: res.data.totalCount
          })
          wx.stopPullDownRefresh()
        }
      })
    },
    //是否允许下载
  // 参数：【OpenId】
  // 错误提示：【errType=1  参数不正确】【errType=2  用户不存在】
  // 返回值：UserLoad   0：允许下载      1：禁止下载
  GetUserLoadJurisdiction(){
    $common.request($api.GetUserLoadJurisdiction, {
      OpenId:wx.getStorageSync('openid')
    }).then(res => {
      if(res.data.res){
        this.setData({
          UserLoad: res.data.UserLoad
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id == 2) {
      wx.setNavigationBarTitle({
        title: '视频'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '图片'
      })
    }
    let winHit = wx.getSystemInfoSync().windowHeight
    this.setData({
      type: options.id,
      IvcId: JSON.parse(options.IvcId),
      winHit: winHit + 'px'
    })
    this.GetCategoryList()
    this.GetUserLoadJurisdiction()
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
    this.data.page=0;
    this.data.list=[];
    this.GetCategoryList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.GetCategoryList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})