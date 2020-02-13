<template>
  <div>
    <div class="box1">1</div>
    <div class="box2">2</div>
    <div class="box3">3</div>
    <router-view/>
  </div>
</template>

<script>
  // import {clone, deepClone} from '../utils/deepClone.js'
export default {
  name: 'home',
  components: {
  },
    data(){
      return{
      }
    },
    created(){
    },
    methods:{
    }
}
</script>

<style scoped lang="less">
  *{margin:0;padding:0;}
  html,body{height:100%; flex-wrap:wrap;} /*flex-wrap:wrap;因为后面有设width：100%*/
  body{display:flex;}
  .box1{background: #f00;}
  .box2{background: #0f0;}
  .box3{background: #00f;}
  @media screen and (min-width:1100px){ /*三栏布局*/
    .box1{width: 100px;} /*没有写高度，由内容撑起来*/
    .box2{flex:1; }
    .box3{width: 100px;}
  }
  @media screen and (min-width:800px) and (max-width:1100px){ /*二栏布局*/
    .box1{width: 100px;}
    .box2{flex:1; }
    .box3{width: 100%;}
  }
  @media screen and (max-width:800px) { /*一栏布局*/
    .box1,.box2,.box3{width: 100%;}
  }
</style>
