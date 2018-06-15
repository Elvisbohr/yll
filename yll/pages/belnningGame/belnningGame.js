// pages/belnningGame/belnningGame.js
Page({
    data: {
        rival: false,
        session: [{
            me: '',
            enemy: ''
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    meData(e) {
        console.log('me', e.detail.value)
        let me = e.detail.value
        this.setData({
            me: me,
        })
    },
    enemyData(e) {
        console.log('enemy', e.detail.value)
        let enemy = e.detail.value
        this.setData({
            enemy: enemy,
        })
    },
    add() {
        let session = this.data.session,
            i = session.length - 1,
            me = this.data.me,
            enemy = this.data.enemy;
        console.log('me', me)
        if (me > 20 || enemy > 20) {
            session[i].me = me
            session[i].enemy = enemy
            session.push({
                me: '',
                enemy: ''
            })
            this.setData({
                session: session,
                me: '',
                enemy: ''
            })
        }
    },
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