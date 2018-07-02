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
        console.log('options', options)
        app.getApiData({
            url: '/my/achievement',
            method: 'POST',
            data: {
                id: options.id,
                openId: options.openId
            },
            header: 'application/x-www-form-urlencoded',
            success: (res) => {
                if (res.status === 200) {
                    wx.hideLoading();
                    this.setData({
                        id: options.id,
                        openId: options.openId,
                        achievement: res.data
                    })
                }
            }
        })
    },
    onShareAppMessage: res => {
        console.log('ads',res)
        let id = res.target.dataset.id 
        let openId = res.target.dataset.openid 
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log('asda', openId)
        }
        return {
            title: '我的成就',
            path: '/pages/myReflection/myReflection?id=' + id + '&openId=' + openId
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