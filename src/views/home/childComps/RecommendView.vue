<template>
  <div id="RecommendView">
    <div v-for="item in recommend" class="RecommendView_item">
      <a :href="item.link">
        <img :src="item.image"/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommend:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #RecommendView{
    display: flex;
    text-align: center;
    font-size: 12px;
    margin-bottom: 10px;
    padding: 10px 0 10px;
    border-bottom: #eee solid 5px;
  }
  .RecommendView_item{
    flex: 1;

  }
  .RecommendView_item img{
    height: 70px;
    width: 70px;
  }
</style>
