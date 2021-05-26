/**
 * Created by lynnnnnnnn on 2017/3/11.
 */
import * as func from '../function'
import * as types from '../types'
// import crypto from '../../libs/crypto'

export default {
    [types.ORDER] (state, order) {
        state.order = order
    }
}
