<template>
    <div class="main_footer">
        <div>
            <ul class="footer_tabs">
                <li>
                    <router-link to="/about">
                        <p> 關於我們</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'about', params: {type: 'contact'}}">
                        <p>聯繫我們</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'about', params: {type: 'privacy'}}">
                        <p>隱私保障</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'about', params: {type: 'service'}}">
                        <p>服務條款</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'about', params: {type: 'distribution'}}">
                        <p>配送政策</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <p>Copyright © 2017 All Rights Reserved.</p>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    }
}
</script>
<style lang='scss' scoped>
.main_footer {
  border-top: 3px solid #f23030;
  width: 100%;
  height: 160px;
  text-align: center;
  ul.footer_tabs {
    width: 890px;
    margin: 20px auto;
    list-style: none;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #111;
    li {
      width: 20%;
      float: left;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      & > a {
        color: #f23030;
        display: inline-block;
        width: 100%;
      }
    }
  }
}
</style>
