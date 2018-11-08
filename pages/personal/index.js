// pages/personal/index.js
const app = getApp();
const appdata = app.globalData;
const url = appdata.app_address + appdata.subDomain;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goqiandao:function(e){
    console.log(e.detail.formId)
   wx.request({
     url: url +'/template-msg/put',
     data:{
       token:wx.getStorageSync('token'),
       type:0,
       module:'immediately',
       template_id:'ll1m0tXwx1Y7Uxg_X7_YrtPOk06PsxLoV4jhiFt8xRo',
       form_id: e.detail.formId,
       url:'pages/personal/index',
       postJsonString:{
         "keyword1": {
           "value": "李金城",
           "color": "#173177"
         },
         "keyword2": {
           "value": "2015年01月05日 12:30",
           "color": "#173177"
         },
         "keyword3": {
           "value": "粤海喜来登酒店",
           "color": "#173177"
         },
         "keyword4": {
           "value": "2017-11-12 12:00",
           "color": "#173177"
         },
         "keyword5": {
           "value": "感谢您的参加",
           "color": "#173177"
         },
         "keyword6": {
           "value": "13366659939",
           "color": "#173177"
         }
       }
     },success:function(res){
       console.log(res);
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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