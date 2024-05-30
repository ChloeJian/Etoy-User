// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取数据库引用
    const db = cloud.database()
    const toy_id=event.toy_id;
    const _openid=event._openid;

    // 添加数据
    await db.collection('Collect').add({
      data: {
        _openid: _openid,
        toy_id: toy_id,
      }
    })

    // 查询数据
    const result = await db.collection('Collect').where({
        _openid: _openid,
        toy_id: toy_id
    }).get()

    // 返回查询结果
    return result
  } catch (error) {
    // 返回错误信息
    return error
  }
}