// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取数据库引用
    const db = cloud.database()
    // 获取基础信息
    const wxContext = cloud.getWXContext();
    const _openid=wxContext.OPENID;

    // 
    const {data: resBR} = await db.collection('Borrow_Return').where({
      _openid: _openid,
      pass_brw: true,
      pass_ret: true
    }).get()
    
    // 
    const toys = []
    for (let i = 0; i < resBR.length; i++) {
      const toyInfo = await db.collection('Toy').where({
        _id: resBR[i].toy_id
      }).get();
      // toy现在是一个对象元素
      const [toy]=toyInfo.data;
      toys.push(toy)
    }

    // 返回活动信息
    return {
      code: 0,
      message: '查询成功',
      data: toys
    }
  } catch (err) {
    // 返回错误信息
    return {
      code: -1,
      message: '查询失败',
      error: err
    }
  }
}
