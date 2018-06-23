//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        // user: false,
        initiator: false,
        inviteeImg:'',
    },
    onLoad: function() {
        const that = this;
        //同步获取本地缓存里存入的用户是否保存过个人信息
        wx.getStorage({
            key: 'openid',
            success: function(res) {
                console.log(res.data.has)
                if(!res.data.has){
                    wx.navigateTo({
                        url: '../login/login',
                    })
                }
                that.setData({
                    member: res.data.member,
                })
            }
        });

     
    },
    //点击跳转到发起比赛页
    initiate() {
        app.getApiData({
            url: '/game/start',
            method: 'POST',
            data: { openId: app.globalData.openId },
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
        this.setData({
            inviteeImg: app.globalData.inviteeImg,            
            invitee: !this.data.invitee,
        })
    },
    
})