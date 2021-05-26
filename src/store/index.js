import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import cart from './cart'
import goodsOrder from './goodsOrder'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common,
        cart,
        goodsOrder
    }
})
