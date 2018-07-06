// pages/belnningGame/belnningGame.js
const app = getApp()
Page({
    data: {
        rival: false, //是否对手进入
        noMore: true, //是否有下一场
        e: '',
        enemy: '',
        mewin: 0, //我的总胜场数
        enwin: 0, //对手总胜场数
        session: [{
            me: '',
            enemy: ''
        }],
        one: '',
        two: '',
        three: '',
        isEnd: false,
        // index: 1,
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
            member: member
        })
    },
    //记录我自己输入的数据
    meData(e) {
        let me = parseInt(e.detail.value),
        that = this;
        console.log(1, me)
        if (e.detail.value != '') {
            this.setData({
                me: me,
            })
        }

        if (e.detail.value != '' && that.data.enemy && that.data.enemy != '') {
            this.getResult()
        }
    },
    //记录对手输入的数据
    enemyData(e) {
        let enemy = parseInt(e.detail.value),
        that = this;
        console.log(2, enemy)
        if (e.detail.value != '') {
            this.setData({
                enemy: enemy,
            });
        }
        if (e.detail.value != '' && that.data.me && that.data.me != '') {
            console.log('q', that.data.me)
            this.getResult()
        }

    },
    //点击+添加新数组
    add() {
        let isNext = this.data.isNext,
            session = this.data.session,
            // index = this.data.index,
            i = session.length - 1;
        if (i >= 2) {
            console.log('超过3场')
            if (i === 2) {
                this.setData({
                    noMore: false
                })
            }
        } else {
            console.log('未超过3场')
            // index++;
            if (session[i].me == '' && session[i].enemy == '') {
                wx.showToast({
                    title: '成绩不能为空',
                    icon: 'loading',
                    duration: 2000
                })
            } else if (session[i].me == session[i].enemy) {
                wx.showToast({
                    title: '成绩不能相等',
                    icon: 'loading',
                    duration: 2000
                })
            } else {
                session.push({
                    me: '',
                    enemy: ''
                })
            }

        }
        this.setData({
            session: session,
            me: '',
            enemy: '',
            // index: index
        })
    },

    //结束比赛
    endGame() {
        const that = this;
        wx.showModal({
            title: '比赛结束',
            content: '结束比赛并发送比分待对手确认',
            cancelText: "否",
            confirmText: "是",
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    //先判断胜负
                    let winType = '';
                    let one = that.data.one;
                    let two = that.data.two;
                    let three = that.data.three;
                    if (that.data.session.length == 1) {
                        if (parseInt(that.data.session[0].me) > parseInt(that.data.session[0].enemy)) {
                            console.log('胜')
                            one = that.data.session[0].me + ',' + that.data.session[0].enemy + ',' + 1
                        } else {
                            console.log('负')
                            one = that.data.session[0].me + ',' + that.data.session[0].enemy + ',' + 0
                        }
                        console.log('one', one)
                        that.setData({
                            one: one,
                            // isEnd: true
                        })
                        that.data.isEnd = true
                    } else {
                        if (parseInt(that.data.session[0].me) > parseInt(that.data.session[0].enemy)) {
                            console.log('胜')
                            one = that.data.session[0].me + ',' + that.data.session[0].enemy + ',' + 1
                        } else {
                            console.log('负')
                            one = that.data.session[0].me + ',' + that.data.session[0].enemy + ',' + 0
                        }
                        if (parseInt(that.data.session[1].me) > parseInt(that.data.session[1].enemy)) {
                            console.log('胜')
                            two = that.data.session[1].me + ',' + that.data.session[1].enemy + ',' + 0
                        } else {
                            console.log('负')
                            two = that.data.session[1].me + ',' + that.data.session[1].enemy + ',' + 1
                        }
                        if (parseInt(that.data.session[2].me) > parseInt(that.data.session[2].enemy)) {
                            console.log('胜')
                            three = that.data.session[2].me + ',' + that.data.session[2].enemy + ',' + 0
                        } else {
                            console.log('负')
                            three = that.data.session[2].me + ',' + that.data.session[2].enemy + ',' + 1
                        }
                        console.log('one', one)
                        console.log('two', two)
                        console.log('three', three)
                        that.setData({
                            one: one,
                            two: two,
                            three: three,
                            // isEnd: true
                        })
                    }
                    if (that.data.mewin > that.data.enwin) {
                        winType = 1;
                        console.log('总胜')
                    } else {
                        console.log('总负')
                        winType = 0;
                    }
                    console.log('winType', winType)

                    //调取接口
                    let endData = {};
                    endData.memberId = that.data.member.id;  //发起人主键id
                    endData.rivalMemberId = that.data.rival.id;  //对手主键id
                    endData.rivalNickName = that.data.rival.nickName;    //对手昵称
                    endData.rivalImg = that.data.rival.img;  //对手头像
                    endData.type = winType;  //总胜负标识
                    if (that.data.session.length == 1) { //如果之比一场
                    endData.one = that.data.one; 
                    console.log('one', one)
                    } else {                         //三局两胜制
                    console.log('one', one)
                    console.log('two', two)
                    console.log('three', three)
                    endData.one = that.data.one;
                    endData.two = that.data.two;
                    endData.three = that.data.three;
                    }

                    app.getApiData({
                        url: '/game/end',
                        method: 'POST',
                        data: endData,
                        header: 'application/x-www-form-urlencoded',
                        success: (response) => {
                            wx.hideLoading();
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
                            that.setData({
                                achievement: response.data
                            })
                        }
                    })


                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    getResult() {
        let that = this,
            me = this.data.me,
            enemy = this.data.enemy,
            session = this.data.session,
            mewin = this.data.mewin,
            enwin = this.data.enwin,
            i = session.length - 1;
        session[i].me = me;
        session[i].enemy = enemy;
        if (parseInt(me) > 21 || parseInt(enemy) > 21) {
            if (Math.abs(parseInt(me) - parseInt(enemy)) != 2) {
                console.log("分数不符合规则,相差超2");
                wx.showToast({
                    title: '分数不正确',
                    icon: 'loading',
                    duration: 2000
                })
                this.setData({
                    me: '',
                    enemy: '',
                })
            } else {
                console.log("正确");
                if (parseInt(me) > parseInt(enemy)) {
                    mewin++
                } else {
                    enwin++
                }
                this.setData({
                    session: session,
                    me: '',
                    enemy: '',
                    mewin: mewin,
                    enwin: enwin
                })
            }
        } else {
            if (parseInt(me) == 21 || parseInt(enemy) == 21) {
                if (parseInt(me) == parseInt(enemy)) {
                    console.log("分数不符合规则,两人相等");
                    wx.showToast({
                        title: '错误:分数相等',
                        icon: 'loading',
                        duration: 2000
                    })
                    this.setData({
                        me: '',
                        enemy: '',
                    })
                } else {
                    console.log("正确");
                    if (parseInt(me) > parseInt(enemy)) {
                        mewin++
                    } else {
                        enwin++
                    }
                    this.setData({
                        session: session,
                        me: '',
                        enemy: '',
                        mewin: mewin,
                        enwin: enwin,
                    })
                }
            } else {
                console.log("分数不符合规则");
                wx.showToast({
                    title: '错误:分数错误',
                    icon: 'loading',
                    duration: 2000
                })
                this.setData({
                    me: '',
                    enemy: '',
                })
            }
        }
    },
    //调取扫一扫api(跳转到商铺)
    sweep: function(res) {
        // 只允许从相机扫码
        let that = this;
        wx.scanCode({
            onlyFromCamera: true,
            success: function(res) {
                console.log("调取成功")
                console.log(res.path)
                if (res.path == undefined) {
                    wx.showToast({
                        title: '二维码有误',
                        icon: 'loading',
                        duration: 2000
                    })
                } else {
                    let ss = res.path
                    var reg2 = /([^=]+)$/;
                    let id = ss.match(reg2)[1];
                    console.log(id)
                    app.getApiData({
                        url: '/member/info',
                        method: 'POST',
                        data: {
                            id: id
                        },
                        header: 'application/x-www-form-urlencoded',
                        success: (response) => {
                            wx.hideLoading();
                            that.setData({
                                rival: response.data
                            })
                        }
                    })
                }
            },
            fail: function(res) {
                wx.showToast({
                    title: '二维码有误',
                    icon: 'loading',
                    duration: 2000
                })
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