<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banner">
        <a :href="item.link">
          <img :src="item.image" @load="swiperImgLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    data(){
      return {

      }
    },
    props:{
      banner:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      swiperImgLoad(){
        this.$emit("swiperImgLoad")
      }
    }
  }
</script>

<style scoped>

</style>
