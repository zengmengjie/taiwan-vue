import {
  format
} from 'date-fns'
let filters = {
  date: function (value) {
    return value ? format(value * 1000, 'YYYY-MM-DD HH:mm:ss') : 'N'
    // return value ? Moment().format('yyyy-MM-dd hh:mm:ss') : 'N'
  },
  todatDate: function () {
    return format(new Date(), 'YYYY-MM-DD')
    // return Moment().format('YYYY-MM-DD')
  },
  ip: function (value) {
    let data = value.split('.')
    return value ? data[0] + '.*.*.' + data[3] : 'N'
  },
  name: function (value) {
    let flag = /[\u4E00-\u9FA5]/
    if (flag.test(value)) {
      return value ? value.replace(/.(?=.)/g, '*') : '匿名'
    } else {
      return value ? value.replace(/.(?=.{4})/g, '*') : '***TENG'
    }
  },
  mobile: function (value) {
    return value ? value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '未绑定'
  },
  isN: function (value) {
    return value || 'N'
  },
  sex: function (value) {
    return value === 0 ? '保密' : value === 1 ? '男' : value === 2 ? '女' : ''
  },
  yuan: function (value) {
    return !isNaN(value) ? 'NT$ ' + value.toFixed(2) : value
  },
  money: function (value) {
    value = Number(value)
    return value.toFixed(2)
  },
  orderStatus: function (value) {
    const typeMap = {
      0: '待确认',
      1: '已确认',
      2: '已收货',
      3: '已取消'
    }
    return typeMap[value]
  }
}

export default filters
