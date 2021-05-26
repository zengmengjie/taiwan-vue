/**
 * Created by lynnnnnnnn on 2017/4/1.
 */
const LocalEvent = function (item) {
    this.get = function () {
        return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
    }
    this.set = function (obj) {
        localStorage.setItem(item, JSON.stringify(obj))
    }
    this.clear = function () {
        localStorage.removeItem(item)
    }
}

const SessionEvent = function (item) {
    this.get = function () {
        return sessionStorage.getItem(item) ? JSON.parse(sessionStorage.getItem(item)) : ''
    }
    this.set = function (obj) {
        sessionStorage.setItem(item, JSON.stringify(obj))
    }
    this.clear = function () {
        sessionStorage.removeItem(item)
    }
}
export const token = new LocalEvent('token')
export const userInfo = new LocalEvent('user_info')

export const site = new SessionEvent('site')
export const cart = new SessionEvent('cart')

export const getDate = () => { //获取当天日期
    const date = new Date()
    const mouth = parseInt(date.getMonth()) + 1
    return date.getFullYear() + '-' + mouth + '-' + date.getDate()
}
