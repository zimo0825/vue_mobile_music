<template>
  <div>
    <Header class="header"></Header>
    <Scroll class="scroll">
      <div id="all">
        <home-header></home-header>
        <Recommend></Recommend>
        <BsetMusic></BsetMusic>
        <NewSong></NewSong>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Header from '@/components/header/index.vue'
import HomeHeader from './homePage/homeHeader.vue'
import Recommend from './homePage/recommend.vue'
import BsetMusic from './homePage/bestMusic.vue'
import NewSong from './homePage/newSong.vue'
import Scroll from '@/components/scroll/index.vue'

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
.scroll {
  height: 100vh;
  #all {
    padding: 0.625rem;
  }
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 0.125rem;
  z-index: 9;
}
</style>
