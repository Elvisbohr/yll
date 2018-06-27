// pages/affirm/affirm.js
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
        let that = this
        app.getApiData({
            url: '/my/history/detail',
            method: 'POST',
            data: {id:options.id},
            header: 'application/x-www-form-urlencoded',
            success: (response) => {
                wx.hideLoading();
                this.setData({
                    achievement: response.data,
                    id: options.id
                })
            }
        })
     
        var member = wx.getStorageSync('member')
        that.setData({
            member: member
        })
        that.getRead(options.id)
    },
    endGame(e) {
        console.log(e)
        app.getApiData({
            url: '/game/affirm',
            method: 'POST',
            data: { id: this.data.id, formId: e.detail.formId},
            header: 'application/x-www-form-urlencoded',
            success: (response) => {
                wx.hideLoading();
                // wx.navigateTo({
                //     url: '../result/result?id=' + this.data.achievement.id,
                // })
                wx.switchTab({
                    url: '../index/index'
                })
            }
        })
        
    },
    // 确认比赛
    getRead(e) {
        console.log(e)
        app.getApiData({
            url: '/my/read',
            method: 'POST',
            data: {
                id: e
            },
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