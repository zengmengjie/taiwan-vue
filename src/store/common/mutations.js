/**
 * Created by lynnnnnnnn on 2017/3/11.
 */
import * as func from '../function'
import * as types from '../types'
// import crypto from '../../libs/crypto'

export default {
    [types.LOGIN] (state, {userInfo, token}) {
        state.token = token
        state.userInfo = userInfo
        func.token.set(token)
        func.userInfo.set(userInfo)
    },
    [types.SITE] (state, site) {
        state.site = site
        state.title = site.title
        func.site.set(site)
    },
    [types.TITLE] (state, title) {
        state.title = title
    }
}
