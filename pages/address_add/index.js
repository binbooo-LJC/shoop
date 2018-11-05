// pages/address_add/index.js
var commonCityData = require('../../utils/city.js')
var unit=require('../../utils/util.js');
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
    hasdis:true,
    adddetail:{}
  },
  // 获取表单数据
  formSubmit:function(e){
    var that=this;

    var val = e.detail.value
    console.log(e.detail.value.name);
    if (!val.name){
        wx.showModal({
          title: '提示',
          content: '请填写联系人',
          showCancel:false
        })
        return;
    }
    if(!val.phone){
      wx.showModal({
        title: '提示',
        content: '输入电话号码',
        showCancel: false
      })
      return;
    }
    console.log(unit.checkPhone(val.phone));
    if (!unit.checkPhone(val.phone)){
      wx.showModal({
        title: '提示',
        content: '电话输入有误',
        showCancel:false
      })
      return;
    }
    if (!val.pro) {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return;
    }
    if (!val.city) {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return;
    }
    if (!val.address) {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return;
    }
    console.log()
    var proid = commonCityData.cityData[val.pro].id;
    var cityid = commonCityData.cityData[val.pro].cityList[val.city].id;
    var disid=''
    if(that.data.hasdis){
      var disid = commonCityData.cityData[val.pro].cityList[val.city].districtList[val.dis].id;
    }
    console.log(proid);
    console.log(cityid);
    console.log(disid);
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.request({
      url: url +'/user/shipping-address/add',
      data:{
        token:wx.getStorageSync('token'),
        provinceId: proid,
        cityId: cityid,
        distric:disid,
        linkMan:val.name,
        address:val.address,
        mobile:val.phone,
        code: val.postCode,
        status:0,
        isDefault:true
      },
      success:function(res){
        if(res.data.code==0){
          wx.hideLoading();
          wx.navigateBack();
        }
      }
    })


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
        disData: disData,
        SelectDis:'请选择',
        hasdis:true,
      })
    }else{
      that.setData({
        SelectDis: '',
        SelectCity: SelecCity,
        hasdis:false,
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
  initcityId:function(level,id){
    for (var i = 0; i < commonCityData.cityData.length;i++){
      if(level==1){
        if (commonCityData.cityData[i].id==id){
          return commonCityData.cityData[i].cityList;
        }
      }
    
    }
  },
  onLoad: function (e) {
    var that = this;
    if (e.id) {
      wx.setNavigationBarTitle({
        title: '修改地址',
      })
      wx.request({
        url: url + "/user/shipping-address/detail",
        data:{
          token:wx.getStorageSync('token'),
          id:e.id
        },
        success:function(res){
         if(res.data.code==0){
           var hasdis='';
           var SelectDis='';
           if (!res.data.data.areaStr){
             hasdis = false;
             SelectDis='';
           }else{
             hasdis = false;
             SelectDis = res.data.data.areaStr;
           }
           var proId = res.data.data.provinceId;
           
           var cityId = res.data.data.cityId;
           var disId = res.data.data.areaStr ? res.data.data.areaStr:'';
           var cityObj = that.initcityId(1,proId);
           var cityData = that.initCityData(2, cityObj);
           console.log(cityData);
           that.setData({
             adddetail:res.data.data,
             SelectPro: res.data.data.provinceStr,
             SelectCity: res.data.data.cityStr,
             hasdis: hasdis,
             SelectDis: SelectDis,
             cityData: cityData
           })
         }
        }
      })
    } else {
      wx.setNavigationBarTitle({
        title: '新增地址',
      })
    }
  
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
  onShow: function (e) {
  
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