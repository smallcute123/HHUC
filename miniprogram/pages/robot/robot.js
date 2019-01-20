// pages/robot/robot.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:" ",
    resp:" ",
    res:"你好呀！我是HHUC的智能小盒，陪伴你在每分每秒 ♥        小盒还可以回答你的任何疑问哦！",
    message: [],
    increase: false,   //图片添加区域隐藏
    aniStyle: true,    //动画效果
  },
  bindChange(res) {
    this.setData({
      msg: res.detail.value
    })
  },

  //隐藏菜单栏的控制
  increase() {
    if(this.data.increase==true){
      this.setData({
        increase: false,
      })
    }else{
      this.setData({
        increase: true,
        aniStyle: true
      })
    }
  },


  send:function(e){
    var newArray = [{ msg:this.data.msg, resp:this.data.res}];    
    //加到其他数据的后面
    this.setData({
      message: this.data.message.concat(newArray)
    });
    var flag = this
    if (this.data.msg.trim() == "") {
      wx.showToast({
        title: '消息不能为空哦~',
        icon: "none",
        duration: 2000
      })
    } else {
      setTimeout(function () {
        flag.setData({
          increase: false
        })
      }, 500)
      this.bottom()
    }
  },


  chooseImage() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],    // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://www.beamingsunshine.cn', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          headers: {
            'Content-Type': 'form-data'
          },
          success: function (res) {
            if (res.data) {
              that.setData({
                increase: false
              })
            /*  websocket.send('{"images":"' + res.data + '","date":"' + utils.formatTime(new Date()) + '","type":"image","nickName":"' + that.data.userInfo.nickName + '","avatarUrl":"' + that.data.userInfo.avatarUrl + '"}')   */
              that.bottom()
            }
          }
        })
      }
    })
  },

  bottom: function () {
    var query = wx.createSelectorQuery()
    query.select('#flag').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      wx.pageScrollTo({
        scrollTop: res[0].bottom  // #the-id节点的下边界坐标  
      })
      res[1].scrollTop // 显示区域的竖直滚动位置  
    })
  },  
  outbtn() {
    this.setData({
      increase: false,
      aniStyle: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: 'https://www.beamingsunshine.cn/',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res);
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
    

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})