<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return {
        scroll:null,
      }
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:3,//监听滚动位置
        pullUpLoad:true,//监听滚动到底部
      })

      this.scroll.on("scroll",position =>{
        this.$emit("scrollDown",position);
      })

      this.scroll.on("pullingUp",() =>{
        this.$emit("pullingUp");
      })


    },
    methods:{
      backTo(x,y,time=500){
        this.scroll.scrollTo(x,y,time);
      },
      //刷新上拉加载更多
      finishLoadMore(){
        this.scroll.finishPullUp();

      },
      refresh(){
        // console.log("refresh");
        this.scroll.refresh();
      }
    }
  }
</script>

<style scoped>

</style>
