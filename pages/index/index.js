// pages/index/index.js
const app=getApp();
const appdata = app.globalData;
const url = appdata.app_address + appdata.subDomain;
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
    discounts:null,
    goodsList:null,
    notice:null,
  },
  // 点击衣服种类导航 
  changeCategrory:function(e){
    var that=this;
    let categoryId= e.currentTarget.id;
    this.setData({
      navOn: e.currentTarget.id
    })
    wx.request({
      url: url + '/shop/goods/list',
      data: { categoryId: categoryId},
      success:function(res){
        // that.setData({
        //   goodsList: null
        // })
        if (res.data.code==0){
          console.log(222);
          that.setData({
            goodsList: res.data.data
          })
        }else{
          that.setData({
            goodsList:null
          })
        }
      }
    })
  },
  getDiscount:function(e){
    console.log(e.currentTarget.id)
  },
  goShopDetail:function(e){
    console.log(e.currentTarget.id)
  },
  goNoticeDeTail:function(e){
    console.log(e.currentTarget.id)
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
    // 获取优惠券
    wx.request({
      url: url +'/discounts/coupons',
      success:function(res){
       that.setData({
         discounts: res.data.data
       })
      }
    })
  // 获取商品列表
  wx.request({
    url: url +'/shop/goods/list',
    success:function(res){
      console.log(res);
      that.setData({
        goodsList:res.data.data
      })
    }
  })
  // 获取公告列表
  wx.request({
    url: url +'//notice/list',
    success:function(res){
      console.log(res);
      if(res.data.code==0){
        that.setData({
          notice: res.data.data.dataList
        })
      }
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