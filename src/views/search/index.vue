<template>
  <div>
    <Header class="header"></Header>
    <div id="all">
      <Top></Top>
      <Scroll class="content">
        <HotSearch></HotSearch>
      </Scroll>
    </div>
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
  padding: 0 0.625rem;
  .content {
    height: calc(100vh - 6.875rem);
  }
}
</style>
