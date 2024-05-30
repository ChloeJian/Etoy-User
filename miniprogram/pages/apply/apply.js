// pages/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toyList:[]
  },

  onChange(event) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: `get${event.detail.name}Apply`,
    }).then(res => {
      this.setData({
        toyList: res.result.data
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  gotoDetail: function(event){
    wx.navigateTo({
      url: `../toyDetail/toyDetail?t_id=${event.target.dataset.t_id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getBorrowApply',
    }).then(res => {
      this.setData({
        toyList: res.result.data
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
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