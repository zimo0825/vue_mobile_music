<template>
  <div>
    <Scroll class="container">
      <div class="wrappers" v-for="item in video" :key="item.id">
        <div class="content" @click="toVideo(item)">
          <img :src="item.coverUrl" alt="" />
          <span>{{ item.title }}</span>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/index.vue'

export default {
  data() {
    return {
      videoURl: ''
    }
  },
  components: {
    Scroll
  },
  props: {
    video: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  methods: {
    toVideo(item) {
      this.$router.push('/playvideo?vid=' + item.vid)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: calc(100vh - 120px);
  .content {
    height: 260px;
    padding: 10px;
    margin: 5px 0;
    img {
      border-radius: 15px;
    }
    span {
    }
  }
}
</style>
