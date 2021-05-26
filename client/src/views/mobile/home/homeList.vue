<style  lang='scss' scoped src="@mobileTheme/home/index.scss">
</style>

<template>
    <div>
        <div class="home_panel">
            <div class="home_panel_hd">特價下殺</div>
            <div class="home_panel_bd">
                <van-list class="list-box" v-model="loading" :finished="finished" @load="loadMore">
                    <ul class="home_goods_ul">
                        <li v-for="(goods, index) in goodsList" :key="index" @click="toGoodsInfo(goods.sn)">
                            <div class="item">
                                <div class="home_goods_img">
                                    <img v-lazy="goods.img">
                                </div>
                                <div class="home_goods_pricebar">
                                    <span>{{ goods.price |yuan}}</span>
                                    <del class="am-text-gary">{{goods.market_price | yuan}}</del>
                                </div>
                                <div class="home_goods_namebar">{{ goods.title }}</div>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </div>
        </div>
    </div>

</template>

<script>

import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            pagination: {
                total: 0,
                pageIndex: 1,
                pageSize: 4
            },
            goodsList: [],
            loading: false,
            finished: false
        }
    },
    mounted() {
        this.$analytics.fbq.init(this.site.pix)
        this.$analytics.fbq.event('PageView')
    },
    computed: {
        ...mapGetters(['site'])
    },
    methods: {
        onLoad() {
            this.request('GoodsList', this.pagination).then((res) => {
                if (res.code === 200) {
                    this.pagination.pageIndex++
                    this.pagination.total = res.data.total
                    res.data.pageData.forEach(goods => {
                        this.goodsList.push({
                            sn: goods.goods_sn,
                            img: goods.image_url,
                            title: goods.goods_name,
                            price: Number(goods.shop_price),
                            market_price: Number(goods.market_price)
                        })
                    })
                    this.loading = false
                }
            })
        },
        loadMore() {
            if (this.pagination.pageIndex > 1 && this.pagination.pageIndex > Math.ceil(this.pagination.total / this.pagination.pageSize)) {
                this.$nextTick(() => {
                    this.finished = true
                    this.loading = false
                })
            } else {
                this.onLoad()
            }
        },
        toGoodsInfo(sn) {
            this.$router.push({
                name: 'goods',
                params: {
                    id: sn
                }
            })
        }
    }
}

</script>
