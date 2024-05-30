Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList:[],
    toyList:[]
  },

  catesInit: async function () {  
    try {  
      // 显示加载提示  
      wx.showLoading({  
        title: '加载中',  
      });  
    
      // 调用云函数获取分类数据  
      const res = await wx.cloud.callFunction({  
        name: 'getCates',  
      });  
    
      // 将获取到的分类数据设置到页面数据中  
      await this.setData({  
        cateList: res.result.data,  
      });  
  
      // 根据第一个分类的ID获取玩具列表数据 
      const cate_id = await this.data.cateList[0]._id;
      const resToys = await wx.cloud.callFunction({
        name:'toysByCate',
        data:{
          c_id: cate_id
        }
      });

      // 将获取到的玩具列表数据设置到页面数据中  
      await this.setData({  
        toyList: resToys.result.data  
      });  

      wx.hideLoading(); 
    } catch (err) {  
      console.error(err);  
      wx.hideLoading();  
    }  
  },

  onChange(event) {
    wx.showLoading({
      title: '加载中',
    })
    const num=parseInt(`${event.detail}`);
    const cate_id=this.data.cateList[num]._id;
    console.log(cate_id);
    wx.cloud.callFunction({
      name:'toysByCate',
      data:{
        c_id:cate_id
      }
    }).then(res=>{
      console.log(res.result.data)
      this.setData({
        toyList: res.result.data,
      })
      wx.hideLoading()
    }).catch(err=>{
      console.err(error)
      wx.hideLoading()
    })
  },

  gotoDetail:function(event){
    wx.navigateTo({
      url: `../toyDetail/toyDetail?t_id=${event.target.dataset.t_id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.catesInit();
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