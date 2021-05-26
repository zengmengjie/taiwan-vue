<template>
    <div>
        <mobile-goods-info v-if="isMobile"></mobile-goods-info>
        <web-goods-info v-else></web-goods-info>
    </div>
</template>

<script>
import WebGoodsInfo from '@/views/web/goods/goodsInfo'
import MobileGoodsInfo from '@/views/mobile/goods/goodsInfo'
import common from '@/libs/common'

export default {
    data() {
        return {
            isMobile: false
        }
    },
    mounted() {
        this.isMobile = common.isMobile()
    },
    components: {
        WebGoodsInfo,
        MobileGoodsInfo
    }
}
</script>