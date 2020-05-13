<template>
  <div id="all">
    <Header></Header>
    mine
  </div>
</template>

<script>
import Header from '@/components/header/index.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
#all {
  padding: 10px;
  height: 100%;
  .scroll {
    height: 200px;
    overflow: hidden;
  }
}
</style>
