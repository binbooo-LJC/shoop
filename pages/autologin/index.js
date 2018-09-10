// pages/autologin/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onGotUserInfo:function(e){
   
    if (!e.detail.userInfo){
      return ;
    }else{
      wx.setStorageSync('user', e.detail.userInfo);
      this.login();
    }
  },
  login:function(){
    wx.showLoading({
      title: '加载中',
    })
     let token=wx.getStorageSync('token');
     let that=this;
     if(token){
      wx.request({
        url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/check-token',
        data:{
          token:token
        },
        success:function(res){
          if (res.data.code!=0){
            console.log(1)
            wx.removeStorageSync('token');
            that.login();
            return;
          }else{
            wx.navigateBack();
            return;
          }
        }
      })
     }
     wx.login({
       success:function(res){
         wx.request({
           url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/wxapp/login',
           data:{
             code:res.code
           },
           success:function(res){
             if(res.data.code==10000){
                // 去注册
                that.regist();
             }else{
               wx.hideLoading();
                if(res.data.code!=0){
                  wx.showModal({
                    title: '登陆失败',
                    content: '',
                  })
                  return ;
                }
                wx.setStorageSync('uid',res.data.data.uid);
                wx.setStorageSync('token', res.data.data.token)
             }
           }
         })
       }
     })

  },
  regist:function(){
   wx.login({
     success:function(res){
      let code=res.code;
      wx.getUserInfo({
        success:function(res){
          var iv = res.iv;
          var encryptedData = res.encryptedData;
          wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/wxapp/register/complex',
            data:{
              code:code,
              iv:iv,
              encryptedData: encryptedData
            },
            success:function(res){
              if(res.data.code==0){
                this.login();
              }
            }
          })
        }
      })
     }
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