<template>
    <div class="swipe">
       <qg-swipe :auto="3000">
      <qg-swipe-item>
        <img @click="deg()" src="../../src/assets/banner/01.jpg" height="368" width="1080" alt="">
      </qg-swipe-item>
      <qg-swipe-item><img @click="deg()" src="../../src/assets/banner/02.jpg" alt=""></qg-swipe-item>
      <qg-swipe-item><img @click="deg()" src="../../src/assets/banner/03.jpg" alt=""></qg-swipe-item>
      </qg-swipe>
    </div>
</template>

<script>
  export default {
    name: 'swipe',
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
        deg(){
            console.log(11111);
        }
    }
  }

</script>

<style lang="less">
.swipe{
    position:relative;
    height:200px;
    width:100%;
    img{
      width:100%;
      height:200px;
      z-index:1;
    }
}

</style>
