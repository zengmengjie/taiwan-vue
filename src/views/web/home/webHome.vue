<template>
    <div>
        <web-header></web-header>
        <!-- 内容 -->
        <div class="main_content">
            <div class="home_top_panel">
                <swiper :options="topSwiper" class="topSwiper" v-for="(pic, index) in banner" :key="index">
                    <swiper-slide>
                        <img :src="pic.image_url">
                    </swiper-slide>
                </swiper>
                <div>
                    <div class="home_panel home_top_notice">
                        <div class="home_panel_hd">商城公告</div>
                        <div class="home_panel_bd">品質生活從這裡開始。每天大量新品限時特惠，等你來搶！！！</div>
                    </div>
                    <!-- <div class="home_panel home_top_findorder">
                        <div class="home_panel_hd">查詢訂單</div>
                        <div class="home_panel_bd">
                            <div class="am-form-group">
                                <el-input size="medium" v-model="phone" placeholder="請輸入手機進行査詢"></el-input>
                                <el-button type="danger" plain size="medium" @click="goSearch">查詢</el-button>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <!-- 商品列表 -->
            <div class="home_panel">
                <mall-goods></mall-goods>
            </div>
        </div>
        <web-footer></web-footer>
    </div>
</template>

<script>
import {
    swiper, swiperSlide
} from 'vue-awesome-swiper'
import {
    mapGetters
} from 'vuex'
import WebHeader from '@/views/common/webHeader'
import WebFooter from '@/views/common/webFooter'
import mallGoods from './model/mallGoods'
export default {
    data() {
        return {
            topSwiper: {
                loop: true,
                speed: 3000,
                autoplay: true,
                setWrapperSize: true,
                autoplayDisableOnInteraction: false,
                observeParents: true
            },
            phone: '',
            banner: []

        }
    },
    mounted() {
        this.getBanner()
        this.$analytics.fbq.init(this.site.pix)
        this.$analytics.fbq.event('PageView')
    },
    computed: {
        ...mapGetters(['site'])
    },
    methods: {
        goSearch() {
            this.$router.push(
                {
                    name: 'search',
                    params: {
                        phone: this.phone
                    }
                }
            )
        },
        //Banner图
        getBanner() {
            this.request('Adv', {
                place_key: 'Banner'
            }).then((res) => {
                if (res.code === 200) {
                    this.banner = res.data
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
        swiper,
        swiperSlide,
        WebHeader,
        WebFooter,
        mallGoods
    }
}
</script>
<style lang='scss' scoped>
.home_top_panel {
  height: 344px;
  margin-top: 0;
  margin-bottom: 20px;
  & > div:first-child {
    width: 65%;
    background-color: #fff;
  }
  & > div:last-child {
    width: 35%;
  }
  & > div {
    float: left;
    height: 100%;
  }
}

.home_panel_bd {
  padding: 0.05rem 0.55rem;
}
.home_top_notice {
  margin: 0 0 0 8px;
  height: 63.7%;
}
.home_top_findorder {
  margin: 22px 0 0 8px;
  height: 30%;
}
</style>
