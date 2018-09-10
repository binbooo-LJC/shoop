// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind:'加载中',
    userinfo:null,
  },
  jumpIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.setNavigationBarTitle({
     title: 'shopTest',
   })
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
   setTimeout(function(){
     that.setData({
       remind:''
     })
   },1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    let userinfo = wx.getStorageSync('user');
    if (userinfo) {
      _this.setData({
        userinfo: userinfo,
      })
    } else {
      wx.navigateTo({
        url: '/pages/autologin/index',
      })
    }
  },
})