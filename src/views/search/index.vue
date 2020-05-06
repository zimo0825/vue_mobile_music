<template>
  <div id="all">
    <Header></Header>
    <Scroll>
      <Top></Top>
      <History></History>
      <HotSearch></HotSearch>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/index.vue'
import Header from '@/components/header/index.vue'
import Top from './searchPage/top.vue'
import History from './searchPage/history.vue'
import HotSearch from './searchPage/hotSearch.vue'

export default {
  components: {
    Header,
    Scroll,
    Top,
    History,
    HotSearch
  }
}
</script>

<style lang="less" scoped>
#all {
  padding: 10px;
}
</style>
