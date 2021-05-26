/**
 * Created by lynnnnnnnn on 2017/4/1.
 */
import * as types from '../types'

export default {
    addCart ({commit}, {goods, prom, gifts, isAdd}) {
        commit(types.ADD_CART, {goods, prom, gifts, isAdd})
    },
    removeCart ({commit}, {sn, j = -1}) {
        commit(types.REMOVE_CART, {sn, j})
    },
    clearCart ({commit}) {
        commit(types.CLEAR_CART)
    }
}
