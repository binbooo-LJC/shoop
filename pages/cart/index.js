// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartinfo:{},
    allselect:false,
    hideedit:true
  },
// 添加数量
  numjian:function(e){
    console.log(e);
    var that = this;
    var cartinfo = that.data.cartinfo
    var index = e.currentTarget.dataset.key;
    var buyNum = cartinfo.carList[index].buyNum;
   
    if (buyNum>1){
      buyNum--;
      cartinfo.shopNum--;
      cartinfo.carList[index].buyNum = buyNum;
      that.setData({
        cartinfo: cartinfo
      })
      wx.setStorage({
        key: 'cartNum',
        data: cartinfo,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '最小购买数量为1',
        showCancel:false
      })
    }
  }, 
  numjia:function(e){
    var that = this;
    var cartinfo = that.data.cartinfo
    var index = e.currentTarget.dataset.key;
    var buyNum = cartinfo.carList[index].buyNum;
    buyNum++;
    cartinfo.shopNum++;
    cartinfo.carList[index].buyNum = buyNum;
    console.log(cartinfo)
    that.setData({
      cartinfo: cartinfo
    })
    wx.setStorage({
      key: 'cartNum',
      data: cartinfo,
    })
  },
  selectgoods:function(e){
    var that=this;
    var cartinfo = that.data.cartinfo;
    var index = e.currentTarget.dataset.key;
    if (!cartinfo.carList[index].select){
      cartinfo.carList[index].select = true;
    }else{
      cartinfo.carList[index].select = false;
    }
    that.setData({
      cartinfo: cartinfo
    })
    that.allselect();
  },
  //  判断是否为全选
  allselect:function(e){
    var that = this;
    var cartinfo = that.data.cartinfo;
    var listLen = cartinfo.carList.length;
    var selectnum=0;
    var allselect=false;
    for (var i = 0; i < listLen;i++){
      if (cartinfo.carList[i].select){
        selectnum++;
      }
    } 
    console.log(selectnum);
    console.log(listLen)
    if (selectnum == listLen){
      allselect=true;
    }
    that.setData({
      allselect: allselect
    })
  },
  car_edit:function(e){
    var that=this;
    var hideedit=false;
    if(!that.data.hideedit){
      hideedit=true;
    }
    that.setData({
      hideedit: hideedit
    })
  },
  selectall:function(e){
    var that=this;
    var allselect = that.data.allselect;
    var select='';
    if (allselect){
      select=false;
      allselect=false;
    }else{
      select = true;
      allselect = true;
    }
    var cartinfo = that.data.cartinfo;
    for (var i = 0; i < cartinfo.carList.length;i++){
      cartinfo.carList[i].select = select;
    }
    that.setData({
      cartinfo: cartinfo,
      allselect: allselect
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
    var that = this;
    wx.getStorage({
      key: 'cartNum',
      success: function (res) {
        that.setData({
          cartinfo: res.data,
        })
      },
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