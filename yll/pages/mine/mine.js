// pages/mine/mine.js
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
    onLoad: function(options) {
        this.setData({
            user: app.globalData.member
        })
        this.getAchievement()
    },
    getAchievement(){
        app.getApiData({
            url: '/my/achievement',
            method: 'POST',
            data: { id: app.globalData.member.id, openId: app.globalData.openid},
            header: 'application/x-www-form-urlencoded',
            success: (res) => {
                if (res.status === 200) {
                    wx.hideLoading();
                    this.setData({
                        achievement: res.data
                    })
                }
            }
        })
    },
    getRead() {
        app.getApiData({
            url: '/my/read',
            method: 'POST',
            data: { id: app.globalData.member.id },
            header: 'application/x-www-form-urlencoded',
            success: (res) => {
                if (res.status === 200) {
                    wx.hideLoading();
                    this.setData({
                        isRead: res.data
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getRead()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})