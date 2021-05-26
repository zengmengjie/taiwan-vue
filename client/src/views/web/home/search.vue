<template>
    <div>
        <web-header></web-header>
        <!-- 内容 -->
        <div class="main_content">
            <div class="home_panel" v-for="(item,index) in order" :key="index">
                <div class="home_panel_hd">
                    <span>时间：{{item.create_time |date}}</span>
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
                        <div v-for="(goods, index) in item.goods" :key="index">
                            <span>{{goods.goods_name}}</span>
                            <span>{{goods.spec_name}}</span>
                            <span>{{goods.goods_num}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <web-footer></web-footer>
    </div>
</template>

<script>

import WebHeader from '@/views/common/webHeader'
import WebFooter from '@/views/common/webFooter'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            order: []
        }
    },
    mounted() {
        this.search()
        this.$analytics.fbq.init(this.site.pix)
        this.$analytics.fbq.event('PageView')
    },
    computed: {
        ...mapGetters(['site'])
    },
    methods: {
        search() {
            this.request('OrderSearch', {
                mobile: this.$route.params.phone
            }).then((res) => {
                if (res.code === 200) {
                    this.order = res.data
                } else {
                    this.$message({
                        message: this.$t(res.message),
                        type: 'error'
                    })
                }
            })
        }

    },
    components: {

        WebHeader,
        WebFooter
    }
}
</script>
<style lang='scss' scoped>
.home_panel_hd {
  text-align: left;
  .status {
    float: right;
  }
}
.home_panel_bd {
  padding: 50px;
  div {
    line-height: 23px;
  }
}
</style>
