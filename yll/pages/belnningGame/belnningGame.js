// pages/belnningGame/belnningGame.js
const app = getApp()
Page({
    data: {
        rival: false, //是否对手进入
        noMore: true, //是否有下一场
        session: [{
            me: '',
            enemy: ''
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let member = {};
        member.id = options.id;
        member.name = options.name;
        member.img = options.img;
        this.setData({
            member : member
        })
    },
    //记录我自己输入的数据
    meData(e) {
        console.log('me', e.detail.value)
        let me = parseInt(e.detail.value)
        this.setData({
            me: me,
        })
    },
    //记录对手输入的数据
    enemyData(e) {
        console.log('enemy', e.detail.value)
        let enemy = parseInt(e.detail.value)
        this.setData({
            enemy: enemy,
        })
    },
    //点击+添加到数组里
    add() {
        let that = this,
            me = this.data.me,
            enemy = this.data.enemy;
        if (parseInt(me) > 21 || parseInt(enemy) > 21) {
            if (Math.abs(parseInt(me) - parseInt(enemy)) != 2) {
                console.log("分数不符合规则,相差超2");
            } else {
                console.log("正确");
                that.addData();
            }
        } else {
            if (parseInt(me) == 21 || parseInt(enemy) == 21) {
                if (parseInt(me) == parseInt(enemy)) {
                    console.log("分数不符合规则,两人相等");
                } else {
                    console.log("正确");
                    that.addData();
                }
            } else {
                console.log("分数不符合规则");
            }
        }

        // if (me > 20 || enemy > 20) {
        //     if (parseInt(me - enemy) > 2 ||parseInt(enemy - me) > 2){
        //         session[i].me = me
        //         console.log('i', i)
        //         session[i].enemy = enemy
        //         if (i >= 2) {
        //             console.log('超过3场')
        //             if (i === 2) {
        //                 this.setData({
        //                     noMore: false
        //                 })
        //             }
        //         } else {
        //             console.log('未超过3场')
        //             session.push({
        //                 me: '',
        //                 enemy: ''
        //             })
        //         }
        //         this.setData({
        //             session: session,
        //             me: '',
        //             enemy: ''
        //         })
        //     }else{
        //         console.log('分数相差未到2')
        //         // this.setData({
        //         //     me: '',
        //         //     enemy: ''
        //         // })

        //     }          
        // }else{
        //     console.log('分数不正确未超过21分')
        // }
    },
    //添加方法
    addData() {
        let session = this.data.session,
            i = session.length - 1;
        session[i].me = this.data.me
        session[i].enemy = this.data.enemy
        if (i >= 2) {
            console.log('超过3场')
            if (i === 2) {
                this.setData({
                    noMore: false
                })
            }
        } else {
            console.log('未超过3场')
            session.push({
                me: '',
                enemy: ''
            })
        }
        this.setData({
            session: session,
            me: '',
            enemy: ''
        })
    },
    //结束比赛
    endGame() {
        const that = this
        wx.showModal({
            title: '比赛结束',
            content: '结束比赛并发送比分待对手确认',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    //调取接口
                    let endData = {};
                    endData.memberId =
                        endData.rivalMemberId =
                        endData.rivalNickName =
                        endData.rivalImg =
                        endData.type =
                        endData.one = this.data.session[0]
                    endData.two = this.data.session[1]
                    endData.three = this.data.session[2]
                    app.getApiData({
                        url: '/game/end',
                        method: 'POST',
                        data: endData,
                        header: 'application/x-www-form-urlencoded',
                        success: (response) => {
                            wx.hideLoading();
                            this.setData({
                                achievement: response.data
                            })
                        }
                    })
                    // app.globalData.session = that.data.session   //把结果存入全局
                    wx.setStorage({
                        key: "session",
                        data: that.data.session
                    })
                    wx.switchTab({
                        url: '../mine/mine',
                        success: function(res) {
                            console.log('跳转到我的页面');
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    scanCode() {
        wx.scanCode({
            success: (res) => {
                console.log(res)
            }
        })
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