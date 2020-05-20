<template>
  <div>
    <Header class="header"></Header>
    <div id="all">
      mine
    </div>
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
  padding: 0 10px;
  height: 100%;
}
</style>
