<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control  :titles="['流行','新款','精选']"
                  @tabControlClick="ControlClick"
                  ref="tabcontrol1"
                  v-show="tabcontrol1Show"
                   :class="{tab_control2:tabcontrol1Show}"></tab-control>
    <scroll class="scroll" ref="scroll" @scrollDown="scrollDown" @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImgLoad.once="swiperImgLoad"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="['流行','新款','精选']" @tabControlClick="ControlClick" ref="tabcontrol2"></tab-control>
      <goods-list :goodsList="getGoodsTypeList"></goods-list>
    </scroll>
    <back-to @click.native="clickBackTo" v-show="backTopShow"></back-to>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from '@/components/common/scroll/Scorll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTo from '@/components/content/backTo/BackTo'
  import {debounce} from '@/common/utils'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeDate, getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
      Scroll,
      BackTo,
    },
    data() {
      return {
        banner: [],
        dKeyword: [],
        keywords: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentGoodsType: 'pop',
        backTopShow:false,
        tabcontrol2OffsetTop:0,
        tabcontrol1Show:false,
        bscrollY:0,
      }
    },
    computed: {
      getGoodsTypeList() {
        return this.goods[this.currentGoodsType].list;
      }

    },
    destroyed() {
    },
    // activated() {
    // this.$refs.scroll.refresh()
    //   this.$refs.scroll.scrollTo(0,this.bscrollY,0)
    // },
    // deactivated() {
    //   console.log("xxx");
    //   console.log(this.bscrollY = this.$refs.scroll.scroll.y);
    // },
    created() {
      // 获取首页数据
      this.getHomeDate();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {

      //防抖动函数使用
      const refresh = debounce(this.$refs.scroll.refresh,200);

      //监听事件总线消息，解决better-scroll滚动加载图片问题
      this.$bus.$on("imgLoadFinish",() =>{
        // this.$refs.scroll && this.$refs.scroll.refresh();
        refresh();
      });
      //获取轮播图加载完成后滚动内容距离顶部距离
    },
    activated(){

    },
    deactivated(){

    },
    methods: {
      /**
       *一般方法
       *
       */



      /**
       *事件监听相关
       *
       */
      //计算轮播图后tabcontrol2距离顶部的距离
      swiperImgLoad(){
        this.tabcontrol2OffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      },
      loadMore(){
        this.getHomeGoods(this.currentGoodsType)
        this.$refs.scroll.finishLoadMore();
      },
      scrollDown(position){
        // 1、什么时候现象backtop图标
        this.backTopShow = (-position.y) > 1000
        // 2、什么时候显示tabcontrol1
        this.tabcontrol1Show =  (-position.y) > this.tabcontrol2OffsetTop;
      },

      clickBackTo(){
        console.log(this.$refs.backto);
        this.$refs.scroll.backTo(0,0,500);
      },
      ControlClick(index) {
        switch (index) {
          case 0:
            this.currentGoodsType = 'pop'
            break;
          case 1:
            this.currentGoodsType = 'new'
            break;
          case 2:
            this.currentGoodsType = 'sell'
            break;
        }
        this.$refs.tabcontrol1.active_index=index;
        this.$refs.tabcontrol2.active_index=index;
      },

      /**
       网络请求相关
       */
      getHomeDate() {
        getHomeDate().then(res => {
          this.banner = res.data.data.banner.list;
          this.dKeyword = res.data.data.dKeyword.list;
          this.keywords = res.data.data.keywords.list;
          this.recommend = res.data.data.recommend.list;

        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
        })
      }
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /*原生滚动需要绝对定位*/
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9;
  }

  #home {
    padding: 44px 0px;
  }
  .tab_control2{
    position: relative;
    z-index: 9;
  }
  /*吸顶效果*/
  /*.tab_control {*/
  /*position: sticky;*/
  /*top: 44px;*/
  /*}*/
  .scroll{
    overflow: hidden;
    position:absolute;
    left: 0px;
    right: 0px;
    bottom: 48px;
    top: 44px;
  }
</style>
