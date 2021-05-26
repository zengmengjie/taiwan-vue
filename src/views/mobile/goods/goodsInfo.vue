<template>
    <div class="goods_class">
        <div class="main_header">
            <nav class="nav">
                <router-link :to="{name: 'home'}">
                    <van-icon
                        name="arrow-left"
                        color="#fff"
                    />
                </router-link>
            </nav>
            <div class="main_title">{{goods.goods_name}}</div>
        </div>
        <swiper
            :options="topSwiper"
            class="swipe_class"
        >
            <swiper-slide
                v-for="(pic, index) in goodsImage"
                :key="index"
            >
                <img v-lazy="pic">
            </swiper-slide>
        </swiper>
        <buy-control v-model="goods"></buy-control>
        <div class="home_panel">
            <div class="home_panel_hd">商品詳情</div>
            <div
                class="home_panel_bd content"
                v-html="goods.content"
            ></div>
        </div>
        <!-- <div class="home_panel">
            <div class="home_panel_hd">評價</div>
            <div class="home_panel_bd">
                <swiper :options="swiperOption" style="height:320px">
                    <swiper-slide v-for="(item,index) in goodsEvaluate" :key="index">
                        <el-card class="card_class">
                            <div class="remark_cell">
                                <div class="right_content">
                                    <div class="right_top">
                                        <span style="color:red">{{item.name| name}}</span>
                                        <span>{{item.add_time|todatDate}}</span>
                                        <el-rate disabled v-model="item.star"></el-rate>
                                    </div>
                                    <div class="right_font" v-text="item.content"></div>
                                </div>
                            </div>
                        </el-card>
                    </swiper-slide>
                </swiper>
            </div>
        </div> -->
        <div class="home_panel">
            <div class="home_panel_hd">查詢訂單</div>
            <div class="home_panel_bd">
                <div class="am-form-group">
                    <el-input
                        v-model="search_input"
                        size="medium"
                        placeholder="請手機進行査詢"
                    ></el-input>
                    <el-button
                        type="danger"
                        plain
                        size="medium"
                        @click="findOrder"
                    >査詢</el-button>
                </div>
                <div
                    class="home_panel"
                    v-for="(item,index) in searchOrder"
                    :key="index"
                    v-if="searchOrder!=''"
                >
                    <div class="home_panel_hd">
                        <span>時間：{{item.create_time |date}}</span>
                        <span class="status">{{item.order_status |orderStatus}}</span>
                    </div>
                    <div class="home_panel_bd">
                        <div>
                            <span>訂單號：{{item.order_sn}}</span>
                        </div>
                        <div>
                            <span>收貨人：{{item.consignee}}</span>
                        </div>
                        <div>
                            <span>地　址：{{item.city}}{{item.district}}{{item.address}}</span>
                        </div>
                        <div>
                            <span>商品：</span>
                            <div
                                v-for="(goods, index) in item.goods"
                                :key="index"
                            >
                                <span>{{goods.goods_name}}</span>
                                <span>{{goods.spec_name}}</span>
                                <span>{{goods.goods_num}}</span>
                            </div>
                        </div>
                        <div>
                            <span>赠品：</span>
                            <div
                                v-for="(gifts, index) in item.gifts"
                                :key="index"
                            >
                                <span>{{gifts.spec_name}}</span>
                                <span>{{gifts.goods_num}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <home-footer></home-footer>
        <div class="bottom_fixed">
            <div
                class="home"
                @click="toHome"
            >
                <van-icon name="chat" />

            </div>
            <template v-if="goods.template == 2">
                <div class="add">
                    <van-button
                        bottom-action
                        @click="showPopup = true"
                    >立即購買</van-button>
                </div>
                <div
                    class="cart"
                    @click="toCart"
                >
                    <van-icon name="cart" />
                    <i class="cart_number">{{cart_total_num}}</i>
                </div>
            </template>
            <template v-else>
                <div class="add_template">
                    <van-button
                        bottom-action
                        @click="toTemplate"
                    >立即購買>>[{{$t("today")}}{{discount}}{{$t("discount")}}]</van-button>
                </div>
            </template>
        </div>
        <van-popup
            v-model="showPopup"
            position="bottom"
        >
            <div class="popup_div">
                <span
                    class="closeBtn"
                    @click="showPopup = false"
                >
                    <van-icon name="close" />
                </span>
                <div class="prod_info">
                    <div class="prod_img">
                        <img :src="original_img">
                    </div>
                    <div class="prod_desc">
                        <div class="spec_price">
                            <span class="unit">{{dollar}} </span>
                            <span class="price">{{total_price | money}}</span>
                        </div>
                        <div class="spec_desc">已選擇：
                            <span>{{selectText}}</span>
                        </div>
                    </div>
                </div>
                <div
                    class="saleoff_info"
                    v-if="goodsProm"
                >
                    <span>{{promName}}</span>
                </div>

                <div class="spec_info">
                    <div class="spec_groups">
                        <div
                            v-for="(item, index) in goodsSpec"
                            :key="index"
                        >
                            <div class="spec_title">{{item.base_spec_name}}</div>
                            <div
                                class="spec_list"
                                v-for="(spec, skey) in item.spec_list"
                                :key="skey"
                            >
                                <div
                                    :class="{spec_item: index == 0, option_item: index != 0, on: item._select == spec.id}"
                                    @click="item._select = spec.id"
                                >
                                    <img
                                        v-if="index == 0"
                                        v-lazy="spec.item_image"
                                    >
                                    <span>{{spec.item_name}}</span>
                                    <div class="sticky"></div>
                                </div>
                            </div>
                        </div>

                        <div class="spec_title">購買數目</div>
                        <div class="addNum">
                            <van-stepper
                                v-model="number"
                                integer
                                :min="1"
                                :max="store_count"
                                :step="1"
                                :default-value="1"
                            />
                        </div>
                    </div>
                    <div
                        class="spec_groups"
                        v-if="goodsProm && goodsProm.prom.prom_type == 1"
                    >
                        <div
                            v-for="(gitem, gindex) in giftData"
                            :key="gindex"
                        >
                            赠品{{gindex + 1}}：
                            <div
                                v-for="(item, index) in gitem.goodsSpec"
                                :key="index"
                            >
                                <div class="spec_title">{{item.base_spec_name}}</div>
                                <div
                                    class="spec_list"
                                    v-for="(spec, skey) in item.spec_list"
                                    :key="skey"
                                >
                                    <div
                                        :class="{spec_item: index == 0,option_item: index != 0, on: item._select == spec.id}"
                                        @click="item._select = spec.id"
                                    >
                                        <div class="sticky"></div>
                                        <img
                                            v-if="index == 0"
                                            v-lazy="spec.item_image"
                                        >
                                        <span>{{spec.item_name}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="spec_title">赠品數目</div>
                                <div class="addNum">
                                    <van-stepper v-model="gitem.number" integer :min="1" :max="1" :step="1" :default-value="1" />
                                </div> -->
                        </div>
                    </div>
                    <div style="height: 60px;"></div>
                </div>
                <div class="add_btns">
                    <van-row>
                        <van-col span="12">
                            <van-button
                                bottom-action
                                @click="addCartOfGoods(true)"
                            >加入購物車</van-button>
                        </van-col>
                        <van-col span="12">
                            <van-button
                                type="primary"
                                bottom-action
                                @click="addCartOfGoods(false)"
                            >
                                <el-badge :value="cart_total_num">
                                    立即搶購
                                </el-badge>
                            </van-button>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </van-popup>

    </div>

</template>

<script>
import {
    swiper, swiperSlide
} from 'vue-awesome-swiper'
import { mapActions, mapGetters } from 'vuex'
import buyControl from './model/buyControl'
import HomeFooter from '@/views/common/homeFooter'
import common from '@/libs/common'
import { Toast, Dialog } from 'vant'
export default {
    data() {
        return {
            goods_sn: '',
            goods: {},
            goodsImage: [],
            goodsEvaluate: [],
            goodsSpec: [],
            goodsSkus: [],
            goodsProm: false,
            giftData: [],
            spec_key: '',
            number: 1,
            giftCount: 0,
            showPopup: false,
            topSwiper: {
                speed: 2000,
                loop: true,
                autoplay: {
                    disableOnInteraction: false
                }
            },
            swiperOption: {
                loop: true,
                speed: 1000,
                autoplay: true,
                direction: 'vertical',
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: true,
                slidesPerView: 'auto',
                loopedSlides: 4,
                spaceBetween: 10,
                observeParents: true
            },
            search_input: '',
            searchOrder: {}
        }
    },
    mounted() {
        this.goods_sn = this.$route.params.id
        this.onLoad()
        this.$analytics.fbq.init(this.site.pix)
        this.$analytics.fbq.event('PageView')
    },
    watch: {
        goodsSpec: {
            handler: function (val, oldVal) {
                this.spec_key = common.getSpecKey(val)
            },
            // 深度观察
            deep: true
        },
        number: function (val, oldval) {
            if (this.goodsProm && this.goodsProm.prom.prom_type == 1) {
                let diffvalue = parseInt(val / this.goodsProm.goods.buy_number)
                diffvalue = diffvalue * this.goodsProm.goods.send_number - this.giftCount
                if (diffvalue > 0) {
                    this.incGiftData(diffvalue)
                } else {
                    this.redGiftData(-diffvalue)
                }
            }
        }
    },
    computed: {
        ...mapGetters(['site', 'cartList']),
        dollar: function () {
            return common.dollar(this.site.locale)
        },
        selectText() {
            if (this.spec_name != '') {
                return this.spec_name.replace('_', ' ')
            }
            return '请选择'
        },
        promName() {
            return this.goodsProm ? this.goodsProm.prom.prom_name : ''
        },
        original_img() {
            if (this.spec_key != '') {
                var sku = this.goodsSkus.find((s) => s.spec_key == this.spec_key)
                if (sku) {
                    return sku.thumb_url
                }
            }
            return this.goods.image_url
        },
        discount() {
            let discount = this.goods.shop_price / this.goods.market_price * 10
            return this.$_.ceil(discount, 1)
        },
        spec_name() {
            let sku = common.getSku(this.spec_key, this.goodsSkus)
            return sku ? sku.spec_name : ''
        },
        spec_price() {
            if (this.spec_key != '') {
                var sku = this.goodsSkus.find((s) => s.spec_key == this.spec_key)
                if (sku) {
                    if (sku.price <= 0) {
                        return this.goods.shop_price
                    }
                    return sku.price
                }
            }
            return this.goods.shop_price
        },
        store_count() {
            if (this.spec_key != '') {
                var sku = this.goodsSkus.find((s) => s.spec_key == this.spec_key)
                if (sku) {
                    if (sku.store_count <= 0) {
                        return this.goods.store_count
                    }
                    return sku.store_count
                }
            }
            return this.goods.store_count
        },
        FilterCartList() {
            return this.cartList.filter(g => g.goods_sn == this.goods_sn)
        },
        cart_total_num() {
            let totalNum = 0
            this.FilterCartList.forEach(g => {
                g.skus.forEach(sku => {
                    totalNum += sku.number
                })
            })
            return totalNum
        },
        total_price() {
            let obj = [{
                shop_price: this.spec_price,
                number: this.number
            }]
            return common.calc(this.goodsProm, obj)
        }
    },
    methods: {
        ...mapActions(['addCart', 'updateTitle']),
        onLoad() {
            this.request('GoodsInfo', {
                id: this.goods_sn
            }).then((res) => {
                if (res.code == 200) {
                    this.goods = res.data.goods
                    this.goodsImage = res.data.goods_image
                    this.goodsEvaluate = res.data.goods_evaluate
                    this.goodsSpec = res.data.goods_spec
                    this.goodsSkus = res.data.goods_skus
                    this.goodsProm = res.data.goods_prom

                    for (const index in this.goodsSpec) {
                        let item = this.goodsSpec[index]
                        this.$set(item, '_select', item.spec_list[0].id)
                        item.spec_list.forEach(spec => {
                            if (index == 0) {
                                let sku = this.goodsSkus.find(a => {
                                    return a.spec_key.split('_').find(key => key == spec.id)
                                })
                                this.$set(spec, 'item_image', sku.thumb_url)
                            }
                        })
                    }

                    if (this.goodsProm && this.goodsProm.prom.prom_type == 1) {
                        for (const index in this.goodsProm.goodsSpec) {
                            let item = this.goodsProm.goodsSpec[index]
                            this.$set(item, '_select', item.spec_list[0].id)
                            item.spec_list.forEach(spec => {
                                if (index == 0) {
                                    let sku = this.goodsProm.goodsSku.find(a => {
                                        return a.spec_key.split('_').find(key => key == spec.id)
                                    })
                                    this.$set(spec, 'item_image', sku.thumb_url)
                                }
                            })
                        }
                        this.incGiftData(Math.floor(this.goodsProm.goods.send_number / this.goodsProm.goods.buy_number))
                    }
                    this.updateTitle(this.goods.goods_name)
                }
            })
        },
        addCartOfGoods(isAdd) {
            this.addCart({
                goods: {
                    id: this.goods.id,
                    goods_name: this.goods.goods_name,
                    goods_sn: this.goods.goods_sn,
                    market_price: this.goods.market_price,
                    shop_price: this.spec_price,
                    image_url: this.original_img,
                    spec_key: this.spec_key,
                    spec_name: this.spec_name,
                    number: this.number
                },
                gifts: this.$_.cloneDeep(this.giftData),
                prom: this.$_.cloneDeep(this.goodsProm),
                isAdd: isAdd
            })
            if (!isAdd) {
                this.toCart()
            } else {
                // Toast.success('加入成功')
                Dialog.confirm({
                    message: '請選擇去下單還是繼續瀏覽',
                    confirmButtonText: '立即結算',
                    cancelButtonText: '繼續瀏覽'
                }).then(() => {
                    this.toCart()
                }).catch(() => {
                    // on cancel
                })
            }
        },
        incGiftData(count) {
            for (var i = 0; i < count; i++) {
                this.$set(this.giftData, this.giftData.length, {
                    goodsSpec: this.$_.cloneDeep(this.goodsProm.goodsSpec),
                    number: 1
                })
                this.giftCount++
            }
        },
        redGiftData(count) {
            for (var i = 0; i < count; i++) {
                this.$delete(this.giftData, this.giftData.length - 1)
                this.giftCount--
            }
        },
        toHome() {
            // this.$router.push({
            //     path: 'http://line.me/ti/p/@025xtcwp'
            // })
            window.location.href = 'http://line.me/ti/p/@025xtcwp'
        },
        toTemplate() {
            this.$router.push({
                name: 'template',
                params: {
                    id: this.goods_sn
                }
            })
        },
        toCart() {
            this.$router.push({
                name: 'cart',
                params: {
                    id: this.goods_sn
                }
            })
        },
        findOrder() {
            if (!this.$_.isEmpty(this.search_input)) {
                this.request('OrderSearch', {
                    mobile: this.search_input
                }).then((res) => {
                    if (res.code === 200) {
                        this.searchOrder = res.data.filter(so => {
                            return so.goods.find(a => a.goods_sn == this.goods_sn) != null
                        })
                        if (this.searchOrder && this.searchOrder.length > 0) return
                    }
                    Toast('查無記錄')
                    this.searchOrder = ''
                })
            } else {
                Toast('請輸入手機')
            }
        }
    },
    components: {
        buyControl,
        HomeFooter,
        swiper,
        swiperSlide
    }
}
window._lt('send', 'pv', ['9f68ea47-c696-49b6-ba5f-07ca54afcf13'])
window._lt('send', 'pv', ['b4d67d64-1ca2-435a-97a7-4d7a75809e4e'])
window._lt('send', 'pv', ['688a9afa-2690-4d7e-8208-466f2a8109bb'])
</script>
<style lang='scss' scoped  src="@mobileTheme/goods/goodsInfo.scss">
</style>
