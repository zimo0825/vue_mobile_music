<template>
  <div>
    <Scroll class="container">
      <div class="wrappers" v-for="item in video" :key="item.id">
        <div class="left" @click="toVideoDetail(item)">
          <img :src="item.coverUrl" alt="" />
          <div class="play">
            <span class="iconfont icon-bofang"></span>
            <h3>{{ parseInt(item.playTime / 10000) + '万' }}</h3>
          </div>
        </div>
        <div class="right">
          <div class="top">{{ item.title }}</div>
          <div class="bottom">
            <span>{{ (item.durationms / 1000 / 60).toFixed(2) }}, </span>
            <h3>by {{ item.creator[0].userName }}</h3>
          </div>
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
    toVideoDetail(item) {
      this.$router.push('/playvideo?vid=' + item.vid)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: calc(100vh - 7.5rem);
  .wrappers {
    height: 5.625rem;
    display: flex;
    .left {
      width: 8.75rem;
      .play {
        position: absolute;
        margin-top: -5rem;
        display: flex;
        font-size: 0.75rem;
        color: #fff;
        margin-left: 0.3125rem;
        align-items: center;
        span {
          font-size: 0.625rem;
          margin-right: 0.125rem;
          font-weight: 600;
        }
      }
      img {
        position: relative;
        border-radius: 0.625rem;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 0.3125rem;
      .top {
        height: 2.5rem;
        font-size: 0.9375rem;
      }
      .bottom {
        flex: 1;
        display: flex;
        align-items: center;
        color: #a19494;
        margin-top: -0.625rem;
        font-size: 0.75rem;
      }
    }
  }
}
</style>
