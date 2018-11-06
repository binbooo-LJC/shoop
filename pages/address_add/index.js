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
    adddetail:{},
    proval:'',
    cityval:'',
    disval:'',
    pageType:0,
    id:''
  },
  // 获取表单数据,表单提交
  formSubmit:function(e){
    var that=this;
    var val = e.detail.value
    console.log(val);
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
    var proid = commonCityData.cityData[val.pro].id;
    var cityid = commonCityData.cityData[val.pro].cityList[val.city].id;
    var disid='';
    if(that.data.hasdis){
      var disid = commonCityData.cityData[val.pro].cityList[val.city].districtList[val.dis].id;
      console.log(disid);
    }
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    if(that.data.pageType>0){
      console.log(that.data.pageType)
      wx.request({
        url: url +'/user/shipping-address/update',
        data:{
          token:wx.getStorageSync('token'),
          id:that.data.id,
          provinceId: proid,
          cityId: cityid,
          districtId: disid,
          linkMan: val.name,
          address: val.address,
          mobile: val.phone,
          code: val.postCode,
          isDefault: val.isDefault,
          status: 0,
        },
        success:function(res){
          console.log(res.data);
          wx.hideLoading();
          if(res.data.code==0){
            wx.navigateBack();
          }
        }
      })
    }else{
      wx.request({
        url: url + '/user/shipping-address/add',
        data: {
          token: wx.getStorageSync('token'),
          provinceId: proid,
          cityId: cityid,
          districtId: disid,
          linkMan: val.name,
          address: val.address,
          mobile: val.phone,
          code: val.postCode,
          status: 0,
          isDefault: true
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.hideLoading();
            wx.navigateBack();
          }
        }
      })
    }
  },
  // 省份切换
  bindPro:function(e){
    var that=this;
    var SelectPro = that.data.proData[e.detail.value];
    var CityData=that.initCityData(2, commonCityData.cityData[e.detail.value].cityList);
    that.setData({
      SelectPro:SelectPro,
      cityData:CityData,
      cityIndex: e.detail.value,
      SelectCity:'请选择',
      cityval:'',
      disval:'',
      SelectDis:'请选择'
    })
  },
  // 市区切换
  bindCity:function(e){
    var that=this;
    var SelecCity = that.data.cityData[e.detail.value];
    console.log(SelecCity);
    if (commonCityData.cityData[that.data.cityIndex].cityList[e.detail.value].districtList.length>0){
      var disData = that.initCityData(3, commonCityData.cityData[that.data.cityIndex].cityList[e.detail.value].districtList);
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
  // 区级县切换
  bindDis:function(e){
    var that = this;
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
  initcityId:function(level,id,obj){
    for (var i = 0; i < obj.length;i++){
      if(level==1){
        if (obj[i].id==id){
          return i;
        }
      }else if(level==2){
        if (obj[i].id == id) {
          return i;
        }
      }else if (level==3){
        if (obj[i].name == id){
          return i;
        }
      }
    
    }
  },
  deleteaddress:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除地址',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: url + '/user/shipping-address/delete',
            data: {
              token: wx.getStorageSync('token'),
              id: that.data.id
            },
            success: function (res) {
              if(res.data.code==0){
                wx.navigateBack();
              }
            }
          })
        }
      }
    })
    
  },
  onLoad: function (e) {
    console.log(commonCityData)
    var that = this;
    if (e.id) {
      that.setData({
        pageType:1,
        id:e.id
      })
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
             hasdis = true;
             SelectDis = res.data.data.areaStr;
           }
           var disData='';
           var disindex=''
           var proId = res.data.data.provinceId;
           var cityId = res.data.data.cityId;
           var disId = res.data.data.areaStr ? res.data.data.areaStr:'';
           var proindex =that.initcityId(1, proId,commonCityData.cityData);
           var cityobj = commonCityData.cityData[proindex].cityList;
           var cityData = that.initCityData(2, cityobj);
           var cityindex = that.initcityId(2, cityId, cityobj);
           if (disId){
             var disobj = cityobj[cityindex].districtList;
             var disData = that.initCityData(3, disobj);
             disindex = that.initcityId(3, SelectDis, disobj);
             console.log(disindex)
           }
           that.setData({
             adddetail:res.data.data,
             SelectPro: res.data.data.provinceStr,
             SelectCity: res.data.data.cityStr,
             SelectDis: SelectDis,
             hasdis: hasdis,
             SelectDis: SelectDis,
             cityData: cityData,
             disData: disData,
             cityIndex: proindex,
             proval: proindex,
             cityval: cityindex,
             disval: disindex
           })
         }
        }
      })
    } else {
      wx.setNavigationBarTitle({
        title: '新增地址',
      })
    }
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