// pages/myMessage/myMessage.js
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
        app.getApiData({
            url: '/my/message',
            method: 'POST',
            data: {
                id: options.id
            },
            header: 'application/x-www-form-urlencoded',
            success: (response) => {
                wx.hideLoading();
                this.setData({
                    message: response.data
                })
            }
        })
    },
    mesNav(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id
        app.getApiData({
            url: '/my/read',
            method: 'POST',
            data: {
                id: id
            },
            header: 'application/x-www-form-urlencoded',
            success: (response) => {
                wx.hideLoading();
                
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