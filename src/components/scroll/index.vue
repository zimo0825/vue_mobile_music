<template>
  <div class="wrapper" ref="bscroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.bscroll, {
        // scrollX: true
        click: true,
        dblclick: true
      })
    })
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 95vh;
  overflow: hidden;
}
</style>
