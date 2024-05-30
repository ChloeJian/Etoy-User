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

    // 查询数据
    const result0 = await db.collection('Borrow_Return').where({
      _openid:_openid,
      toy_id:toy_id
    }).get()

    // 更新数据
    await db.collection('Borrow_Return').doc(result0.data[0]._id).update({
      data: {
        apply_ret: false,
        time_apply_ret: null
      }
    })

    const result = await db.collection('Borrow_Return').where({
      _openid:_openid,
      toy_id:toy_id
    }).get()
    // 返回更新后的结果
    return result
  } catch (error) {
    // 返回错误信息
    return error
  }
}