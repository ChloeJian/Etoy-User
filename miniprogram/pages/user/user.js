// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _openid:"",
    user:{}
  },

  getOpenId: function () {  
    // 返回一个 Promise，以便在调用处使用 await 等待  
    return new Promise((resolve, reject) => {  
      wx.showLoading({  
        title: '加载中',  
      });  
      wx.cloud.callFunction({  
        name: 'getOpenId',  
      }).then(res => {  
        console.log(res.result.openid);  
        this.setData({  
          _openid: res.result.openid  
        });  
        wx.hideLoading();  
        resolve(); // 异步操作成功完成，调用 resolve  
      }).catch(err => {  
        console.error(err);  
        wx.hideLoading();  
        reject(err); // 异步操作失败，调用 reject 并传递错误  
      });  
    });  
  },  
  
  getOneUser: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getOneUser',
      data:{
        _openid: this.data._openid
      }
    }).then(res => {
      console.log(res.result.data[0])
      this.setData({
        user:res.result.data[0]
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
  
  async onLoad(options) {  
    try {  
      // 使用 await 等待 getOpenId 完成  
      await this.getOpenId();  
      // getOpenId 完成后再调用 getOneUser  
      this.getOneUser();  
    } catch (err) {  
      console.log(err);  
    }  
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})