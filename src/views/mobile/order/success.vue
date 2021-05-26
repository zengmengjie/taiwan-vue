<template>

    <div class="success_bg">
        <div
            class="home_panel"
            style="overflow-y: auto;max-height: 100%;"
        >
            <div class="home_panel_bd">
                <div class="orderinfo_title am-text-success">
                    <em class="ok">&nbsp;</em>您好，恭喜您已經成功訂購哦！
                </div>
                <div class="orderinfo_info">
                    <div>訂單號：
                        <span class="am-text-danger orderinfo_orderid">{{order.order_sn}}</span>
                    </div>
                    <div>商　品：
                        <span class="orderinfo_goodsname">
                            <div
                                v-for="goods in order.goods"
                                :key="goods"
                            >
                                <span>{{goods.goods_name}}</span>
                                <span>{{goods.goods_spec}}</span>
                                <span>x {{goods.goods_num}}</span>
                            </div>
                        </span>
                    </div>
                    <div>金　額：
                        <span class="am-text-danger orderinfo_orderprice">{{dollar}}{{order.order_amount | money}}</span>
                    </div>
                </div>
                <p class="orderinfo_warninfo am-text-warning">
                    ★ 我們採用專業配送！如果您臨時不在可以等配送員打電話給你改約收件時間即可。<br> ★ 收到貨品後有任何問題請聯絡在線客服處理，謝謝！<br>
                </p>
                <router-link
                    :to="{name: 'home'}"
                    class="btn btn-danger orderinfo_btn"
                >繼續逛逛</router-link>
            </div>
        </div>
    </div>

</template>

<script>

import {
    mapGetters,
    mapActions
}
    from 'vuex'
import common from '@/libs/common'
export default {
    data() {
        return {
            order: {}
        }
    },
    mounted() {
        /* eslint-disable */
        this.order = this.$route.params.order
    },
    created() {
        if (!this.order) {
            this.$router.replace({
                name: 'mobile'
            })
        } else {
            this.$analytics.fbq.init(this.site.pix)
            this.$analytics.fbq.event('Purchase', {
                value: this.order.order_amount,
                currency: this.dollar
            })

        }
        this.$i18n.locale = this.site.locale
    },
    methods: {
        ...mapActions(['setGoodsOrder']),
        routerback: function () {
            this.$router.push({
                name: 'mobile',
                params: {
                    id: this.$route.params.id
                }
            })
        }
    },
    computed: {
        ...mapGetters(['order', 'site']),
        dollar: function () {
            return common.dollar(this.site.locale)
        }
    }
}
window._lt('send', 'cv', {
    type: 'Conversion'
}, ['9f68ea47-c696-49b6-ba5f-07ca54afcf13'])
window._lt('send', 'cv', {
    type: 'Conversion'
}, ['b4d67d64-1ca2-435a-97a7-4d7a75809e4e'])
window._lt('send', 'cv', {
    type: 'Conversion'
}, ['688a9afa-2690-4d7e-8208-466f2a8109bb'])
</script>

<style lang='scss' scoped>
.success_bg {
    width: 100%;
    height: calc(100vh);
    background-color: #fff;
    .orderinfo_title {
        padding: 28px 10px 20px 5px;
        text-align: center;
        &.am-text-success {
            color: #1ec23b;
        }
        .ok {
            padding: 28px;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAMAAACfvvDEAAAAS1BMVEUAAABrwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9rwz9BtjBGAAAAGHRSTlMAUQkOer2F20n78y0gbDTpFgbHoMq1YMm7UA/eAAABZUlEQVR4XpVVWbLDIAxzCGsWmrXl/id91kwLpXU6PH0SYQvLdqjG6q1xQxqcsX6la/gtvWPzJKNz6ROuE3jxAUIw2k899ZPXJoD7iF8BcX7TCxUs+oa7H2FnnFlFNZTF/fmT6EZB0+hqasdE05OE3jA1C4iBiYpkKKaG17MOTt3TFXoWcOTcYaRrjOGVn+9Y+gXLOUHwXEf1k6m4rjCWvdYkY35+0CltRCurXGRiF54xFlaqkNzIxDiktBNABuntVfKJ1TmV01s6QRewsI/D02AkPlGjSXIRTX3P8VEnFiP4s8Luvdzj+MQnAnFPWSQAlhyTiRBZxax06nPKxCwy6yxvhxWDVvC5iCxvf6/nDIbzIGaRpZ6VR92QgEpk9qj2PWIaa5HF97qXJpcqkaWXvvpz2bLIuj+/e16dECn0vDBH9i7OUftsts97+w5p30vtu64IaNqfQDzEnXzE9j3//39H+//oD4GLJmWQ4Dx2AAAAAElFTkSuQmCC")
                no-repeat center;
        }
    }
    .orderinfo_info {
        margin-left: 15%;
        div {
            line-height: 24px;
        }
        .am-text-danger {
            color: #8666b8;
        }
    }
    .orderinfo_warninfo {
        padding: 15px;
        line-height: 21px;
        &.am-text-warning {
            color: #eba23a;
        }
    }
    .orderinfo_btn {
        display: block;
        width: 150px;
        height: 30px;
        line-height: 30px;
        margin: 0 auto 10px;
        &.btn-danger {
            color: #fff;
            border-color: #8666b8;
            background: #8666b8;
        }
    }
}
</style>