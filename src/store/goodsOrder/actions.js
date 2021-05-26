/**
 * Created by lynnnnnnnn on 2017/4/1.
 */
import * as types from '../types'

export default {
    setGoodsOrder ({commit}, order) {
        commit(types.ORDER, order)
    }
}
