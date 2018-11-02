// pages/address_add/index.js
var commonCityData = require('../../utils/city.js')
const app = getApp();
const appdata = app.globalData;
const url = appdata.app_address + appdata.subDomain;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    proData: [],
    cityData: [],
    disData: [],
    SelectPro: '请选择',
    SelectCity: '请选择',
    SelectDis: '请选择',
    cityIndex:'',
  },
  bindPro:function(e){
    var that=this;
    var SelectPro = that.data.proData[e.detail.value];
    var CityData=that.initCityData(2, commonCityData.cityData[e.detail.value].cityList);
    that.setData({
      SelectPro:SelectPro,
      cityData:CityData,
      cityIndex: e.detail.value
    })
  },
  bindCity:function(e){
    var that=this;
    console.log(e.detail.value);
    var SelecCity = that.data.cityData[e.detail.value];
    console.log(commonCityData.cityData[that.data.cityIndex].cityList[e.detail.value].districtList)
    if (commonCityData.cityData[that.data.cityIndex].cityList[e.detail.value].districtList.length>0){
      var disData = that.initCityData(3, commonCityData.cityData[that.data.cityIndex].cityList[e.detail.value].districtList);
      console.log(disData)
      that.setData({
        SelectCity: SelecCity,
        disData: disData
      })
    }else{
      that.setData({
        SelectDis: '',
        SelectCity: SelecCity,
      })
    }
   
  },
  bindDis:function(e){
    var that = this;
    console.log(e.detail.value);
    var SelectDis = that.data.disData[e.detail.value];
    that.setData({
      SelectDis: SelectDis,
     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  initCityData:function(level,obj){
    var pickARR = [];
    if (level==1){
      for (var i = 0; i < obj.length;i++){
        // pickARR.push(obj[i].name)
        pickARR[i] = obj[i].name
      }
    } else if (level==2){
      for (var i = 0; i < obj.length;i++){
        pickARR.push(obj[i].name)
      }
    } else if (level == 3){
      for (var i = 0; i < obj.length; i++) {
        pickARR.push(obj[i].name)
      }
    }
    return pickARR;
  },
  onLoad: function (options) {
    var that=this;
    console.log(commonCityData)
    console.log(this.initCityData(1,commonCityData.cityData))
    var proData = this.initCityData(1, commonCityData.cityData);
    that.setData({
      proData: proData
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