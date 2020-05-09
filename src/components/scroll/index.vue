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
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.bscroll, {
        // scrollX: true
        click: true,
        dblclick: true,
        refreshDelay: {
          type: Number,
          default: 20
        },
        stopPropagation: true
      })
    }, 20)
  },
  methods: {
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
