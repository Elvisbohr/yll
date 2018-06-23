// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //获取用户信息
  getuserinfo(e) {
      console.log('用户信息', e.detail.userInfo)
      wx.setStorageSync('userInfo', e.detail.userInfo); //本地存储userID 
      let data = {};
      data.openId = app.globalData.openid;
      data.nickName = e.detail.userInfo.nickName;
      data.img = e.detail.userInfo.avatarUrl;
      this.saveUser(data);
      var openid = wx.getStorageSync('openid');
      openid.has = true;
      wx.setStorageSync('openid', openid);
      app.globalData.has = true
      this.setData({
          user: true
      })
  },
  //保存用户信息
  saveUser(data) {
      app.getApiData({
          url: '/member/save',
          method: 'POST',
          data: data,
          header: 'application/x-www-form-urlencoded',
          success: (response) => {
              wx.hideLoading();
              console.log('response', response)
              wx.switchTab({
                  url: '../index/index'
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