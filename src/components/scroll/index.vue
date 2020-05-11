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
        click: true,
        dblclick: true,
        stopPropagation: true,
        //阻止页面回弹
        bounce: {
          top: false,
          bottom: true,
          left: true,
          right: true
        }
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
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
