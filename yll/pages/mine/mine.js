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
        const that = this;
        this.setData({
            user: app.globalData.member
        })
    },
    getAchievement() {
        wx.request({
            url: app.globalData.apiUrl + '/my/achievement',
            method: 'POST',
            data: {
                id: app.globalData.member.id,
                openId: app.globalData.openId
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: (res) => {
                if (res.data.status === 200) {
                    // wx.hideLoading();
                    this.setData({
                        achievement: res.data.data
                    })
                }
            }
        })
    },
    //查看是否有未读消息
    // getRead() {
    //     app.getApiData({
    //         url: '/my/read',
    //         method: 'POST',
    //         data: {
    //             id: app.globalData.member.id
    //         },
    //         header: 'application/x-www-form-urlencoded',
    //         success: (res) => {
    //             if (res.status === 200) {
    //                 wx.hideLoading();
    //                 this.setData({
    //                     isRead: res.data
    //                 })
    //             }
    //         }
    //     })
    // },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getAchievement();
        // this.getRead();
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

    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '羽乐乐',
            path: '/page/index/index'
        }
    }
})