import axios from 'axios'
import config from './config'
import store from '../store'

const AxiosInst = axios.create(config)

// http request 拦截器
AxiosInst.interceptors.request.use(
    config => {
        if (store.state.common.token.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${store.state.common.token.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })

// http response 拦截器
AxiosInst.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)   // 返回接口返回的错误信息
    })

export default AxiosInst
