<template>
  <div>
    <div class="top">
      <span @click="back" class="iconfont icon-fanhui"></span>
      <h3>排行榜</h3>
    </div>
    <Scroll class="scroll" ref="scroll">
      <lazy-component>
        <officialList></officialList>
        <recommendList></recommendList>
        <allList></allList>
      </lazy-component>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/index.vue'
import officialList from './officialList/index'
import allList from './allList/index'
import recommendList from './recommendList/index'

export default {
  components: {
    officialList,
    recommendList,
    allList,
    Scroll
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.$bus.$on('imgLoad', () => {
      this.$refs.scroll.refresh()
    })
  }
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  height: 3.75rem;
  align-items: center;
  text-align: center;

  span {
    width: 3.75rem;
    font-size: 1.875rem;
  }
  h3 {
    flex: 1;
    font-size: 1.25rem;
    margin-right: 3.75rem;
  }
}
.scroll {
  height: calc(100vh - 3.125rem);
  padding: 0 0.125rem;
}
</style>
