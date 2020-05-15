<template>
  <div id="all">
    <Header></Header>
    <Scroll class="content">
      <home-header></home-header>
      <Recommend></Recommend>
      <BsetMusic></BsetMusic>
      <NewSong></NewSong>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/index.vue'
import Header from '@/components/header/index.vue'
import HomeHeader from './homePage/homeHeader.vue'
import Recommend from './homePage/recommend.vue'
import BsetMusic from './homePage/bestMusic.vue'
import NewSong from './homePage/newSong.vue'

export default {
  components: {
    Header,
    HomeHeader,
    Recommend,
    BsetMusic,
    NewSong,
    Scroll
  }
}
</script>

<style lang="less" scoped>
#all {
  padding: 10px;
  height: 100%;
  position: relative;
  .content {
    height: calc(100vh - 60px);
  }
}
</style>
