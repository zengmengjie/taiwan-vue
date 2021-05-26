/**
 * Created by lynnnnnnnn on 2017/8/15.
 */

import methodMap from './methodMap'
import AxiosInst from './axios'
import router from '../router'

class Http {}

Http.install = function (Vue, opts = {}) {
    let that = this
    that.format = opts.format && opts.format.toLowerCase()

    /**
     * 全局请求接口
     * @param method 方法
     * @param opts 参数
     * @param toast 是否提示
     * @returns {string}
     */
    Vue.prototype.request = function (method, opts, toast) {
        //如果有给 toast 参数则显示 loading 加载数据
        if (toast && typeof (toast) === 'boolean') {
            Vue.prototype.$loading('加载中...')
        } else if (toast && typeof (toast) === 'string') {
            Vue.prototype.$loading(toast)
        }
        let m = methodMap[method]
        if (m) {
            var optsType = typeof (opts)
            if (optsType === null || optsType !== 'object') {
                opts = {}
            }
            if (m.method === 'get') {
                return Vue.prototype.apiGet(m.url, opts)
            } else if (m.method === 'post') {
                return Vue.prototype.apiPost(m.url, opts)
            } else {
                return '非法请求'
            }
        } else {
            closeLoading()
            console.log('url 错误', '返回结果：err = ', '无法请求，无效的请求！', '\n')
        }
    }

    /**
     * POST 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiPost = function(url, data, toast = false) {
        if (toast && typeof (toast) === 'boolean') {
            Vue.prototype.$loading('加载中...')
        } else if (toast && typeof (toast) === 'string') {
            Vue.prototype.$loading(toast)
        }
        return new Promise((resolve, reject) => {
            AxiosInst.post(url, data).then((response) => {
                let result = response.data
                if (that.format === 'json') {
                    if (typeof (result.data) == 'string' && result.data) {
                        result.data = JSON.parse(result.data)
                    }
                }
                closeLoading()
                Vue.prototype.response(result)
                resolve(result)
            }).catch((response) => {
                this.$message.error('服务请求出错')
                console.log('Customize Notice', response)
                closeLoading()
                reject(response)
            })
        })
    }

    /**
     * GET 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiGet = function(url, data, toast = false) {
        if (toast && typeof (toast) === 'boolean') {
            Vue.prototype.$loading('加载中...')
        } else if (toast && typeof (toast) === 'string') {
            Vue.prototype.$loading(toast)
        }
        return new Promise((resolve, reject) => {
            AxiosInst.get(url, {
                params: data
            }).then((response) => {
                let result = response.data
                if (that.format === 'json') {
                    if (typeof (result.data) == 'string' && result.data) {
                        result.data = JSON.parse(result.data)
                    }
                }
                closeLoading()
                Vue.prototype.response(result)
                resolve(result)
            }).catch((response) => {
                this.$message.error('服务请求出错')
                console.log('Customize Notice', response)
                closeLoading()
                reject(response)
            })
        })
    }

    /**
     * 关闭方法
     */
    function closeLoading() {
        Vue.prototype.$loading.close()
    }

    /**
     * 返回码检查
     * @param data
     * @returns {boolean}
     */
    Vue.prototype.response = function (data) {
        if (data === null) {
            this.$message.error('接口输出异常...')
            setTimeout(() => closeLoading(), 800)
            return false
        }
        //商户端错误码
        if (data.code === 401) {
            this.$message.error(data.message)
            setTimeout(() => closeLoading(), 800)
            router.replace({path: '/no-auth'})
            return false
        }
        //没有权限 或 其他
        if (data.code !== 200) {
            this.$message.error(data.message)
            setTimeout(() => closeLoading(), 800)
            return false
        }
        setTimeout(() => closeLoading(), 800)
    }
}

export default Http
