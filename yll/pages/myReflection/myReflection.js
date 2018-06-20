// pages/myReflection/myReflection.js
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
        console.log(options)
        app.getApiData({
            url: '/my/achievement',
            method: 'POST',
            data: {
                id: options.id,
                openId: app.globalData.openid
            },
            header: 'application/x-www-form-urlencoded',
            success: (res) => {
                if (res.status === 200) {
                    wx.hideLoading();
                    this.setData({
                        id: options.id,
                        achievement: res.data
                    })
                }
            }
        })
    },
    onShareAppMessage: res => {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log('asda', res.target)
        }
        return {
            title: '我的成就',
            path: '/pages/myReflection/myReflection?id=' + this.data.id
        }
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

})