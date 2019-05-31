// pages/seevisit/seevisit.jsconst $common = require('../../../utils/common.js');
const $common = require('../../../utils/common.js')
const $api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: $api.video,//视频拼接
    images: $api.images,//图片拼接
    focus: {},
    Name: '', //客户名称
    address: '', //品牌
    Model:'',//机型
    visits: ['矿业(不包括石油和天然气) - 2121',
      '天然气输配 - 2212',
      '石油化工和煤化工 - 3241',
      '其他化工(化学原料， 化学制品等) - 3251',
      '钢铁 - 3311',
      '铝和氧化铝冶炼 - 3313',
      '其它金属(如铜， 铅， 锌等)冶炼 - 3314',
      '电厂(不包括核电) - 2211',
      '核电 - 221113',
      '污水处理 - 2213',
      '食品和饮料制造业 - 3121',
      '烟草加工 - 3122',
      '药品和医药制造业 - 3254',
      '纺织化纤 - 3131',
      '造纸业 - 3221',
      '空分 - 32512',
      '玻璃制品制造业 - 3272',
      '水泥 - 3273',
      '机械制造业(工程机械和工业机械) - 3332',
      '电子(电子元器件， 液晶屏，组件等) - 3344',
      '电器和电气设备(电器设备，家用电器等) - 3353 ',
      '塑料和橡胶(包括轮胎) - 3262',
      '汽车 - 3361',
      '火车和飞机 - 3365',
      '造船 - 3366',
      '船用 - 336611',
      '工程 / 总包公司 - 2381',
      '建筑 - 23',
      '住宅建筑 - 2361',
      '非住宅建筑 - 2362',
      '重工业和土木工程建筑 - 237',
      '施工建筑 - 236',
      '农业,林业,渔业和狩猎业 - 11',
      '农具制造业 - 33311',
      '管道输送 - 486',
      '教育机构 - 611',
      '批发贸易 - 42',
      '机械,设备,用品批发商 - 4238',
      '燃料经销商 - 45431',
      '仓储 - 493',
      '房地产 - 531',
      '租用租凭服务 - 532',
      '租凭中心 - 5323',
      '建筑,交通,采矿,林业机械及设备租赁 - 53241',
      '建筑,工程和相关服务业 - 5413',
      '房地产租赁 - 53',
      '油气井钻探 - 213111',
      '公共事业设备 - 221',
      '汽车维修和保养 - 8111',
      '其他专业,科学及技术服务 - 541990',
      '公共管理 - 92'
    ], //行业 
    visit: '',
    imageList: [], //图片列表
    imageMaxNum: 5, //图片最大数量
    VideoList: [], //视频列表
    VideoMaxnum: 5,
    play: 1, //视频播放
    videosrc: '', //视频路径
  },
  //行业
  visit(e) {
    this.setData({
      visit: e.detail.value,
    })
  },
  addImage() { //选择添加图片
    let { imageMaxNum, imageList } = this.data
    $common.chooseImage(imageMaxNum - imageList.length)
      .then(res => {
        console.log(res)
        $common.loading('上传中...')
        let imageList = this.data.imageList
        let tempFilePaths = res.tempFilePaths
        return Promise.all(tempFilePaths.map(item => $common.uploadImage(item))).then(res => {
          // let img=[]
          for (let i = 0; i < res.length; i++) {
            imageList.push(JSON.parse(res[i].data).msg)
          }
          this.setData({
            imageList
          })
        })
      })
      .then(res => {
        $common.hide()
      })
  },
  deleteImage(e) {
    let img = [];
    for (let i = 0; i < this.data.imageList.length; i++) {
      img.push(this.data.images + this.data.imageList[i])
    }
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: img // 需要预览的图片http链接列表
    })
  },
  addvalue() { //选择添加视频
    let {
      VideoMaxnum,
      VideoList
    } = this.data
    $common.chooseVideo(VideoMaxnum - VideoList.length)
      .then(res => {
        $common.loading('上传中...')
        let VideoList = this.data.VideoList
        let tempFilePath = res.tempFilePath
        // VideoList.push(tempFilePath)
        // this.setData({
        //   VideoList
        // })
        return $common.uploadVideo(res.tempFilePath).then(res => {
          // console.log(JSON.parse(res.data).msg)
          VideoList.push(JSON.parse(res.data).msg)
          this.setData({
            VideoList
          })
          console.log(this.data.VideoList)
        })
      })
      .then(res => {
        $common.hide()
      })
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
  test(num) {
    return (num) => (!(/(^[1-9]\d*$)/.test(num)))
  },
  Submission(data) { //判断所填信息是否完善

    let t = $common.trim(data)
    switch (false) {
      case t('visit'):
        return this.toast('请选择行业');
        break
      case t('Name'):
        return (this.getFocus('Name'), this.toast('请完善客户名称'));
        break
      case t('address'):
        return (this.getFocus('address'), this.toast('请完善品牌名称'));
        break
      case t('Model'):
        return (this.getFocus('Model'), this.toast('请完善机型名称'));
        break
      default:
        return true
    }

  },
  //提交
  submit(e) {
    let data = e.detail.value
    let {
      Name,
      address,
      Model,
      imageList,
      VideoList,
      visits,
      visit
    } = this.data
    data.visit = visits[visit] || ''
    if (!this.Submission(data)) return
    if (imageList.length < 1 && VideoList.length < 1) return this.toast('请上传视频或图片')
    // 参数【OpenId】【LfeIndustry】行业【LfeCustomer】客户【LfeBrand】品牌【LfeImgs】图片，| 分割     【LfeVideo】视频 | 分割
    $common.request($api.PostShareInfo, {
      OpenId: wx.getStorageSync('openid'),
      LfeIndustry: visits[visit],
      LfeCustomer: data.Name,
      LfeBrand: data.address,
      LfeModel:data.Model,
      LfeImgs: imageList.join('|'),
      LfeVideo: VideoList.join('|'),
    }).then(res => {
      if (res.data.res) {
        $common.showToast('上传成功 积分+1')
        this.setData({
          Name:'',
          address:'',
          Model:'',
          imageList:'',
          VideoList:'',
          visit:''
        })
        setTimeout(function () {
          wx.navigateTo({
          url: './../../myBox/PassRecord/PassRecord',
        })
        }, 500);
        
      }
    })
  },
  Explain(){
    wx.navigateTo({
      url: '../Explain/Explain',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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