//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        user: false,
        initiator: false
    },
    onLoad: function() {
        const that = this;
        //同步获取本地缓存里存入的用户是否保存过个人信息
        wx.getStorage({
            key: 'openid',
            success: function(res) {
                console.log(res.data.has)
                that.setData({
                    member: res.data.member,
                    user: res.data.has
                })
            }
        });

        let qdata = {};
        qdata.openId = app.globalData.openid;
        this.QR(qdata)

    },
    //点击跳转到发起比赛页
    initiate() {
        wx.navigateTo({
            url: '../belnningGame/belnningGame?id=' + this.data.member.id + '&name=' + this.data.member.nickName + '&img=' + this.data.member.img,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    //获取用户信息
    getuserinfo(e) {
        console.log('用户信息', e.detail.userInfo)
        wx.setStorageSync('userInfo', e.detail.userInfo); //本地存储userID 
        let data = {};
        data.openId = app.globalData.openid;
        data.nickName = e.detail.userInfo.nickName;
        data.img = e.detail.userInfo.avatarUrl;
        this.saveUser(data);
        var openid = wx.getStorageSync('openid');
        openid.has = true;
        wx.setStorageSync('openid', openid);
        app.globalData.has = true
        this.setData({
            user: true
        })
    },
    //保存用户信息
    saveUser(data) {
        app.getApiData({
            url: '/member/save',
            method: 'POST',
            data: data,
            header: 'application/x-www-form-urlencoded',
            success: (response) => {
                wx.hideLoading();
                console.log('response', response)
            }
        })
    },
    //点击'我的二维码'
    invitee() {
        this.setData({
            invitee: !this.data.invitee
        })
    },
    //获取'我的二维码'
    QR(data) {
        app.getApiData({
            url: '/member/show',
            method: 'POST',
            data: data,
            header: 'application/x-www-form-urlencoded',
            success: (response) => {
                wx.hideLoading();
                console.log('二维码', response)
                this.setData({
                    inviteeImg: response.data
                })
            }
        })
    }
})