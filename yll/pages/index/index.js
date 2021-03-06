//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        // user: false,
        initiator: false,
        inviteeImg: '',
        red: '' //未读消息
    },
    onLoad: function() {
        const that = this;

    },
    onShow: function() {
        const that = this;
        app.toLogin().then(function(res) {
            var member = wx.getStorageSync('member')
            console.log('member', member)
            if (member == '' || member == null || member == undefined) {
                console.log('未保存')
                that.tapinfo();
            } else {
                app.globalData.member = member
                that.setData({
                    member: member
                })
                let id = app.globalData.member.id
                console.log(id)
                that.getAchievement();  //查看是否有未读
                that.createWebsocket(id)    //创建连接
            }
        });

    },
    // 页面卸载
    onHide: function() {
        console.log('WebSocket 已关闭！')
        wx.closeSocket();
        wx.stopBackgroundAudio();
        wx.onSocketClose(function(res) {
            console.log('WebSocket 已关闭！')
        })
    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '羽乐乐',
            path: '/page/index/index'
        }
    },
    getAchievement() {
        wx.request({
            url: app.globalData.apiUrl + '/my/achievement',
            method: 'POST',
            data: {
                id: app.globalData.member.id,
                openId: app.globalData.openId
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data.status === 200) {
                    if (res.data.data.read) {
                        wx.showModal({
                            title: '待确认的比赛',
                            content: '是否查看待确认的比赛?',
                            cancelText: "否",
                            confirmText: "是",
                            success: function(res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                    wx.navigateTo({
                                        url: '../myMessage/myMessage?id=' + that.data.member.id
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                }
            }
        })
    },
    //点击跳转到发起比赛页
    initiate() {
        // app.getApiData({
        //     url: '/game/start',
        //     method: 'POST',
        //     data: {
        //         openId: app.globalData.openId
        //     },
        //     header: 'application/x-www-form-urlencoded',
        //     success: (response) => {
        //         wx.hideLoading();
        //         wx.navigateTo({
        //             url: '../belnningGame/belnningGame?id=' + this.data.member.id + '&name=' + this.data.member.nickName + '&img=' + this.data.member.img,
        //         })
        //     }
        // });

        wx.request({
            url: app.globalData.apiUrl + '/game/start',
            method: 'POST',
            data: {
                openId: app.globalData.openId
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                wx.navigateTo({
                    url: '../belnningGame/belnningGame?id=' + this.data.member.id + '&name=' + this.data.member.nickName + '&img=' + this.data.member.img,
                })
            }
        })
    },

    //点击'我的二维码'
    invitee: function() {
        let that = this;
        let img = app.globalData.inviteeImg;
        console.log('img', img)
        if (img == undefined) {
            console.log('初次调用二维码')
            // 用户二维码
            app.getApiData({
                url: '/member/show',
                method: 'POST',
                data: {
                    openId: that.data.member.openId
                },
                header: 'application/x-www-form-urlencoded',
                success: (response) => {
                    wx.hideLoading();
                    console.log('二维码', response)
                    that.setData({
                        inviteeImg: response.data,
                        invitee: !that.data.invitee,
                    })
                    app.globalData.inviteeImg = response.data
                }
            })
        } else {
            console.log('再次调用二维码')
            that.setData({
                inviteeImg: img,
                invitee: !that.data.invitee,
            })
        }
    },
    tapinfo: function() {
        const that = this;
        //同步存入的用户个人信息
        app.getApiData({
            url: '/my/info',
            method: 'POST',
            data: {
                openId: app.globalData.openId
            },
            header: 'application/x-www-form-urlencoded',
            success: (response) => {
                wx.hideLoading();
                app.globalData.member = response.data;
                this.setData({
                    member: response.data
                });
                wx.setStorageSync('member', response.data); //本地存储
                let id = app.globalData.member.id
                that.createWebsocket(id)
            }
        })

    },
    // 建立websocket连接
    createWebsocket: function(id) {
        let that = this;
        wx.connectSocket({
            // url: 'ws://192.168.1.189:8080/badminton/myHandler?info=' + id,
            url: 'wss://www.yulele.club/badminton/myHandler?info=' + id,
            // header: {
            //   'Sec-WebSocket-Protocol': this._protocols    //need add this
            // },
            // protocols: this._protocols,
            success: res => {
                console.log('连接成功');
            }
        })
        // 监听通道打开，第一次传递个人信息
        wx.onSocketOpen(function(res) {
            console.log(res);
        })
        wx.onSocketMessage(function(res) {
            console.log('收到服务器内容：' + res.data)
            that.setData({
                red: res.data
            })
            if (res.data == 'red') {
                wx.showModal({
                    title: '待确认的比赛',
                    content: '是否查看待确认的比赛?',
                    cancelText: "否",
                    confirmText: "是",
                    success: function(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            wx.navigateTo({
                                url: '../myMessage/myMessage?id=' + that.data.member.id
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
        })
    },

})