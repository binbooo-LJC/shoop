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
    //  尺码规格是否显示
    isShowArrow:true,
    // 是否存在尺码规格
    isShowSelect:true,
    selectSize:'',
    // 购物车数量
    cartNum:0,
    selectprice:'',
    cartInfo:{},
  },
  changeSelectShow:function(e){
   this.setData({
     isShowSelect:false
   })
  },
  closeSelect:function(e){
    this.setData({
      isShowSelect: true
    })
  },
  sizeTap:function(e){
    var that=this;
    var child = that.data.detail.data.data.properties[e.currentTarget.dataset.propertyidx]['childsCurGoods'];
    for (var i = 0;i<child.length;i++){
      that.data.detail.data.data.properties[e.currentTarget.dataset.propertyidx]['childsCurGoods'][i].active=false;
    }
    that.data.detail.data.data.properties[e.currentTarget.dataset.propertyidx]['childsCurGoods'][e.currentTarget.dataset.properychildindex].active = true;
    var propertyLength = that.data.detail.data.data.properties;
    var hadSelectNum=0;
    var canSubmit=false;
    var selecttype='';
    for (var i = 0; i < propertyLength.length;i++){
      var childsCurGoods = propertyLength[i]['childsCurGoods'];
      for (var j = 0; j < childsCurGoods.length ; j++){
        if (childsCurGoods[j].active==true){
          hadSelectNum++;
          selecttype += childsCurGoods[i].propertyId + ':' + childsCurGoods[i].id+','
        }
      }
    }
    if (hadSelectNum == propertyLength.length){
      canSubmit=true;
    }
    console.log(selecttype)
    this.setData({
     detail: that.data.detail,
    })
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
   let select_data='选择：';
    wx.request({
      url: url + '/shop/goods/detail',
      data:{
        id:goods_id
      },
      success:function(res){
        console.log(res);
        if (res.data.data.properties.length > 0) {
          that.setData({
            isShowArrow:false
          })
          for (var i = 0; i < res.data.data.properties.length; i++) {
            console.log(res.data.data.properties[i].name);
            select_data += res.data.data.properties[i].name+' '
          }
        }
        wx.getStorage({
          key: 'cartNum',
          success: function(res) {
            that.setData({
              cartNum: res.data.shopNum,
              cartInfo:res.data
            })
          }
        })
       that.setData({
         'detail':res,
         'selectSize': select_data,
         'selectprice': res.data.data.basicInfo.minPrice
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