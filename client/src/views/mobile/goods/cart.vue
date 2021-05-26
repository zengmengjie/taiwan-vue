<template>
    <div class="cart_class">
        <div class="main_header">
            <nav class="cart_nav">
                <div @click="onClickLeft">
                    <van-icon name="arrow-left" color="#fff" />
                </div>
            </nav>
        </div>
        <div class="home_panel">
            <div class="home_panel_hd" v-if="FilterCartList.length > 0">我已經選購的商品</div>
            <div class="cart_content">
                <div class="goods_list" v-if="FilterCartList.length > 0">
                    <div class="goods" v-for="(goods, index) in FilterCartList" :key="index">
                        <div class="goods_spec">
                            <div class="goods_name">
                                {{goods.goods_name}}
                            </div>
                            <div>{{dollar}}{{goods.shop_price | money}}</div>
                            <div class="spec_list">
                                <div class="spec">
                                    <div class="spec_name">
                                        規格：
                                    </div>
                                    <div class="goods_img" v-for="(sku, sindex) in goods.skus" :key="sindex">
                                        <div class="img_class">
                                            <img v-lazy="sku.image_url">
                                            <i class="del_btn el-icon-circle-close" @click="removeCartOfGoods(goods.goods_sn, sindex)"></i>
                                        </div>

                                        <div class="goods_spec_content">
                                            <div class="goods_spec_name">{{sku.spec_name.replace('_', ' ')}}</div>
                                            <div class="goods_price">{{dollar}}{{sku.shop_price | money}}</div>
                                            <div class="goods_count">
                                                <van-stepper v-model="sku.number" integer :min="1" :max="10" :step="1" :default-value="1" @change="cartChange(goods)" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="gift_font" v-if="goods.gifts" @click="showGift(goods)">赠品</div> -->
                            </div>
                        </div>
                        <div class="gift_spec" v-if="goods.gifts">
                            <div class="goods_name">
                                赠品:{{goods.prom.goods.name}}
                            </div>
                            <div class="spec">
                                <div v-for="(gitem, gindex) in goods.gifts" :key="gindex">
                                    赠品{{gindex + 1}}：
                                    <div v-for="(item, index) in gitem.goodsSpec" :key="index">
                                        <div class="spec_title">{{item.base_spec_name}}</div>
                                        <div class="spec_list" v-for="(spec, skey) in item.spec_list" :key="skey">
                                            <div :class="{spec_item: index == 0,option_item: index != 0, on: item._select == spec.id}" @click="item._select = spec.id">
                                                <div class="sticky"></div>
                                                <img v-if="index == 0" v-lazy="spec.item_image">
                                                <span>{{spec.item_name}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <van-popup v-model="show" position="right" class="gift_popup">
                        <div class="gift_spec" v-if="changeGift">
                            <div class="goods_name">
                                赠品:{{changeGift.prom.goods.name}}
                            </div>
                            <div class="spec">
                                <div v-for="(gitem, gindex) in changeGift.gifts" :key="gindex">
                                    赠品{{gindex + 1}}：
                                    <div v-for="(item, index) in gitem.goodsSpec" :key="index">
                                        <div class="spec_title">{{item.base_spec_name}}</div>
                                        <div class="spec_list" v-for="(spec, skey) in item.spec_list" :key="skey">
                                            <div :class="{spec_item: index == 0,option_item: index != 0, on: item._select == spec.id}" @click="item._select = spec.id">
                                                <div class="sticky"></div>
                                                <img v-if="index == 0" v-lazy="spec.item_image">
                                                <span>{{spec.item_name}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-popup> -->
                </div>
                <div v-else>
                    購物車為空
                </div>
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
                <!-- <div class="saleoff_info">
                    <span>購滿 2 件 立減 NT200;&nbsp;</span>
                </div> -->
                <div class="order_info">
                    <el-form :model="orderForm" :rules="ruleValidate" ref="orderForm" label-width="80px">
                        <el-form-item :label="$t('name')" prop="consignee">
                            <el-input size="small" :placeholder="$t('name')" v-model="orderForm.consignee"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('mobile_phone')" prop="mobile">
                            <el-input size="small" :placeholder="$t('mobile_phone')" v-model="orderForm.mobile"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('area')" prop="district">
                            <el-col :span="11">
                                <el-select size="medium" v-model="orderForm.city" placeholder="請選取縣市" v-on:change="getCity($event)">
                                    <el-option v-for="item in citys" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12" :offset="1">
                                <el-select size="medium" v-model="orderForm.district" placeholder="鄉鎮市區">
                                    <el-option v-for="item in districts" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item :label="$t('address')" prop="address">
                            <el-input size="small" placeholder="詳細地址" v-model="orderForm.address"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('email')" prop="email">
                            <el-input size="small" placeholder="沒有郵箱可以不填" v-model="orderForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="備註" prop="message">
                            <el-input v-model="orderForm.message" type="textarea" :autosize="{ minRows: 2, maxRows: 3}" placeholder="有什麼特殊要求可以寫在這裡喲">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <van-row class="text_bold">
                <van-col span="12">
                    <van-button @click="onClickLeft" type="danger" class="btn btn-warning backcart_btn">返回湊單</van-button>
                </van-col>
                <van-col span="12">
                    <van-button :loading="loading" @click="addOrder" class="btn btn-danger order_btn">提交訂單</van-button>
                </van-col>
            </van-row>
        </div>
        <home-footer></home-footer>
    </div>
</template>
<script>
import { Toast } from 'vant'
import { mapGetters, mapActions } from 'vuex'
import HomeFooter from '@/views/common/homeFooter'
import common from '@/libs/common'
import regex from '@/libs/regex'
import { areaList, cityList } from '@/libs/areaList'
export default {
    data() {
        return {
            goods_sn: '',
            orderForm: {
                consignee: '',
                province: '',
                city: '',
                district: '',
                address: '',
                mobile: '',
                email: '',
                message: ''
            },
            ruleValidate: {
                consignee: [
                    { required: true, message: '姓名 不能為空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '詳細地址 不能為空', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '手機 不能為空', trigger: 'blur' }
                ]
            },
            citys: [],
            districts: [],
            loading: false

        }
    },
    mounted() {
        this.goods_sn = this.$route.params.id
        this.citys = cityList(this.site.locale)
        if (this.site.locale == 'TW') {
            this.orderForm.province = '台灣'
        }
        this.$analytics.fbq.init(this.site.pix)
        this.$analytics.fbq.event('PageView')
    },
    computed: {
        ...mapGetters(['site', 'cartList', 'promList']),
        dollar: function () {
            return common.dollar(this.site.locale)
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
        ...mapActions(['removeCart', 'clearCart']),
        onClickLeft() {
            this.$router.push({
                name: 'goods',
                params: {
                    id: this.goods_sn
                }
            })
        },

        removeCartOfGoods(sn, sindex) {
            this.removeCart({ sn: sn, j: sindex })
        },
        cartChange(goods) {
            //判断是否买送活动
            if (goods.prom.prom.prom_type == 1) {
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
                            this.$refs['orderForm'].resetFields()
                            Toast('下單成功')
                            this.loading = false
                            this.$router.push({
                                name: 'success',
                                params: {
                                    order: res.data
                                }
                            })
                        }
                    })
                }
            })
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
        }
    },
    components: {
        HomeFooter
    }
}
</script>

<style lang='scss' src="@mobileTheme/goods/cart.scss">
</style>
