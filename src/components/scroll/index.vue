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
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.bscroll, {
        click: true,
        dblclick: true,
        stopPropagation: true,
        bounce: {
          top: false
        },
        probeType: this.probeType
      })
    })
    // 监测y轴滚动距离
    this.$nextTick(() => {
      this.scroll.on('scroll', position => {
        // 向需要使用滚动距离的父组件发送scroll事件
        this.$emit('scroll', position)
      })
    })
  },
  methods: {
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
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
