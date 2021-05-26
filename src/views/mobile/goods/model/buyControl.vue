<template>

    <div class="buy_control">
        <div class="details_goods_info">
            <div class="details_pricebar">
                <div class="subleft avil">
                    <div class="price">{{dollar}}
                        <strong class="small">{{goods.shop_price}}</strong>
                    </div>
                    <div class="information">
                        <div class="soldcount">
                            <span>{{goods.sales_number}}</span>件已賣出
                        </div>
                        <div class="oprice">
                            <del>{{dollar}} {{goods.market_price}}</del>
                        </div>
                    </div>
                </div>
                <div class="details_countdown">
                    <div class="txt">{{$t('limited_hour')}}</div>
                    <yd-countdown
                        slot="right"
                        :time="countDown"
                        timetype="second"
                        class="clockrun"
                    >
                        <span class="num">{%h1}{%h2}</span>
                        <span class="dot">{{ $t("h") }}</span>
                        <span class="num">{%m1}{%m2}</span>
                        <span class="dot">{{ $t("m") }}</span>
                        <span class="num">{%s1}{%s2}</span>
                        <span class="dot">{{ $t("s") }}</span>
                    </yd-countdown>
                </div>
            </div>
            <div class="details_goods_name">{{goods.goods_name}}</div>
            <div class="details_goods_desc">{{goods.remark}}</div>
            <div class="item_info">
                <ul class="showtagnames">
                    <li>宅配到家</li>
                    <li>免宅配費</li>
                    <li>貨到付款</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import YdCountdown from '@/components/Countdown'
import common from '@/libs/common'

import {
    mapActions, mapGetters
}
    from 'vuex'
export default {
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            goods: {}
        }
    },
    watch: {
        value(val) {
            this.goods = val
        }
    },
    computed: {
        ...mapGetters(['site']),
        countDown: function () {
            if (this.goods.countdown != 0) {
                return this.goods.countdown * 3600
            } else {
                return this.$_.random(1800, 3600)
            }
        },
        dollar: function () {
            return common.dollar(this.site.locale)
        }
    },
    components: {
        YdCountdown
    }
}
</script>

<style lang='scss' scoped src="@mobileTheme/goods/goodsInfo.scss">
</style>
