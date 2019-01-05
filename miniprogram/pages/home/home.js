
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexmenu: [
      {
        'icon': './../../images/icon/笔记.png',
        'text': '随性笔记',
        'url': 'notes'
      },
      {
        'icon': './../../images/icon/倒计时.png',
        'text': '考试倒计时',
        'url': 'exam'
      },
      {
        'icon': './../../images/icon/查询.png',
        'text': '空教室查询',
        'url': 'search'
      },
      {
        'icon': './../../images/icon/文件.png',
        'text': '学习资源',
        'url': 'resource'
      },
      {
        'icon': './../../images/icon/四六级.png',
        'text': '四六级',
        'url': 'english'
      },
      {
        'icon': './../../images/icon/计算机等级.png',
        'text': '等级考试',
        'url': 'computer'
      },
      {
        'icon': './../../images/icon/更多.png',
        'text': '敬请期待'
      }
    ]
  },


  /**
   * 事件处理函数
   */

  // touchstart事件
  tap_start: function (e) { 
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },

  // touchmove事件
  tap_drag: function (e) {
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;
    }
    this.data.mark = this.data.newmark;
  },

  // touchend事件
  tap_end: function (e) { 
    this.data.mark = 0;
    this.data.newmark = 0;
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  },
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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