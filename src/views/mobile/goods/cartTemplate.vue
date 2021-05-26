<template>
    <div class="body_class">
        <div class="main_header">
            <nav class="nav">
                <div @click="onClickLeft">
                    <van-icon name="arrow-left" color="#fff" />
                </div>
            </nav>
            <div class="title">{{$t("order_comfirmation")}}</div>
        </div>
        <div class="body_panel">
            <div class="goods_list">
                <div class="goods_info">
                    <van-card :title="goods.goods_name" :desc="goods.remark" :num="total_count" :price="goods.shop_price|money" :currency="dollar" :thumb="goods.image_url" />
                    <div class="spec_info">
                        <div class="spec_groups" v-for="(gitem, ikey) in selectGoods" :key="ikey">
                            <!-- <a href="javascript:void(0);" class="del_btn" >刪除</a> -->
                            <div class="del_btn" v-if="ikey > 0">
                                <i class="el-icon-circle-close" @click.prevent="remove(ikey)"></i>
                            </div>
                            <div v-for="(item, index) in gitem.goodsSpec" :key="index">
                                <div class="spec_title">{{item.base_spec_name}}</div>
                                <div class="spec_list" v-for="(spec, skey) in item.spec_list" :key="skey">
                                    <div :class="{spec_item: index == 0, option_item: index != 0, on: item._select == spec.id}" @click="item._select = spec.id">
                                        <img v-if="index == 0" v-lazy="spec.item_image" width="50px">
                                        <span>{{spec.item_name}}</span>
                                        <div class="sticky"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="spec_title">購買數目</div>
                            <div class="addNum">
                                <van-stepper v-model="gitem.number" integer :min="1" :max="store_count" :step="1" :default-value="1" />
                            </div>
                        </div>
                        <div class="spec_groups" v-if="goodsProm && goodsProm.prom.prom_type == 1">
                            <div v-for="(gitem, gindex) in selectGift" :key="gindex">
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
                                <!-- <div class="spec_title">赠品數目</div>
                                <div class="addNum">
                                    <van-stepper v-model="gitem.number" integer :min="1" :max="1" :step="1" :default-value="1" />
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-form ref="orderForm" :model="orderForm" :rules="ruleValidate" label-position="right" label-width="40px">
                <div class="order_form">
                    <div class="add_other_button">
                        <el-button @click="incData">
                            <span v-if="goodsProm != ''">{{goodsProm.prom.prom_name}}</span>
                            <span v-else>{{ $t("click_buy_more") }}</span>
                        </el-button>
                    </div>
                    <el-form-item :label="$t('name')" prop="consignee" required label-width="80px" size="small">
                        <el-input :placeholder="$t('name')" v-model="orderForm.consignee"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('mobile_phone')" prop="mobile" required label-width="80px" size="small">
                        <el-input :placeholder="$t('mobile_phone')" v-model="orderForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('area')" prop="district" label-width="80px">
                        <el-col :span="11">
                            <el-select size="small" v-model="orderForm.city" :placeholder="$t('please_select_province')" v-on:change="getCity($event)">
                                <el-option v-for="item in citys" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12" :offset="1">
                            <el-select size="small" v-model="orderForm.district" :placeholder="$t('please_select_city')">
                                <el-option v-for="item in districts" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item :label="$t('address')" prop="address" label-width="80px">
                        <el-input size="small" :placeholder="$t('address')" v-model="orderForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="特別提醒" label-width="80px" v-show="site.locale == 'TW'">
                        <div class="spec_div">我們所提供的產品配送區域僅限於台灣本島（外島地區的朋友請利用台灣親友地址做為收貨地址)，蘭嶼、澎湖、綠島、七星岩、崇明島、金門等配送地點需加收NT$260運費，其它地區不另收運費</div>
                    </el-form-item>
                    <el-form-item :label="$t('email')" prop="email" label-width="80px">
                            <el-input size="small" placeholder="沒有郵箱可以不填" v-model="orderForm.email"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('remark')" prop="message" label-width="80px">
                            <el-input v-model="orderForm.message" type="textarea" :autosize="{ minRows: 2, maxRows: 3}" placeholder="有什麼特殊要求可以寫在這裡喲">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('payment')" label-width="80px">
                        <span class="pay_span">{{ $t("cash_on_delivery") }}</span>
                    </el-form-item>
                    <el-card class="bottom_card" shadow="none">
                        <span v-html="site.content"></span>
                    </el-card>
                </div>
            </el-form>

            <van-submit-bar :price="total_price*100" :currency="dollar" :button-text="$t('submit_order')" @submit="onSubmit" :loading="loading">
                <div slot="default">
                    <span>共{{total_count}}件商品</span>
                </div>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'vant'
import common from '@/libs/common'
import { areaList, cityList } from '@/libs/areaList'
export default {
    data() {
        return {
            goods_sn: '',
            goods: {},
            goodsSpec: [],
            goodsSkus: [],
            goodsProm: false,
            selectGoods: [],
            giftCount: 0,
            selectGift: [],
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
                    { required: true, message: this.$t('enter_your_name'), trigger: 'blur' }
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
        this.onLoad()
        this.citys = cityList(this.site.locale)
        if (this.site.locale == 'TW') {
            this.orderForm.province = '台灣'
        }
        this.$analytics.fbq.init(this.site.pix)
        this.$analytics.fbq.event('PageView')
    },
    watch: {
        total_count: function (val, oldval) {
            if (this.goodsProm && this.goodsProm.prom.prom_type == 1) {
                let diffvalue = parseInt(val / this.goodsProm.goods.buy_number)
                diffvalue = diffvalue * this.goodsProm.goods.send_number - this.giftCount
                if (diffvalue > 0) {
                    this.incGiftData(diffvalue)
                } else {
                    this.redGiftData(-diffvalue)
                }
            }
        },
        selectGoods: {
            handler: function (val, oldVal) {
                console.log(val)
            },
            // 深度观察
            deep: true
        }
    },
    computed: {
        ...mapGetters(['site']),
        dollar: function () {
            return common.dollar(this.site.locale)
        },
        spec_price() {
            // if (this.spec_key != '') {
            //     var sku = this.goodsSkus.find((s) => s.spec_key == this.spec_key)
            //     if (sku) {
            //         return sku.price
            //     }
            // }
            return this.goods.shop_price
        },
        store_count() {
            // if (this.spec_key != '') {
            //     var sku = this.goodsSkus.find((s) => s.spec_key == this.spec_key)
            //     if (sku) {
            //         return sku.store_count
            //     }
            // }
            return this.goods.store_count
        },
        total_count() {
            let num = 0
            this.selectGoods.forEach(item => num += item.number)
            return num
        },
        total_price() {
            let skus = []
            this.selectGoods.forEach(goods => {
                let specKey = common.getSpecKey(goods.goodsSpec)
                let mgoods = skus.find(s => s.spec_key == specKey)
                if (mgoods) {
                    mgoods.number += goods.number
                } else {
                    skus.push({
                        number: goods.number,
                        shop_price: this.getPrice(specKey)
                    })
                }
            })

            return common.calc(this.goodsProm, skus)
        }
    },
    methods: {
        getPrice(specKey) {
            if (specKey != '') {
                var sku = this.goodsSkus.find((s) => s.spec_key == specKey)
                if (sku) {
                    if (sku.price <= 0) {
                        return this.goods.shop_price
                    }
                    return sku.price
                }
            }
            return this.goods.shop_price
        },
        onClickLeft() {
            this.$router.push({
                name: 'goods',
                params: {
                    id: this.goods_sn
                }
            })
        },
        onLoad() {
            this.request('GoodsInfo', {
                id: this.goods_sn
            }).then((res) => {
                if (res.code == 200) {
                    this.goods = res.data.goods
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
                    this.initSelectGoods(1)
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
                        this.incGiftData(this.goodsProm.goods.send_number)
                    }
                }
            })
        },
        incData: function() {
            this.initSelectGoods(1)
        },
        initSelectGoods: function(count) {
            let g = this.$_.cloneDeep(this.goodsSpec)
            for (let index = 0; index < count; index++) {
                this.$set(this.selectGoods, this.selectGoods.length, {
                    goodsSpec: g,
                    number: 1
                })
            }
        },
        incGiftData: function(count) {
            for (var i = 0; i < count; i++) {
                this.$set(this.selectGift, this.selectGift.length, {
                    goodsSpec: this.$_.cloneDeep(this.goodsProm.goodsSpec),
                    number: 1
                })
                this.giftCount++
            }
        },
        redGiftData(count) {
            for (var i = 0; i < count; i++) {
                this.$delete(this.selectGift, this.selectGift.length - 1)
                this.giftCount--
            }
        },
        remove(sindex) {
            this.$delete(this.selectGoods, sindex)
        },
        onSubmit() {
            let skus = []
            let gifts = []
            if (this.total_count == 0) {
                Toast('您未選擇商品')
                return
            }
            this.$refs['orderForm'].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.selectGoods.forEach(goods => {
                        let specKey = common.getSpecKey(goods.goodsSpec)
                        let mgoods = skus.find(s => s.spec_key == specKey)
                        if (mgoods) {
                            mgoods.number += goods.number
                        } else {
                            skus.push({
                                goods_id: this.goods.id,
                                number: goods.number,
                                spec_key: specKey
                            })
                        }
                    })

                    if (this.goodsProm && this.goodsProm.prom.prom_type == 1) {
                        this.selectGift.forEach(gift => {
                            let specKey = common.getSpecKey(gift.goodsSpec)
                            let mgift = gifts.find(s => s.spec_key == specKey)
                            if (mgift) {
                                mgift.number += gift.number
                            } else {
                                gifts.push({
                                    goods_id: this.goods.id,
                                    number: gift.number,
                                    spec_key: specKey
                                })
                            }
                        })
                    }

                    let order = this.$_.clone(this.orderForm)
                    order['goods'] = skus
                    order['gifts'] = gifts
                    this.request('OrderSubmit', order).then((res) => {
                        if (res.code == 200) {
                            // this.orderResult.goods = res.data.goods
                            // this.orderResult.order_sn = res.data.order_sn
                            // this.orderResult.order_amount = res.data.order_amount
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
    }
}
</script>

<style lang='scss' scoped  src="@mobileTheme/goods/template.scss">
</style>