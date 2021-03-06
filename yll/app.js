//app.js
App({
    globalData: {
        // apiUrl: 'http://192.168.1.189:8080/badminton',
        // apiUrl: 'http://39.108.88.109/badminton',
        apiUrl: 'https://www.yulele.club/badminton',
        phoneNumber: 13000000000
    },
    onLaunch: function() {
        // 登录
        var that = this;
        // this.toLogin()
        //获取屏幕宽高
        wx.getSystemInfo({
            success: function(res) {
                that.globalData.pageW = res.windowWidth;
                that.globalData.pageH = res.windowHeight;
                that.globalData.pixelRatio = res.pixelRatio;
            }
        })
        //获取openid
        // let log = wx.getStorage({
        //     key:'openid',
        //     success: function (res) {
        //         that.globalData.openid = res.data.openId;
        //         that.globalData.has = res.data.has;
        //         that.globalData.member = res.data.member;
        //     },
        //     fail: function (res) {

        //     }   
        // })


    },
    toLogin: function() {
        let that = this;
        return  new  Promise(function (resolve,  reject)  {
            wx.login({
                success: res => {
                    console.log(res)
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    wx.request({
                        url: that.globalData.apiUrl + '/api/client/info',
                        method: 'POST',
                        data: {
                            jsCode: res.code,
                        },
                        header: {
                            "content-type": 'application/x-www-form-urlencoded'
                        },
                        success: res => {
                            console.log(res);
                            var user = res.data;
                            console.log('获取openid', res.data.data);
                            that.globalData.openId = res.data.data.openId //全局储存openId 
                            that.globalData.has = res.data.data.has;
                            // that.globalData.member = res.data.data.member;   //用户基本信息

                            wx.setStorageSync('openid', res.data.data); //本地存储userID
                            var  res  =   {                      
                                status:  200,
                                data:  res.data                  
                            }                    
                            resolve(res);
                            console.log(res.data.data.has);
                            if (!res.data.data.has) {
                                wx.navigateTo({
                                    url: '../login/login',
                                })
                            }

                            // 用户二维码
                            // this.getApiData({
                            //     url: '/member/show',
                            //     method: 'POST',
                            //     data: { openId	: res.data.data.openId},
                            //     header: 'application/x-www-form-urlencoded',
                            //     success: (response) => {
                            //         wx.hideLoading();
                            //         console.log('二维码', response)
                            //         that.globalData.inviteeImg = response.data
                            //     }
                            // })
                        },
                        fail: function(res) {
                            console.log('openId获取失败', res);
                        }
                    })
                }
            });
        });
    },
    //浮窗电话
    tel: function() {
        let _self = this;
        wx.makePhoneCall({
            phoneNumber: this.globalData.phoneNumber,
        })
    },
    //请求接口
    getApiData: function(options) {
        let _self = this;
        wx.showLoading({
            title: '请稍后',
            mask: true
        });
        let method = (options.method) ? options.method : 'GET';
        let contentType = (options.header) ? options.header : 'application/json';
        let param = {
            url: _self.globalData.apiUrl + options.url,
            data: options.data,
            method: method,
            header: {
                'content-type': contentType // 默认值
            }
        }
        console.log(param)
        wx.request({
            url: _self.globalData.apiUrl + options.url,
            data: options.data,
            method: method,
            header: {
                'content-type': contentType // 默认值
            },
            success: function(res) {
                if (res.data.status == 200) {
                    options.success(res.data);
                } else {
                    wx.showToast({
                        title: '网络不太给力哦！',
                    })
                }
            }
        })
    },
})