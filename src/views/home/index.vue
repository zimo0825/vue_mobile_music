<template>
  <div id="all">
    <Header class="header"></Header>
    <!-- <Scroll class="scroll" ref="scroll"> -->
    <home-header></home-header>
    <Recommend></Recommend>
    <BsetMusic></BsetMusic>
    <NewSong></NewSong>
    <!-- </Scroll> -->
  </div>
</template>

<script>
import Header from '@/components/header/index.vue'
import HomeHeader from './homePage/homeHeader.vue'
import Recommend from './homePage/recommend.vue'
import BsetMusic from './homePage/bestMusic.vue'
import NewSong from './homePage/newSong.vue'
// import Scroll from '@/components/scroll/index.vue'

export default {
  components: {
    Header,
    HomeHeader,
    Recommend,
    BsetMusic,
    NewSong
    // Scroll
  }
}
</script>

<style lang="less" scoped>
#all {
  padding: 0.625rem;
  /deep/ .header {
    position: fixed;
    top: 0;
    z-index: 10;
    background: #fff;
    padding: 10px 10px 0 10px;
    width: 100%;
    left: 0;
  }
  // .scroll {
  //   height: 100vh;
  //   background: red;
  // }
}
</style>
