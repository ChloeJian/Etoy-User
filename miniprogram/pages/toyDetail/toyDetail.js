const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toy:{},
    borrow_return: null,
    collect: null,
    commentList:{},
    _openid:"",
    status:"Detail"
  },

  onChange(event) {
    wx.showLoading({
      title: '加载中',
    })
   this.setData({
     status:`${event.detail.name}`
   })
   wx.hideLoading()
  },

  collect: function(){
    wx.cloud.callFunction({
      name: 'collect',
      data:{
        toy_id:this.data.toy._id,
        _openid:this.data._openid
      }
    }).then(res => {
      this.setData({
        collect:res.result.data[0]
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  collectRemove: function(){
    wx.cloud.callFunction({
      name: 'collectRemove',
      data:{
        toy_id:this.data.toy._id,
        _openid:this.data._openid
      }
    }).then(res => {
      this.setData({
        collect: null
      })
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 2000
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  borrowApply: function(){
    wx.showLoading({
      title: '加载中',
    })
    const borrow_return = this.data.borrow_return;
    const toy = this.data.toy;
    if(borrow_return != null){
      wx.showToast({
        title: '不可重复申请',
        duration: 2000
      })
      wx.hideLoading()
    }else if(toy.toy_current<0){
      wx.showToast({
        title: '库存不足',
        duration: 2000
      })
      wx.hideLoading()
    }else{
      wx.cloud.callFunction({
        name: 'borrowApply',
        data:{
          toy_id:this.data.toy._id,
          _openid:this.data._openid
        }
      }).then(res => {
        console.log(res.result.data[0])
        this.setData({
          borrow_return:res.result.data[0]
        })
        wx.showToast({
          title: '成功申请借玩',
          icon: 'success',
          duration: 2000
        })
        wx.hideLoading()
      }).catch(err => {
        console.error(err)
        wx.showToast({
          title: '申请借玩失败',
          duration: 2000
        })
        wx.hideLoading()
      })
    }
  },

  borrowApplyRemove: function(){
    wx.showLoading({
      title: '加载中',
    })
    const borrow_return = this.data.borrow_return;
    if(borrow_return == null){
      wx.showToast({
        title: '尚未申请借玩',
        duration: 2000
      })
      wx.hideLoading()
    }else{
      wx.cloud.callFunction({
        name: 'borrowApplyRemove',
        data:{
          toy_id:this.data.toy._id,
          _openid:this.data._openid
        }
      }).then(res => {
        this.setData({
          borrow_return: null
        })
        wx.showToast({
          title: '取消申请成功',
          icon: 'success',
          duration: 2000
        })
        wx.hideLoading()
      }).catch(err => {
        console.error(err)
        wx.showToast({
          title: '取消申请失败',
          duration: 2000
        })
        wx.hideLoading()
      })
    }
  },

  returnApply: function(){
    wx.showLoading({
      title: '加载中',
    })
    const borrow_return = this.data.borrow_return;
    if(borrow_return == null){
      wx.showToast({
        title: '尚未申请借玩',
        duration: 2000
      })
      wx.hideLoading()
    }else if(borrow_return.pass_brw === false){
      wx.showToast({
        title: '不在借玩中',
        duration: 2000
      })
      wx.hideLoading()
    }else{
      wx.cloud.callFunction({
        name: 'returnApply',
        data:{
          toy_id:this.data.toy._id,
          _openid:this.data._openid
        }
      }).then(res => {
        console.log(res.result.data[0])
        this.setData({
          borrow_return:res.result.data[0]
        })
        wx.showToast({
          title: '成功申请退玩',
          icon: 'success',
          duration: 2000
        })
        wx.hideLoading()
      }).catch(err => {
        console.error(err)
        wx.showToast({
          title: '申请退玩失败',
          duration: 2000
        })
        wx.hideLoading()
      })
    }
  },

  returnApplyRemove: function(){
    wx.showLoading({
      title: '加载中',
    })
    const borrow_return = this.data.borrow_return;
    if(borrow_return == null){
      wx.showToast({
        title: '尚未申请借玩',
        duration: 2000
      })
      wx.hideLoading()
    }else{
      wx.cloud.callFunction({
        name: 'returnApplyRemove',
        data:{
          toy_id:this.data.toy._id,
          _openid:this.data._openid
        }
      }).then(res => {
        console.log(res.result.data[0])
        this.setData({
          borrow_return:res.result.data[0]
        })
        wx.showToast({
          title: '取消申请成功',
          icon: 'success',
          duration: 2000
        })
        wx.hideLoading()
      }).catch(err => {
        console.error(err)
        wx.showToast({
          title: '取消申请失败',
          duration: 2000
        })
        wx.hideLoading()
      })
    }
  },

  update: function(e){
    console.log(e.myComment)
    if(e.myComment.length == 0)
    {
      wx.showToast({
        icon:'none',
        title: '评价不能为空',
      })
      return
    }
    db.collection('Borrow_Return').where({
      _openid: this.data._openid,
      toy_id:this.data.toy._id
    }).update({
      data: {
        comment: e.myComment,
        time_comment: new Date().toLocaleDateString(),
      }
    }).then(res=>{
      console.log(res);
      wx.showToast({
        title: '评价成功',
        icon: 'success',
        duration: 2000
      })
      wx.reLaunch({
        url: `../myComment/myComment`
      })
    }).catch(err=>{
      console.log(err);
    })
  },

  commentSubmit:function(e){
    //表单返回的所有数据
    var formData=e.detail.value;
    this.update(formData)
  },

  onLoad: async function(options) {
    try {
      console.log(options.t_id)
      wx.showLoading({
        title: '加载中',
      })
      // 1
      const resToy = await wx.cloud.callFunction({
        name: 'getOneToy',
        data:{
          t_id:options.t_id
        }
      });
      this.setData({
        toy: resToy.result.data
      })
      // 2
      const resOpenId = await wx.cloud.callFunction({
        name: 'getOpenId'
      });
      this.setData({
        _openid: resOpenId.result.openid
      })
      // 3
      const resBR = await wx.cloud.callFunction({
        name: 'getBR',
        data:{
          toy_id:options.t_id,
          _openid:this.data._openid
        }
      });
      this.setData({
        borrow_return: resBR.result.data[0]
      })
      // 4
      const resCollect = await wx.cloud.callFunction({
        name: 'getCollect',
        data:{
          toy_id:options.t_id,
          _openid:this.data._openid
        }
      });
      this.setData({
        collect: resCollect.result.data[0]
      })
      // 5
      const resCom = await wx.cloud.callFunction({
        name: 'commentsOfToy',
        data:{
          toy_id: options.t_id
        }
      });
      this.setData({
        commentList: resCom.result.data
      })
      wx.hideLoading();
    } catch (err) {
      console.error(err);
      wx.hideLoading();
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