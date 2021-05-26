<template>
    <div>
        <home-header></home-header>
        <swiper :options="topSwiper" class="topSwiper" v-if="banner.length > 0">
            <swiper-slide v-for="(image, index) in banner" :key="index">
                <img v-lazy="image.image_url">
            </swiper-slide>
        </swiper>
        <div class="home_panel">
            <div class="home_panel_hd">商城公告</div>
            <div class="home_panel_bd" style="padding: 10px;">
                品質生活從這裡開始。每天大量新品限時特惠，等你來搶！！！
            </div>
        </div>
        <home-list></home-list>
        <home-footer></home-footer>
    </div>

</template>

<script>
import {
    swiper, swiperSlide
} from 'vue-awesome-swiper'
import HomeHeader from '@/views/common/homeHeader'
import HomeFooter from '@/views/common/homeFooter'
import HomeList from './homeList'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            topSwiper: {
                autoplay: true,
                setWrapperSize: true,
                autoplayDisableOnInteraction: false,
                observeParents: true
            },
            banner: []

        }
    },
    computed: {
        ...mapGetters(['title', 'site'])
    },
    mounted() {
        this.getBanner()
        this.$analytics.fbq.init(this.site.pix)
        this.$analytics.fbq.event('PageView')
    },
    methods: {
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
        HomeHeader,
        HomeList,
        HomeFooter
    }
}
</script>
<style lang='scss' scoped >
</style>
