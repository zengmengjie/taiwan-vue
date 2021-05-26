<template>
    <div class="home_panel_bd">
        <ul class="home_goods_ul">
            <li v-for="(goods, index) in goodsList" :key="index" @click="toGoodsInfo(goods.sn)">
                <div class="home_goods_info">
                    <div class="home_goods_hover">
                        <div class="home_goods_name">{{ goods.title }}</div>
                        <div class="home_goods_desc"></div>
                        <span class="home_goods_buy_btn">立即搶購</span>
                    </div>
                    <div class="home_goods_img">
                        <img v-lazy="goods.img" />
                    </div>
                    <div class="home_goods_pricebar">
                        <span>{{ goods.price |yuan}}</span>
                        <del v-if="goods.market_price">參考價{{goods.market_price | yuan}}</del>
                    </div>
                    <div class="home_goods_namebar">{{ goods.title }}</div>
                </div>
            </li>

        </ul>
    </div>
</template>
<script>
export default {
    props: {
        msg: { type: [Object, Array] }
    },
    data() {
        return {

            goodsList: [],
            showText: false,
            loading: false
        }
    },
    mounted() {
        this.onLoad()
    },
    methods: {
        onLoad() {
            this.request('GoodsAll', {
            }).then((res) => {
                if (res.code === 200) {
                    res.data.forEach(goods => {
                        this.goodsList.push({
                            sn: goods.goods_sn,
                            img: goods.image_url,
                            title: goods.goods_name,
                            price: Number(goods.shop_price),
                            market_price: Number(goods.market_price)
                        })
                    })
                    this.loading = false
                }
            })
        },
        toGoodsInfo(sn) {
            this.$router.push({
                name: 'goods',
                params: {
                    id: sn
                }
            })
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~theme/utils/index";
.home_goods_ul {
  margin-left: -0.325rem;
  margin-right: -0.325rem;
  margin-top: -0.325rem;
  font-size: 0;
  & li {
    width: 25%;
    display: inline-block;
    height: auto;
    padding: 0.5rem;
    vertical-align: top;
    cursor: pointer;
    & > a {
      line-height: 20px;
      color: #444;
    }
  }
  .home_goods_info {
    position: relative;
    .home_goods_hover {
      position: absolute;
      width: 100%;
      min-height: 220px;
      text-align: center;
      background: rgba(47, 47, 47, 0.9);
      z-index: 1;
      color: #fff;
      padding: 10px;
      opacity: 0;
      &:hover {
        opacity: 1;
      }
    }
    .home_goods_name {
      height: 40px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 700;
      text-align: left;
    }
    .home_goods_desc {
      height: 130px;
      text-align: left;
    }
    .home_goods_buy_btn {
      background: #f23030;
      padding: 10px 16px;
      font-size: 12px;
    }
    .home_goods_img {
      width: 100%;
      min-height: 220px;
      position: relative;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
        position: absolute;
        border: 1px solid #e6e6e6;
      }
    }
    .home_goods_pricebar {
      line-height: 30px;
      font-size: 12px;
      padding: 0 5px;
      & > span:first-child {
        font-weight: 600;
        font-size: 15px;
        color: #d2122b;
      }
      & > del {
        line-height: 30px;
        color: #a9a9a9;
        margin-left: 5px;
      }
    }
    .home_goods_namebar {
      font-size: 13px;
      padding: 0 5px;
      line-height: 16px;
      color: #000;
      @include text--overflow(2);
    }
  }
}
</style>
