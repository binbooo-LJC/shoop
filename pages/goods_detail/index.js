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
    selectprice: '', 
    selectstore:'',
    cartInfo:{},
    canSubmit:false,
    minbuy:1,
    buyNum:1,
    selectName:'',
    isaddcar:1,
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
  // 尺码规格选择
  sizeTap:function(e){
    var that=this;
    var child = that.data.detail.data.data.properties[e.currentTarget.dataset.propertyidx]['childsCurGoods'];
    for (var i = 0;i<child.length;i++){
      that.data.detail.data.data.properties[e.currentTarget.dataset.propertyidx]['childsCurGoods'][i].active=false;
    }
    that.data.detail.data.data.properties[e.currentTarget.dataset.propertyidx]['childsCurGoods'][e.currentTarget.dataset.properychildindex].active = true;
    var propertyLength = that.data.detail.data.data.properties;
    var hadSelectNum=0;
    var selecttype='';
    var selectName = '';
    for (var i = 0; i < propertyLength.length;i++){
      var childsCurGoods = propertyLength[i]['childsCurGoods'];
      for (var j = 0; j < childsCurGoods.length ; j++){
        if (childsCurGoods[j].active){
          hadSelectNum++;
          selecttype += childsCurGoods[j].propertyId + ':' + childsCurGoods[j].id+',';
          selectName += propertyLength[i].name + ':' +childsCurGoods[j].name+' '
        }
      }
    }
    if (hadSelectNum == propertyLength.length){
      that.setData({
        selectName: selectName,
        canSubmit: true,
        selecttype:selecttype
      })
      wx.request({
        url: url + '/shop/goods/price',
        data:{
          goodsId: wx.getStorageSync('goods_id'),
          propertyChildIds: selecttype
        },
        success:function(res){
          that.setData({
            selectprice: res.data.data.price,
            selectstore: res.data.data.stores,
          })
        }
      })
    }
    this.setData({
     detail: that.data.detail,
    })
  },
  // 选择数量
  addBuyNum:function(e){
    var that=this;
    let buyNum = that.data.buyNum+1
    that.setData({
      buyNum: buyNum
    })
  },
  jianBuyNum:function(e){
    var that = this;
    if (that.data.buyNum<2){
      wx.showModal({
        title: '提手',
        content: '购买数量最小为1',
        showCancel:false
      })
      return;
    }
    let buyNum = that.data.buyNum -1
    that.setData({
      buyNum: buyNum
    })
  },
  //加入购物车
  join_to_cart:function(e){
    var that=this;
    console.log(that.checkArrowStore())
    if(!that.checkArrowStore()){
      return;
    }
    // 构造购物车信息
    var addcarinfo=this.buildcarinfo();
    wx.setStorage({
      key: 'cartNum',
      data: addcarinfo,
      success:function(e){
       wx.showToast({
         title: '加入购物车成功',
         duration:1500,
         complete: function(res) {
           that.setData({
             isShowSelect:true,
           })
         },
         
       })
      }
    })

  },
  // 组键购物车信息
  buildcarinfo:function(){
    var addcarinfo={};
    var goodsinfo=this.data.detail.data.data;
    var cartInfo = this.data.cartInfo;
    addcarinfo.name = goodsinfo.basicInfo.name;
    addcarinfo.arrow = this.data.selectName;
    addcarinfo.price = this.data.selectprice;
    addcarinfo.buyNum = this.data.buyNum;
    addcarinfo.goodsId = goodsinfo.basicInfo.id;
    addcarinfo.pic = goodsinfo.basicInfo.pic;
    addcarinfo.selecttype = this.data.selecttype;
    
    var hasSameid=0;
    if (!cartInfo.shopNum){
      cartInfo.shopNum=0;
    }
    // console.log(!cartInfo.carList)
    if (!cartInfo.carList){
      cartInfo.carList=[];
      cartInfo.carList.push(addcarinfo)
      cartInfo.shopNum = addcarinfo.buyNum;
      hasSameid=1;
    }else{
      for (var i = 0; i < cartInfo.carList.length;i++){
        if (cartInfo.carList[i].goodsId == addcarinfo.goodsId && cartInfo.carList[i].arrow == addcarinfo.arrow){
          cartInfo.carList[i].buyNum += addcarinfo.buyNum;
          hasSameid=1;
          cartInfo.shopNum += addcarinfo.buyNum;
          break;
        }else{
          continue;
        }
      }
    }
    if (hasSameid==0){
      cartInfo.carList.push(addcarinfo);
      cartInfo.shopNum += addcarinfo.buyNum;
    }
    return cartInfo;
    
  },
  add_cart: function (e) {
    this.setData({
      isaddcar: 1,
      isShowSelect:false
    })
  },
  buyNow: function (e) {
    this.setData({
      isaddcar:0,
      isShowSelect: false
    })
  },
  join_to_buy:function(e){
    var that=this
    if(!this.checkArrowStore()){
      return;
    };
    var buymes=this.buildbuyInfo()
    wx.setStorage({
      key: 'buyinfo',
      data: buymes,
      success:function(res){
        that.closeSelect();
      }
    })
    wx.navigateTo({
      url: '/pages/order/index',
    })
  },
  // 组键购买信息
  buildbuyInfo:function(e){
    var addcarinfo = {};
    var goodsinfo = this.data.detail.data.data;
    var cartInfo = this.data.cartInfo;
    addcarinfo.name = goodsinfo.basicInfo.name;
    addcarinfo.arrow = this.data.selectName;
    addcarinfo.price = this.data.selectprice;
    addcarinfo.buyNum = this.data.buyNum;
    addcarinfo.goodsId = goodsinfo.basicInfo.id; 
    addcarinfo.pic = goodsinfo.basicInfo.pic;
    addcarinfo.selecttype = this.data.selecttype;
    var buyInfo={}
    if (!buyInfo.list){
      buyInfo.list=[];
    }
    buyInfo.list.push(addcarinfo);
    return buyInfo;
  },
  checkArrowStore:function(){
    var that = this;
    if (!that.data.canSubmit) {
      wx.showModal({
        title: '提示',
        content: '请选择规格',
        showCancel: false
      })
      return false;
    }
    if (that.data.selectstore < that.data.buyNum) {
      wx.showModal({
        title: '提示',
        content: '此规格库存为' + that.data.selectstore,
        showCancel: false
      })
      return false;
    }
    return true;
  },
  go_cart:function(e){
    console.log(e);
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    });
   var that=this;
   console.log(e);
   let goods_id=e.id;
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