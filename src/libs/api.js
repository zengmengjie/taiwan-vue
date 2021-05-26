/**
 * Created by lynnnnnnnn on 2017/8/15.
 */
const Api = window.Api || {}
/** 主请求域名**/
Api.domain = process.env.NODE_ENV === 'production' ? '' : ''

export default Api
