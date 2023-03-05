//处理业务逻辑的中间件，读取某个json文件的数据
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx,next) => {
    //根据url获取json所在文件，统一url命名/api/name   name与data文件夹下文件名保持一致
    const url = ctx.request.url
    let filePath = url.replace('/api','')
    //获取相对路径
    filePath = '../data' + filePath + '.json'
    //拼接path获取绝对路径
    filePath = path.join(__dirname, filePath)
    console.log(filePath)

    try {
        //获取Promise成功后的返回对象
        const ret = await fileUtils.getFileJsonData(filePath)
        //从文件中读取数据塞进响应体
        ctx.response.body = ret 
    } catch (error) {
        const errorMsg = {
            message: '读取文件内容失败，文件资源不存在',
            status:404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }
    console.log(filePath)
    await next()
}