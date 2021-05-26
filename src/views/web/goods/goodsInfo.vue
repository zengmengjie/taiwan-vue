<template>
    <div>
        <web-header></web-header>
        <div class="main_content">
            <div class="main_left">
                <div class="goods_site_name">{{goods.goods_name}}</div>
                <div class="goods_site_desc">
                    <span>
                        {{goods.remark}}
                    </span>
                </div>

                <div class="goods_price_bar">
                    <div class="goods_price">
                        <strong>{{dollar}}{{goods.shop_price | money}}</strong>
                        <span class="goods_old_price">參考價{{dollar}}{{goods.market_price | money}}</span>
                    </div>
                    <div class="goods_sales">
                        <strong class="sales">{{goods.sales_number}}</strong> 件已賣出
                    </div>
                </div>

                <swiper
                    :options="goodsSwiper"
                    class="goodsSwiper"
                >
                    <swiper-slide
                        v-for="(pic, index) in goodsImage"
                        :key="index"
                    >
                        <img v-lazy="pic">
                    </swiper-slide>
                </swiper>

                <div class="details_panel">
                    <div class="details_panel_hd">商品詳情</div>
                    <div
                        class="details_panel_bd"
                        v-html="goods.content"
                    >
                    </div>
                </div>

            </div>
            <strong>
                <div class="main_right">
                    <div class="spec_info">
                        <div class="prod_desc">
                            <div class="spec_price">
                                <span class="unit">{{dollar}} </span>
                                <span class="price">{{total_price | money}}</span>
                            </div>
                            <div class="spec_desc">已選擇：
                                <span>{{selectText}}</span>
                            </div>
                        </div>

                        <div
                            class="saleoff_info"
                            v-if="goodsProm"
                        >
                            <span>{{promName}}</span>
                        </div>
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

                        <div class="spec_btns">
                            <a
                                href="javascript:;"
                                class="btn btn-warning"
                                @click="addCartOfGoods(true)"
                            >加入購物車</a>
                            <a
                                href="javascript:;"
                                class="btn btn-danger"
                                @click="addCartOfGoods(false)"
                            >
                                <span style="position: relative;">
                                    <i
                                        class="order-numbers"
                                        style="display: block;"
                                    >{{cart_total_num}}</i>立即搶購</span>
                            </a>
                        </div>
                        <el-dialog
                            :visible.sync="dialog"
                            width="30%"
                        >
                            <span>請選擇去下單還是繼續瀏覽</span>
                            <span
                                slot="footer"
                                class="dialog_footer"
                            >
                                <el-button @click="dialog = false">繼續瀏覽</el-button>
                                <el-button
                                    type="primary"
                                    @click="clickCart"
                                >立即結算</el-button>
                            </span>
                        </el-dialog>
                    </div>
                    <div class="details_panel">
                        <div class="details_panel_hd">查詢訂單</div>
                        <div class="details_panel_bd am-form">
                            <div class="am-form-group">
                                <el-input
                                    size="medium"
                                    v-model="phone"
                                    placeholder="請輸入手機進行査詢"
                                ></el-input>
                                <span class="am-input-group-btn">
                                    <span
                                        class="btn btn-danger find-btn"
                                        @click="findOrder"
                                    >查詢</span>
                                </span>
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
                </div>
                <div class="clearfix"></div>
                <div class="cart-box-fixed">
                    <div
                        class="cart-btn"
                        @click="dialogCart = true"
                    >
                        <em class="btm-act-icn">
                            <van-icon
                                name="cart"
                                color="#000"
                            />
                            <i class="order-numbers">{{cart_total_num}}</i>
                        </em>
                        <span class="btn_text">{{$t('cart')}}</span>
                    </div>
                    <div class="cart-btn">
                        <img
                            src="https://rosememary.oss-cn-hongkong.aliyuncs.com/images/lg_link.png"
                            @click="goToChat"
                        />
                    </div>
                </div>
            </strong>
        </div>
        <el-dialog
            class="cart_dialog"
            :title="$t('cart')"
            :visible.sync="dialogCart"
            width="960px"
        >
            <div
                class="goods_list"
                v-if="FilterCartList.length > 0"
            >
                <div
                    v-for="(goods, index) in FilterCartList"
                    :key="index"
                >
                    <!-- <div class="goods_spec">
                        <div class="goods_name">
                            {{goods.goods_name}}
                            <div class="am-text-danger">{{dollar}}{{goods.shop_price | money}}</div>
                        </div>

                        <div class="spec">
                            <div class="spec_name">
                                規格：
                            </div>

                            <div class="goods_img" v-for="(sku, sindex) in goods.skus" :key="sindex">
                                <img v-lazy="sku.image_url">
                                <span>{{sku.spec_name.replace('_', ' ')}}</span>
                                <div class="goods_count">
                                    <van-stepper v-model="sku.number" integer :min="1" :max="10" :step="1" :default-value="1" @change="cartChange(goods)" />
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div
                        class="goods"
                        v-for="(sku, sindex) in goods.skus"
                        :key="sindex"
                    >
                        <div class="goods_img">
                            <img v-lazy="sku.image_url">
                        </div>
                        <div class="goods_spec">
                            <div class="name">{{goods.goods_name}}</div>
                            <div class="spec">規格：
                                <span>{{sku.spec_name.replace('_', ' ')}}</span>
                            </div>
                            <div class="am-text-danger">{{dollar}}{{sku.shop_price | money}}</div>

                        </div>
                        <div class="goods_count">
                            <van-stepper
                                v-model="sku.number"
                                integer
                                :min="1"
                                :max="10"
                                :step="1"
                                :default-value="1"
                                @change="cartChange(goods)"
                            />
                        </div>
                        <a
                            href="javascript:void(0);"
                            class="del_btn"
                            @click="removeCartOfGoods(goods.goods_sn, sindex)"
                        >刪除</a>
                    </div>

                    <div
                        class="gifts"
                        v-if="goods.gifts"
                    >
                        <div class="goods_name">
                            赠品:{{goods.prom.goods.name}}
                        </div>
                        <div class="spec">
                            <el-row>
                                <el-col
                                    :span="6"
                                    class="item"
                                    v-for="(gitem, gindex) in goods.gifts"
                                    :key="gindex"
                                >
                                    赠品{{gindex + 1}}：
                                    <div
                                        v-for="(item, index) in gitem.goodsSpec"
                                        :key="index"
                                    >
                                        <div class="spec_title">{{item.base_spec_name}}</div>
                                        <el-select
                                            v-model="item._select"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="(spec, skey) in item.spec_list"
                                                :key="skey"
                                                :label="spec.item_name"
                                                :value="spec.id"
                                            >
                                                <span style="float: left">{{ spec.item_name }}</span>
                                                <span style="float: right; color: #8492a6; font-size: 13px"><img
                                                        v-if="index == 0"
                                                        :src="spec.item_image"
                                                        style="width:30px;height:30px;"
                                                    ></span>
                                            </el-option>
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                購物車為空
            </div>
            <!-- <div class="saleoff_info">
                <span>購滿 2 件 立減 NT644;&nbsp;</span>
            </div> -->
            <div class="price_info">
                <div class="price_info_item">
                    <div>数量：</div>
                    <div>{{cart_total_num}}</div>
                </div>
                <div class="price_info_item">
                    <div>商品總額:</div>
                    <div>{{dollar}} {{cart_total_amount | money}}</div>
                </div>
                <div class="price_info_item">
                    <div>優惠總額:</div>
                    <div>{{dollar}} -{{cart_total_amount - cart_order_amount | money}}</div>
                </div>
                <div class="price_info_item">
                    <div>應付總額:</div>
                    <div class="total">{{dollar}} {{cart_order_amount | money}}</div>
                </div>
            </div>
            <div class="order_info">
                <el-form
                    :model="orderForm"
                    :rules="ruleValidate"
                    ref="orderForm"
                    label-width="100px"
                    status-icon
                >
                    <el-row>
                        <el-col :span="10">
                            <el-form-item
                                :label="$t('name')"
                                prop="consignee"
                            >
                                <el-input
                                    size="medium"
                                    placeholder="必填"
                                    v-model="orderForm.consignee"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item
                                :label="$t('mobile_phone')"
                                prop="mobile"
                            >
                                <el-input
                                    size="medium"
                                    placeholder="必填，手機"
                                    v-model="orderForm.mobile"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>

                        <el-col :span="10">
                            <el-form-item
                                :label="$t('area')"
                                prop="district"
                            >
                                <el-select
                                    size="medium"
                                    style="width: 135px"
                                    v-model="orderForm.city"
                                    placeholder="請選取縣市"
                                    v-on:change="getCity($event)"
                                >
                                    <el-option
                                        v-for="item in citys"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value"
                                    >
                                    </el-option>
                                </el-select>

                                <el-select
                                    size="medium"
                                    style="width: 135px"
                                    v-model="orderForm.district"
                                    placeholder="鄉鎮市區"
                                >
                                    <el-option
                                        v-for="item in districts"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item
                                :label="$t('address')"
                                prop="address"
                            >
                                <el-input
                                    size="medium"
                                    placeholder="詳細地址"
                                    v-model="orderForm.address"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="10">
                            <el-form-item
                                :label="$t('email')"
                                prop="email"
                            >
                                <el-input
                                    size="medium"
                                    placeholder="沒有郵箱可以不填"
                                    v-model="orderForm.email"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item
                            label="備註"
                            prop="message"
                        >
                            <el-input
                                v-model="orderForm.message"
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 3}"
                                placeholder="有什麼特殊要求可以寫在這裡喲"
                            >
                            </el-input>
                        </el-form-item>
                    </el-row>
                    <el-input
                        type="hidden"
                        v-model="orderForm.principal"
                    ></el-input>
                    <el-row>
                        <el-col
                            :span="10"
                            :offset="14"
                        >
                            <div class="text_bold">
                                <el-button
                                    type="primary"
                                    @click="dialogCart = false"
                                    class="btn btn-warning backcart_btn"
                                >返回湊單</el-button>
                                <el-button
                                    @click="addOrder"
                                    :loading="loading"
                                    class="btn btn-danger order_btn"
                                >提交訂單</el-button>

                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog
            class="success_dialog"
            :visible.sync="dialogSuccess"
        >
            <div class="text_success">
                <van-icon
                    class="ok"
                    name="passed"
                    color="#6DC04D"
                />
                <span>您好，恭喜您已經成功訂購哦！
                </span>
            </div>
            <div class="main_orderinfo">
                <div>訂單號：
                    <span class="text_danger">{{orderResult.order_sn}}</span>
                </div>
                <div>商　品：
                    <div
                        v-for="goods in orderResult.goods"
                        :key="goods"
                    >
                        <span>{{goods.goods_name}}</span>
                        <span>{{goods.goods_spec}}</span>
                        <span>x {{goods.goods_num}}</span>
                    </div>

                </div>
                <div>金　額：
                    <span class="text_danger">{{dollar}}{{orderResult.order_amount | money}}</span>
                </div>
            </div>
            <div class="main_warninfo text_warning">
                ★ 我們採用專業配送！如果您臨時不在可以等配送員打電話給你改約收件時間即可。<br> ★ 收到貨品後有任何問題請聯絡在線客服處理，謝謝！<br>
            </div>
            <div class="bottom_button">
                <el-button
                    type="danger"
                    plain
                    @click="dialogSuccess = false"
                >繼續逛逛</el-button>
            </div>

        </el-dialog>
        <web-footer></web-footer>
    </div>

</template>

<script>
import WebHeader from '@/views/common/webHeader'
import WebFooter from '@/views/common/webFooter'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapActions, mapGetters } from 'vuex'
import { Toast } from 'vant'
import common from '@/libs/common'
import regex from '@/libs/regex'
import { areaList, cityList } from '@/libs/areaList'
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
            dialogCart: false,
            dialog: false,
            dialogSuccess: false,
            spec_key: '',
            number: 1,
            giftCount: 0,
            orderForm: {
                consignee: '',
                province: '',
                city: '',
                district: '',
                address: '',
                mobile: '',
                email: '',
                message: '',
                principal: ''
            },
            ruleValidate: {
                consignee: [
                    { required: true, message: '姓名 不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '詳細地址 不能为空', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '手機 不能为空', trigger: 'blur' }
                ]
            },
            orderResult: {
                goods: [],
                order_sn: '',
                order_amount: 0
            },
            goodsSwiper: {
                speed: 2000,
                loop: true,
                autoplay: {
                    disableOnInteraction: false
                }
            },
            phone: '',
            searchOrder: {},
            citys: [],
            districts: [],
            loading: false
        }
    },
    mounted() {
        this.goods_sn = this.$route.params.id
        if (!common.isMobile()) {
            this.onLoad()
        }

        this.citys = cityList(this.site.locale)
        if (this.site.locale == 'TW') {
            this.orderForm.province = '台灣'
        }
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
        FilterCartList() {
            return this.cartList.filter(g => g.goods_sn == this.goods_sn)
        },
        selectText() {
            if (this.spec_name != '') {
                return this.spec_name.replace('_', ' ')
            }
            return '請選擇'
        },
        promName() {
            return this.goodsProm ? this.goodsProm.prom.prom_name : ''
        },
        spec_name() {
            let sku = common.getSku(this.spec_key, this.goodsSkus)
            return sku ? sku.spec_name : ''
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
        spec_price() {
            //暂时不用 sku价格
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
            //暂时不用 sku库存
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
        total_price() {
            let obj = [{
                shop_price: this.spec_price,
                number: this.number
            }]
            return common.calc(this.goodsProm, obj)
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
        cart_total_amount() {
            let totalPrice = 0.00
            this.FilterCartList.forEach(item => {
                item.skus.forEach(g => {
                    totalPrice += g.shop_price * g.number
                })
            })
            return totalPrice
        },
        cart_order_amount() {
            let totalPrice = 0.00
            this.FilterCartList.forEach(item => {
                totalPrice += common.calc(item.prom, item.skus)
            })
            return totalPrice
        }
    },
    methods: {
        ...mapActions(['addCart', 'removeCart', 'clearCart', 'updateTitle']),
        cartChange(goods) {
            //判断是否买送活动
            if (goods.prom && goods.prom.prom.prom_type == 1) {
                let numberTotal = 0
                let giftCount = 0
                goods.skus.forEach(sku => {
                    numberTotal += sku.number
                })
                goods.gifts.forEach(gift => {
                    giftCount += gift.number
                })

                let diffvalue = parseInt(numberTotal / goods.prom.goods.buy_number)
                diffvalue = diffvalue * goods.prom.goods.send_number - giftCount
                if (diffvalue > 0) {
                    for (let i = 0; i < diffvalue; i++) {
                        this.$set(goods.gifts, goods.gifts.length, {
                            goodsSpec: this.$_.cloneDeep(goods.prom.goodsSpec),
                            number: 1
                        })
                    }
                } else {
                    for (let i = 0; i < (-diffvalue); i++) {
                        this.$delete(goods.gifts, goods.gifts.length - 1)
                    }
                }
            }
        },
        onLoad() {
            this.request('GoodsInfo', {
                id: this.goods_sn
            }).then((res) => {
                if (res.code === 200) {
                    this.goods = res.data.goods
                    this.goodsImage = res.data.goods_image
                    this.goodsEvaluate = res.data.goods_evaluate
                    this.goodsSpec = res.data.goods_spec
                    this.goodsSkus = res.data.goods_skus
                    this.goodsProm = res.data.goods_prom
                    this.orderForm.principal = this.goods.principal

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
                this.dialogCart = true
            } else {
                this.dialog = true
            }
        },
        clickCart() {
            this.dialog = false
            this.dialogCart = true
        },
        removeCartOfGoods(sn, sindex) {
            this.removeCart({ sn: sn, j: sindex })
        },
        addOrder() {
            let skus = []
            let gifts = []
            if (this.FilterCartList.length == 0) {
                Toast('您未選擇商品')
                return
            }

            this.$refs['orderForm'].validate((valid) => {
                if (valid) {
                    this.FilterCartList.forEach(ele => {
                        ele.skus.forEach(sku => {
                            skus.push({
                                goods_id: ele.id,
                                number: sku.number,
                                spec_key: sku.spec_key
                            })
                        })

                        if (ele.hasOwnProperty('gifts')) {
                            ele.gifts.forEach(gift => {
                                let specKey = common.getSpecKey(gift.goodsSpec)
                                let mgift = gifts.find(s => s.spec_key == specKey)
                                if (mgift) {
                                    mgift.number += gift.number
                                } else {
                                    gifts.push({
                                        goods_id: ele.id,
                                        number: gift.number,
                                        spec_key: specKey
                                    })
                                }
                            })
                        }
                    })
                    this.loading = true
                    let order = this.$_.clone(this.orderForm)
                    order['goods'] = skus
                    order['gifts'] = gifts
                    this.request('OrderSubmit', order).then((res) => {
                        if (res.code === 200) {
                            this.removeCart({ sn: this.goods_sn })
                            this.dialogCart = false
                            this.dialogSuccess = true
                            this.loading = false
                            this.orderResult.goods = res.data.goods
                            this.orderResult.order_sn = res.data.order_sn
                            this.orderResult.order_amount = res.data.order_amount

                            this.$analytics.fbq.event('Purchase', {
                                value: res.data.order_amount,
                                currency: this.dollar
                            })
                            window._lt('send', 'cv', {
                                type: 'Conversion'
                            }, ['9f68ea47-c696-49b6-ba5f-07ca54afcf13'])
                            window._lt('send', 'cv', {
                                type: 'Conversion'
                            }, ['b4d67d64-1ca2-435a-97a7-4d7a75809e4e'])
                            window._lt('send', 'cv', {
                                type: 'Conversion'
                            }, ['688a9afa-2690-4d7e-8208-466f2a8109bb'])
                        }
                    })
                }
            })
        },
        findOrder() {
            if (this.phone != '') {
                this.request('OrderSearch', {
                    mobile: this.phone
                }).then((res) => {
                    if (res.code === 200) {
                        this.searchOrder = res.data
                    } else {
                        this.$message({
                            message: this.$t(res.message),
                            type: 'error'
                        })
                        this.searchOrder = ''
                    }
                })
            }
        },
        /*二级联动选择地区*/
        getCity: function (city) {
            let tempArea = []
            this.districts = []
            this.orderForm.district = ''
            let allArea = areaList(this.site.id)
            for (var val of allArea) {
                if (city === val.city) {
                    tempArea.push({
                        label: val.label,
                        value: val.label
                    })
                }
            }
            this.districts = tempArea
        },
        // 聯繫客服
        goToChat() {
            window.location.href = 'http://line.me/ti/p/@025xtcwp'
        }

    },
    components: {
        swiper,
        swiperSlide,
        WebHeader,
        WebFooter
    }
}
window._lt('send', 'pv', ['9f68ea47-c696-49b6-ba5f-07ca54afcf13'])
window._lt('send', 'pv', ['b4d67d64-1ca2-435a-97a7-4d7a75809e4e'])
window._lt('send', 'pv', ['688a9afa-2690-4d7e-8208-466f2a8109bb'])
</script>
<style lang='scss' scoped>
@import "~theme/utils/index";
.main_left {
    width: 65%;
    float: left;
    .goods_site_name {
        font-weight: 700;
        @include sc(18px, #232222);
        padding: 10px 10px 0 10px;
        background: #fff;
    }
    .goods_site_desc {
        padding: 10px;
        @include sc(14px, #232222);
        background: #fff;
        span {
            line-height: 1.6;
            @include sc(20px, #ee0000);
            font-weight: bold;
        }
    }
    .goods_price_bar {
        padding: 10px;
        height: 46px;
        background: #fff;
        .goods_price {
            width: 50%;
            float: left;
            height: 100%;
            @include sc(22px, #8666b8);
            line-height: 26px;
            .goods_old_price {
                text-decoration: line-through;
                @include sc(18px, #828080);
                line-height: 28px;
            }
        }
        .goods_sales {
            font-size: 14px;
            width: 50%;
            text-align: right;
            float: left;
            height: 100%;
            line-height: 26px;
            .sales {
                @include sc(16px, #8b689c);
            }
        }
    }
    .goodsSwiper {
        background-color: #fff;
        margin-bottom: 20px;
        img {
            @include wh(100%, 100%);
        }
    }
    .details_panel {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        overflow: hidden;
        .details_panel_hd {
            font-weight: 700;
            border-color: #f0f0f0;
            text-align: center;
            padding: 10px;
            border-bottom: 1px solid #8666b8;
            @include sc(16px, #8666b8);
        }
        .details_panel_bd {
            @include wh(100%, 100%);
        }
    }
}
.main_right {
    width: 35%;
    float: right;
    .spec_info {
        background: #fdfdfd;
        clear: both;
        margin-bottom: 20px;
        padding-bottom: 10px;
        .prod_desc {
            padding: 10px;
            .spec_price {
                color: #714775;
                line-height: 30px;
                .unit {
                    font-size: 20px;
                }
                .price {
                    position: relative;
                    line-height: 30px;
                    @include sc(30px, #8666b8);
                }
            }
            .spec_desc {
                color: rgba(0, 0, 0, 0.87);
                text-overflow: ellipsis;
                overflow: hidden;
                max-height: 58px;
                font-size: 12px;
            }
        }

        .spec_groups {
            position: relative;
            border-top: 1px solid #eaeaea;
            padding: 0 10px;
            .spec_title {
                padding: 5px 0 12px 0;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.87);
            }
            .spec_list {
                display: inline-block;
                padding-bottom: 5px;
                .spec_item {
                    float: left;
                    padding: 8px;
                    border: 1px solid #d9d9d9;
                    margin: 0 6px 8px 0;
                    background: #fff;
                    width: 100px;
                    cursor: pointer;
                    img {
                        @include wh(100%, 100%);
                    }
                    & > div.sticky {
                        position: absolute;
                        margin-top: -8px;
                        margin-left: 75px;
                        border-left: 15px solid #fff;
                        border-top: 8px solid #fff;
                    }
                    & > span {
                        font-size: 0.8em;
                        color: rgba(0, 0, 0, 0.87);
                        vertical-align: middle;
                    }
                    &.on {
                        border: 1px solid #f23030;
                        box-shadow: 0 0 8px #f23030;
                        & > div.sticky {
                            border-top: 10px solid #f23030;
                        }
                        & > span {
                            color: #f23030;
                        }
                    }
                }
                .option_item {
                    float: left;
                    padding: 8px 10px;
                    border: 1px solid #d9d9d9;
                    margin: 0 6px 8px 0;
                    display: table;
                    background: #fff;
                    line-height: 22px;
                    cursor: pointer;
                    position: relative;
                    & > div.sticky {
                        position: absolute;
                        margin-top: -8px;
                        right: 0;
                        border-left: 10px solid #fff;
                        border-top: 10px solid #fff;
                    }
                    & > span {
                        font-size: 0.8em;
                        color: rgba(0, 0, 0, 0.87);
                        vertical-align: middle;
                    }
                    &.on {
                        border: 1px solid #f23030;
                        box-shadow: 0 0 8px #f23030;
                        & > div.sticky {
                            border-top: 10px solid #f23030;
                        }
                        & > span {
                            color: #f23030;
                        }
                    }
                }
            }
            .addNum {
                display: table;
                position: absolute;
                right: 15px;
                bottom: 5px;
            }
        }
        .spec_btns {
            display: inline-block;
            width: 100%;
            margin: 5px 0;
            padding: 0 10px;
            & a {
                width: 50%;
                float: left;
                span {
                    position: relative;
                    .order-numbers {
                        display: inline-block;
                        position: absolute;
                        background-color: #f23030;
                        line-height: 16px;
                        font-style: normal;
                        border-radius: 8px;
                        padding: 0 4px;
                        @include sc(8px, #fff);
                        top: -25px;
                        right: -20px;
                        border: 1px solid #fff;
                    }
                }
            }
        }
    }
    .details_panel {
        margin: 0 0 20px 8px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        overflow: hidden;
        .details_panel_hd {
            font-weight: 700;
            border-color: #f0f0f0;
            text-align: center;
            padding: 10px;
            border-bottom: 1px solid #8666b8;
            @include sc(16px, #8666b8);
        }
        .details_panel_bd.am-form {
            padding: 10px;
            .el-input {
                width: 75%;
            }
            .find-btn {
                @include text--middle(36px);
                width: 21%;
                vertical-align: bottom;
            }
        }
    }
}

.cart-box-fixed {
    position: fixed;
    margin-left: 1012px;
    bottom: 235px;
    z-index: 10;
    text-align: center;
    & div {
        width: 70px;
        background: #fff;

        display: block;
        padding: 8px 1px;
        .btm-act-icn {
            @include wh(28px, 28px);
            font-size: 24px;
            display: block;
            margin: 0 auto;

            .order-numbers {
                display: inline-block;
                position: absolute;
                background-color: #f23030;
                line-height: 16px;
                font-style: normal;
                border-radius: 8px;
                padding: 0 4px;
                @include sc(8px, #fff);
                top: 0;
                right: 10px;
                border: 1px solid #fff;
            }
        }
        .btn_text {
            display: block;
            line-height: 18px;
            text-align: center;
            @include sc(12px, #000);
        }
    }
}
.saleoff_info {
    padding: 10px;
    color: #f23030;
    font-weight: 500;
    background: #f5f5f5;
    border-top: 1px solid #eaeaea;
}
.btn-warning {
    color: #b49cd8;
    border-color: #b49cd8;
    background: #fff;
    &:active,
    &:hover {
        border-color: #b49cd8;
        background: #b49cd8;
        color: #fff;
    }
}

.btn-danger {
    color: #fff;
    border-color: #8666b8;
    background: #8666b8;
    &:active,
    &:hover {
        border-color: #8666b8;
        background: #fff;
        color: #8666b8;
    }
}
.cart_dialog {
    .goods_list {
        .goods {
            display: flex;
            color: #333;
            background: #fafafa;
            position: relative;
            box-sizing: border-box;
            padding: 5px 15px 5px 15px;
            border-bottom: 1px solid #eff2f5;
            .goods_img {
                display: inline-block;
                vertical-align: middle;
                width: 90px;
                img {
                    @include wh(100%, 100%);
                }
            }
            .goods_spec {
                flex: 1;
                margin-left: 10px;
                .name {
                    line-height: 26px;
                    @include text--ellipsis;
                }
                .spec {
                    line-height: 26px;
                    display: inline-block;
                    .spec_name {
                        line-height: 26px;
                        display: inline-block;
                    }
                }
                .am-text-danger {
                    line-height: 26px;
                    @include sc(16px, #8666b8);
                }
            }
            .goods_count {
                display: inline-block;
                @include text--middle(35px);
                width: 150px;
                text-align: right;
                @include position--absolute(null, 3%, 10px, null);
            }
            .del_btn {
                position: absolute;
                right: 10px;
                padding: 2px 5px;
                @include text--middle(22px);
                @include sc(16px, #f23030);
            }
        }
        .gifts {
            padding: 5px 15px 5px 15px;
            .spec {
                .item {
                    display: inline-block;
                }
            }
        }
    }
    .price_info {
        position: relative;
        margin-top: 5px;
        &_item {
            padding: 3px 10px;
            font-size: 14px;
            color: #000;
            display: flex;
            > * {
                display: block;
                &:first-child {
                    min-width: 100px;
                    margin-right: 10px;
                    text-align: right;
                }
                &:last-child {
                    word-break: normal;
                    word-wrap: break-word;
                    text-align: right;
                    flex: 1;
                    &.total {
                        color: #f23030;
                    }
                }
            }
        }
    }
    .order_info {
        width: 900px;
        margin: 10px auto;
        .text_bold {
            .el-button {
                border-radius: 0;
                line-height: 0;
                width: 50%;
                float: left;
                margin-left: 0;
            }
        }
    }
}
.success_dialog {
    .text_success {
        font-size: 18px;
        text-align: center;
        .ok {
            font-size: 35px;
            vertical-align: middle;
        }
    }
    .main_orderinfo {
        margin: 10px auto;
        width: 70%;
        div {
            line-height: 24px;
        }
        .text_danger {
            color: #f23030;
        }
    }
    .main_warninfo {
        padding: 15px;
        line-height: 21px;
        &.text_warning {
            color: #eba23a;
        }
    }
    .bottom_button {
        text-align: center;
    }
}
</style>
