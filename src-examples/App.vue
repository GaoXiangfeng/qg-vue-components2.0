<style lang="less">
@import '../src/assets/qg.less';
#app{
  font-family: sans-serif;
}
.slide-left-enter {
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave {
  opacity: 0;
}
.slide-left-enter-active {
  transition: transform .5s;
}

.slide-right-enter {
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave {
  opacity: 0;
}
.slide-right-enter-active {
  transition: transform .5s;
}

</style>


<template>
<div id="app">
  <qg-toast :open="open" :message="message" :styleObject="styleObject">
  </qg-toast>
  
  <qg-header v-if="show" :title="title" :back="back">  </qg-header>
  <transition :name="slide">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    back() {
      window.history.go(-1)
    }
  },
  computed: {
    ...mapState({
      message: state => state.qg.toast.message,
      open: state => state.qg.toast.open,
      styleObject: state => state.qg.toast.styleObject
    }),
    show() {
      return ['/', '/home'].indexOf(this.$route.path) < 0;
    },
    title() {
      return this.$route.meta.title
    },
    slide() {
      return this.show ? 'slide-left' : 'slide-right'
    }
  }
}
</script>