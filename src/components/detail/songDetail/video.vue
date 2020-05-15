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
  height: calc(100vh - 120px);
  .wrappers {
    height: 90px;
    display: flex;
    .left {
      width: 140px;
      .play {
        position: absolute;
        margin-top: -80px;
        display: flex;
        font-size: 12px;
        color: #fff;
        margin-left: 5px;
        align-items: center;
        span {
          font-size: 10px;
          margin-right: 2px;
          font-weight: 600;
        }
      }
      img {
        position: relative;
        border-radius: 10px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 5px;
      .top {
        height: 40px;
        font-size: 15px;
      }
      .bottom {
        flex: 1;
        display: flex;
        align-items: center;
        color: #a19494;
        margin-top: -10px;
        font-size: 12px;
      }
    }
  }
}
</style>
