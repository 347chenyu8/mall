<template>
  <div class="goods-item" @click="goodsItemClick">
    <img :src="goods.show.img" @load="imgLoad"/>
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goods:{
        type:Object,
        defaults(){
          return null
        }
      }
    },
    methods:{
      //为了解决better-scroll滚动时高度不实时刷新，导致的滚动卡顿问题，使用事件总线来完成
      imgLoad(){
        this.$bus.$emit("imgLoadFinish")
      },
      //图片点击跳转到详情页
      goodsItemClick(){
        this.$router.push({
          path:'/detail',
          query:{
            id:this.goods.iid
          }
        })
      }
    }


  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
