import Qs from 'qs'
import Api from './api'

export default {
    baseURL: Api.domain,
    timeout: 60000,
    withCredentials: true, //`withCredentails`选项表明了是否是跨域请求
    transformRequest: [function(data) {
        // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，
        // 这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
        // 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
        if (data) {
            data.CustData = JSON.stringify(data.CustData)
            //由于使用的form-data传数据所以要格式化
            data = Qs.stringify(data)
        }
        return data
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'Fp-Web-Host': window.location.host
    },
    paramsSerializer: function(params) {
        return Qs.stringify(params)
    },
    //返回数据类型
    responseType: 'json'
}
