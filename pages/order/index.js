// pages/order/index.js
const app = getApp();
const appdata = app.globalData;
const url = appdata.app_address + appdata.subDomain;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      buyInfo:{},
      ishasdefaultaddress:false,
      defaultaddress:{},

  },
  // 添加地址
  add_address:function(e){
    wx.navigateTo({
      url: '/pages/address_add/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // var that=this;
      // // 获取购买信息
      // var buyInfo=wx.getStorage({
      //   key: 'buyinfo',
      //   success: function(res) {
      //     console.log(res.data.list.length)
      //     if (res.data.list.length>0){
      //       that.setData({
      //         buyInfo:res.data.list
      //       })
      //     }
      //   },
      // })
      // 检查用户是否存在地址
      // wx.request({
      //   url: url +'/user/shipping-address/list',
      //   data:{token:wx.getStorageSync('token')},
      //   success:function(res){
      //     if(res.data.code==700){
      //       wx.showModal({
      //         title: '提示',
      //         content: '请添加地址',
      //         showCancel:false
      //       })
      //     }
      //   }
      // })
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
    var that = this;
    // 获取购买信息
    var buyInfo = wx.getStorage({
      key: 'buyinfo',
      success: function (res) {
        console.log(res.data.list.length)
        if (res.data.list.length > 0) {
          that.setData({
            buyInfo: res.data.list
          })
        }
      },
    })
    // 检查用户是否存在地址
    wx.request({
      url: url + '/user/shipping-address/default',
      data: { token: wx.getStorageSync('token') },
      success: function (res) {
        if (res.data.code !=0) {
          wx.showModal({
            title: '错误',
            content: '请选择默认地址',
            showCancel: false
          })
        }else{
            var defaultaddress=res.data.data;
            that.setData({
              ishasdefaultaddress:true,
              defaultaddress:defaultaddress
            })
        }
      }
    })
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