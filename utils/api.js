const phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/ // 正则手机号码
const http = `footprint.1-zhao.fun`
const host = `https://${http}`
const video = `${host}/MultiMedia/video/`
const images = `${host}/MultiMedia/Images/`
const Cover = `${host}/MultiMedia/Cover/`
module.exports = {
  phoneReg,
  video,
  images,
  Cover,
  //保存或获取用户openID  参数【code】
  GetSaveUserOpenId: `${host}/ShareLtp/UserInfo/GetSaveUserOpenId`,
  //修改用户昵称，头像
  PutUserInfo: `${host}/ShareLtp/UserInfo/PutUserInfo`,
  //获取视频与图片分类列表
  FileCategoryList: `${host}/ShareLtp/PicturesVideos/FileCategoryList`,
  // 参数：【IvcId】分类ID【page】【pagesize】
  GetCategoryList: `${host}/ShareLtp/PicturesVideos/GetCategoryList`,
  //添加浏览记录//【OpenId】【IviId】
  PutFileRecord: `${host}/ShareLtp/PicturesVideos/PutFileRecord`,
  // 【添加分享记录】
  PostShareInfo: `${host}/ShareLtp/PicturesVideos/PostShareInfo`,
  //上传图片
  UpLoadImg: `${host}/FootprintLtp/SaleCustomer/UpLoadImg`,
  //上传视频
  UploadVideo: `${host}/FootprintLtp/SaleCustomer/UploadVideo`,
  // 获取积分礼品列表【page】【Pagesize】
  giftList: `${host}/ShareLtp/gift/giftList`,
  // 获取积分礼品详情【IgId】礼品ID
  giftInfo: `${host}/ShareLtp/gift/giftInfo`,
  //提交订单   
  PutGiftOrder: `${host}/ShareLtp/gift/PutGiftOrder`,
  //获取礼品兑换记录  
  GetOrderList: `${host}/ShareLtp/gift/GetOrderList`,
  // 获取礼品兑换记录详情
  GetOrderInfo: `${host}/ShareLtp/gift/GetOrderInfo`,
  // 获取用户上传的文件列表
  GetUserLoadFileList: `${host}/ShareLtp/PicturesVideos/GetUserLoadFileList`,
  // 获取用户信息
  GetUserInfo: `${host}/ShareLtp/UserInfo/GetUserInfo`,
  // 判断是否有下载权限
  GetUserLoadJurisdiction: `${host}/ShareLtp/UserInfo/GetUserLoadJurisdiction`,
}