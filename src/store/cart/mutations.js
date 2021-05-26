/**
 * Created by lynnnnnnnn on 2017/3/11.
 */
import Vue from 'vue'
import * as func from '../function'
import * as types from '../types'

export default {
    [types.ADD_CART] (state, {goods, prom, gifts, isAdd}) {
        let cgoods = state.cart.find(g => g.goods_sn == goods.goods_sn)
        // if (!cgoods && state.cart.length > 0) {
        //     state.cart = []
        // }
        if (cgoods) {
            if (!isAdd) { return }
            let sku = cgoods.skus.find(s => s.spec_key == goods.spec_key)
            if (sku) {
                sku.number += goods.number
            } else {
                cgoods.skus.push(goods)
            }

            if (gifts && gifts.length > 0) {
                gifts.forEach(gift => {
                    cgoods.gifts.push(gift)
                })
            }
        } else {
            let g = {
                id: goods.id,
                goods_sn: goods.goods_sn,
                shop_price: goods.shop_price,
                goods_name: goods.goods_name,
                skus: [goods]
            }

            if (prom) {
                Vue.set(g, 'prom', prom)
            }
            if (gifts && gifts.length > 0) {
                Vue.set(g, 'gifts', gifts)
            }
            state.cart.push(g)
        }
        func.cart.set(state.cart)
    },
    [types.REMOVE_CART] (state, {sn, j}) {
        let cgoods = state.cart.find(g => g.goods_sn == sn)
        if (!cgoods) return
        if (cgoods.skus.length > 1 && j > -1) {
            if (cgoods.gifts) {
                cgoods.gifts.splice(-1, cgoods.skus[j].number)
            }
            cgoods.skus.splice(j, 1)
        } else {
            state.cart.splice(state.cart.findIndex(g => g.goods_sn == sn), 1)
        }
        func.cart.set(state.cart)
    },
    [types.CLEAR_CART] (state) {
        state.cart = []
        func.cart.set(state.cart)
    }
}
