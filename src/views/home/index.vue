<template>
  <div id="all">
    <Header></Header>
    <home-header></home-header>
    <Recommend></Recommend>
    <BsetMusic></BsetMusic>
    <NewSong></NewSong>
  </div>
</template>

<script>
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
    NewSong
  }
}
</script>

<style lang="less" scoped>
#all {
  padding: 10px;
}
</style>
