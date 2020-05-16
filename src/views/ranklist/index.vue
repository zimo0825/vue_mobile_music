<template>
  <div>
    <div class="top">
      <span @click="back" class="iconfont icon-fanhui"></span>
      <h3>排行榜</h3>
    </div>
    <Scroll class="scroll">
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
  }
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  height: 60px;
  align-items: center;
  text-align: center;

  span {
    width: 60px;
    font-size: 30px;
  }
  h3 {
    flex: 1;
    font-size: 20px;
    margin-right: 60px;
  }
}
.scroll {
  height: calc(100vh - 50px);
  padding: 0 2px;
}
</style>
