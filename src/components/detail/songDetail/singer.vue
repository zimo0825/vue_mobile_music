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
  height: calc(100vh - 120px);
  background: #f6f6f663;

  .content {
    display: flex;
    height: 80px;
    margin: 5px 0;
    align-items: center;
    span {
      width: 60px;
      height: 60px;
      margin-left: 5px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #eee;
      }
    }
    h3 {
      line-height: 60px;
      margin-left: 50px;
    }
  }
}
</style>
