/**
 * Created by lynnnnnnnn on 2017/3/11.
 */
import * as func from '../function.js'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
        cart: func.cart.get() || []
    }

export default {
    state,
    actions,
    mutations,
    getters
}
