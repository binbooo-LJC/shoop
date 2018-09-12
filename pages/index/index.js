// pages/index/index.js
const app=getApp();
const appdata = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay:true,
    indicatorDots:true,
    interval:2000,
    duration:500,
    imgUrls: null,
    categrory:null,
    navOn:0,
  },
  changeCategrory:function(e){
    this.setData({
      navOn: e.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取banner
    wx.request({
      url: appdata.app_address + appdata.subDomain + '/banner/list',
      success: function (res) {
        that.setData({
          imgUrls:res.data.data,
        })
      }
    })
    // 获取分类
    wx.request({
      url: appdata.app_address + appdata.subDomain +'/shop/goods/category/all',
      success:function(res){
        let categrory={id:0,name:'全部'}
        res.data.data.unshift(categrory);
        that.setData({
          categrory: res.data.data
        })
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