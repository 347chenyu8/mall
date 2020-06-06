<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="infoImges"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar"
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper"
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import Scroll from '@/components/common/scroll/Scorll'
  import {getDetail, Goods, Shop, GoodsParam} from "@/network/detail"

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    },
    data() {
      return {
        goodsId: null,
        infoImges: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
      // 1.获取商品ID
      this.goodsId = this.$route.query.id;
      // 2.查询数据
      getDetail(this.goodsId).then(res => {
        console.log(res);
        const dateResult = res.data.result
        this.infoImges = res.data.result.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(dateResult.itemInfo, dateResult.columns, dateResult.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(dateResult.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = dateResult.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(dateResult.itemParams.info, dateResult.itemParams.rule)
      })

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
