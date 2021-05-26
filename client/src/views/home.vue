<template>
    <div>
        <mobile-home v-if="isMobile"></mobile-home>
        <web-home v-else></web-home>
    </div>
</template>

<script>
import WebHome from '@/views/web/home/webHome'
import MobileHome from '@/views/mobile/home/mobileHome'
import common from '@/libs/common'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            isMobile: false
        }
    },
    mounted() {
        this.isMobile = common.isMobile()
        this.updateTitle(this.$t('goods_list'))
    },
    methods: {
         ...mapActions(['updateTitle'])
    },
    components: {
        WebHome,
        MobileHome
    }
}
</script>