<template>
  <div>
    <Scroll class="container">
      <div class="content" v-for="item in singer" :key="item.id">
        <span><img :src="item.img1v1Url" alt=""/></span>
        <h3>{{ item.name }}</h3>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/index.vue'

export default {
  components: {
    Scroll
  },
  props: {
    singer: {
      type: Array,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: calc(100vh - 7.5rem);
  background: #f6f6f663;

  .content {
    display: flex;
    height: 5rem;
    margin: 0.3125rem 0;
    align-items: center;
    span {
      width: 3.75rem;
      height: 3.75rem;
      margin-left: 0.3125rem;
      img {
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 50%;
        border: 1px solid #eee;
      }
    }
    h3 {
      line-height: 3.75rem;
      margin-left: 3.125rem;
    }
  }
}
</style>
