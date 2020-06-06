<template>
  <div class="TabControl">
    <div v-for="(item,index) in titles" class="TabControl-item" :class="{active:active_index==index}"  @click="itemClick(index)">
    <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return{
        active_index:0,
      }
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      itemClick(index){
        this.active_index = index;
        this.$emit("tabControlClick",index);
      }
    }
  }
</script>

<style scoped>
  .TabControl{
    display: flex;
    background-color: #fff;
    font-size: 14px;
    text-align: center;
    height: 44px;
    line-height: 44px;
    z-index: 9;
  }
  .TabControl-item{
    flex: 1;

  }
  .TabControl-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }

</style>
