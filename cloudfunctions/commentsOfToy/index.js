// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取数据库引用
    const db = cloud.database()
    // 获取基础信息
    const toy_id = event.toy_id;


    // 查询
    const { data: resBR } = await db.collection('Borrow_Return').where({  
      toy_id: toy_id,  
      comment: { $ne: null } // 检查comment字段不为null  
    }).get();
    
    // 
    const targets = []
    for (let i = 0; i < resBR.length; i++) {
      const userInfo = await db.collection('User').where({
        _openid: resBR[i]._openid
      }).get();

      // user现在是一个对象元素
      const [user] = userInfo.data;
      const user_name = user.user_name;
      
      // target是一个对象元素
      const target = resBR[i];
      Object.assign(target, {user_name: user_name});
      targets.push(target)
    }

    // 返回活动信息
    return {
      code: 0,
      message: '查询成功',
      data: targets
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
