// pages/goods_detail/index.js
const app=getApp();
const appdata = app.globalData;
const url = appdata.app_address + appdata.subDomain;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration:1000,
    indicatorcolor:"#fff",
    indicatoractivecolor:"#f00",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    });
   var that=this;
   let goods_id=wx.getStorageSync('goods_id');
    wx.request({
      url: url + '/shop/goods/detail',
      data:{
        id:goods_id
      },
      success:function(res){
        console.log(res);
       that.setData({
         'detail':res
       });
        WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
      }
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
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    });
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
    return {
      title: appdata.shareshortTitle,
      path: '/pages/goods_detail/index',
      succss(res) {
        console.log(res.shareTickets[0])
      },
    }
   
  }
})