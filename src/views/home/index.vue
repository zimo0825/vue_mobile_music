<template>
  <div id="all">
    <Header></Header>

    <Scroll>
      <home-header></home-header>
      <Recommend></Recommend>
      <NewSong></NewSong>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/index.vue'
import Header from '@/components/header/index.vue'
import HomeHeader from './homePage/homeHeader.vue'
import Recommend from './homePage/recommend.vue'
import NewSong from './homePage/newSong.vue'
export default {
  components: {
    Header,
    HomeHeader,
    Recommend,
    NewSong,
    Scroll
  }
}
</script>

<style lang="less" scoped>
#all {
  padding: 10px;
}
</style>
