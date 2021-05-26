<template>
    <div class="footer_class">

        <div class="main_footer">
            <ul class="footer_tabs">
                <li>
                    <router-link :to="{name: 'home'}">
                        首頁
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'mobile-about', params: {type: 'us'}}">
                        關於我們
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'mobile-about', params: {type: 'contact'}}">聯繫我們</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'mobile-about', params: {type: 'privacy'}}">隱私保障</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'mobile-about', params: {type: 'service'}}">服務條款</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'mobile-about', params: {type: 'distribution'}}">配送政策</router-link>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            search_input: ''
        }
    },
    methods: {

    }
}
</script>

