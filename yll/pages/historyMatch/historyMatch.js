// pages/historyMatch/historyMatch.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: false,
        pageNum: 1,
        pageSize: 10,
        moreTit: '加载更多'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let data = {};
        data.id = options.id
        data.pageNum = that.data.pageNum;
        data.pageSize = that.data.pageSize;
        that.getMerchantList(data);
        that.setData({
            id: options.id,
            pageH: app.globalData.pageH
        })
    },
    //加载更多接口
    loadMore: function() {
        var that = this,
            pageNum = that.data.pageNum,
            data = {};
        if (that.data.pageAll) {
            console.log('月数据')
            pageNum += 1;
            data.pageNum = pageNum;
            data.pageSize = that.data.pageSize
            data.id = that.data.id
            that.setData({
                pageNum: pageNum,
            })
            that.getMerchantList(data);

        } else {
            console.log('无数据')
            that.setData({
                moreTit: '暂无更多',
            })
        }
    },
    getMerchantList: function(data) {
        var that = this;
        app.getApiData({
            url: '/my/history',
            method: 'POST',
            data: data,
            header: 'application/x-www-form-urlencoded',
            success: (response) => {
                wx.hideLoading();
                if (that.data.pageNum > 1) {
                    console.log('分页调取列表')
                    let history = that.data.history;
                    for (var i = 0; i < response.data.list.length; i++) {
                        history.push(response.data.list[i]);
                    }
                    that.setData({
                        pageAll: response.data.hasNextPage,
                        history: history,
                    })

                } else {
                    console.log('初次调取列表')
                    that.setData({
                        pageAll: response.data.hasNextPage,
                        history: response.data.list,
                    })
                }
                app.globalData.dataList = response.data.list //存入全局

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