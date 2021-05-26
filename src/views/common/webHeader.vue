<template>
    <div class="main_header">
        <div class="menu_div">
            <ul class="header_tabs">
                <li class="active">
                    <router-link :to="{name: 'home'}">
                        <p>首頁</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'about', params: {type: 'us'}}">
                        <p>關於我們</p>
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
                <li>
                   <router-link :to="{name: 'about', params: {type: 'privacy'}}">
                        <p>隱私保障</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'about', params: {type: 'contact'}}">
                        <p>聯繫我們</p>
                    </router-link>
                </li>
            </ul>
        </div>
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
.main_header {
  max-width: 100%;
  border-bottom: 1px solid #dcdada;
  position: relative;
  .menu_div {
    min-width: 890px;
    margin: 0 auto;
    background: #f23030;
    ul.header_tabs {
      width: 890px;
      margin: 0 auto;
      list-style: none;
      text-align: center;
      height: 40px;
      line-height: 40px;
      color: #fff;
      & > li {
        float: left;
        text-align: center;
        line-height: 40px;
        width: 16.666%;
        cursor: pointer;
        & > a {
          color: #fff;
          &:hover {
            color: #fff;
          }
          & > p {
            font-size: 16px;
          }
        }
      }
      & > li.active {
        & > a {
          & > p {
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
