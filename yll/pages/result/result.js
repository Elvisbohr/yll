// pages/result/result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this
      app.getApiData({
          url: '/my/history/detail',
          method: 'POST',
          data: { id: options.id },
          header: 'application/x-www-form-urlencoded',
          success: (response) => {
              wx.hideLoading();
              this.setData({
                  achievement: response.data
              })
          }
      })
      wx.getStorage({
          key: 'openid',
          success: function (res) {
              console.log(res.data)
              that.setData({
                  member: res.data.member,
              })
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
  onShareAppMessage:  (res)=> {
      let id = res.target.dataset.id
      if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
         
      }
      return {
          title: '自定义转发标题',
          path: '/pages/result/result?id='+id
      }
  
  }
})