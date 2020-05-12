<template>
  <div id="all">
    <Header></Header>
    <Top></Top>
    <Scroll class="content">
      <HotSearch></HotSearch>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/index.vue'
import Header from '@/components/header/index.vue'
import Top from './searchPage/top.vue'
import HotSearch from './searchPage/hotSearch.vue'

export default {
  components: {
    Header,
    Scroll,
    Top,
    HotSearch
  }
}
</script>

<style lang="less" scoped>
#all {
  padding: 10px;
  .content {
    height: calc(100vh - 120px);
  }
}
</style>
