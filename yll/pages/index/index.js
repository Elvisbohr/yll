//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        // user: false,
        initiator: false,
        inviteeImg: '',
        red: ''     //未读消息
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
                that.createWebsocket(id)
            }
        })
        
    },
    // 页面卸载
    onHide: function () {
        console.log('WebSocket 已关闭！')
        wx.closeSocket();
        wx.stopBackgroundAudio();
        wx.onSocketClose(function (res) {
            console.log('WebSocket 已关闭！')
        })
    },
    //点击跳转到发起比赛页
    initiate() {
        app.getApiData({
            url: '/game/start',
            method: 'POST',
            data: {
                openId: app.globalData.openId
            },
            header: 'application/x-www-form-urlencoded',
            success: (response) => {
                wx.hideLoading();
                wx.navigateTo({
                    url: '../belnningGame/belnningGame?id=' + this.data.member.id + '&name=' + this.data.member.nickName + '&img=' + this.data.member.img,
                })
            }
        })

    },

    //点击'我的二维码'
    invitee() {
        let that = this;
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
                this.setData({
                    inviteeImg: response.data,
                    invitee: !this.data.invitee,
                })
                app.globalData.inviteeImg = response.data
            }
        })

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
    createWebsocket: function (id) {
        let that = this;
        wx.connectSocket({
            // url: 'ws://192.168.1.189:8080/badminton/myHandler?info=' + id,
            url: 'wss://www.yulele.club/badminton/myHandler?info='+id,
            // header: {
            //   'Sec-WebSocket-Protocol': this._protocols    //need add this
            // },
            // protocols: this._protocols,
            success: res => {
                console.log('连接成功');
            }
        })
        // 监听通道打开，第一次传递个人信息
        wx.onSocketOpen(function (res) {
            console.log(res);
        })
        wx.onSocketMessage(function (res) {
            console.log('收到服务器内容：' + res.data)
            that.setData({
                red: res.data
            })
        })
    },
    
})