<template>

    <div id="app">
        <router-view v-wechat-title="title" img-set="/static/favicon.ico"></router-view>

        <scroll-to target='top'>
        </scroll-to>
    </div>

</template>

<script>
import Vue from 'vue'
import ScrollTo from '@/components/ScrollTo'
import { mapGetters } from 'vuex'
export default {
    name: 'app',
    watch: {
        site: function (val) {
            if (val) {
                this.$i18n.locale = val.locale
            }
        }
    },
    computed: {
        ...mapGetters(['title', 'site'])
    },
    components: {
        ScrollTo
    }
}

</script>