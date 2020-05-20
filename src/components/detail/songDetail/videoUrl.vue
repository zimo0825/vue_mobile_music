<template>
  <div>
    <div class="wrappers">
      <div class="video">
        <div class="video-item">
          <span @click="back" class="iconfont icon-fanhui"></span>
          <h3>精彩视频</h3>
        </div>

        <div class="play">
          <video :src="videoUrl" controls autoPlay></video>
        </div>
      </div>

      <Scroll v-show="this.comment.length > 0" class="scroll">
        <div class="comment" v-for="(item, index) in comment" :key="index">
          <div class="left">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="right">
            <div class="top">
              <div>{{ item.user.nickname }}</div>
              <div>{{ item.likedCount }} <van-icon name="good-job-o" /></div>
            </div>
            <div class="bottom">
              {{ item.content }}
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import Scroll from '@/components/scroll/index.vue'

export default {
  data() {
    return {
      videoUrl: '',
      comment: [],
      commentHeight: true
    }
  },
  components: {
    Scroll
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getVideoUrls() {
      api.search.getVideoUrl(this.$route.query.vid).then(res => {
        this.videoUrl = res.data.urls[0].url
      })
    },
    getVideoComments() {
      api.search.getVideoComment(this.$route.query.vid).then(res => {
        this.comment = res.data.hotComments
      })
    }
  },
  created() {
    this.getVideoComments()
    this.getVideoUrls()
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.vid != oldVal.query.vid) {
        this.getVideoUrls()
        this.getVideoComments()
      }
      return
    }
  }
}
</script>

<style lang="less" scoped>
.wrappers {
  padding: 0.625rem;
  .video {
    .video-item {
      height: 3.125rem;
      background: #000;
      display: flex;
      align-items: center;
      text-align: center;
      color: #fff;
      span {
        width: 3.75rem;
        font-size: 1.875rem;
      }
      h3 {
        flex: 1;
        font-size: 1.25rem;
        margin-right: 3.75rem;
      }
    }
    .play {
      height: 13.75rem;
    }
  }
  .scroll {
    height: calc(100vh - 17.5rem);
    .comment {
      height: 5rem;
      display: flex;
      margin: 0.625rem 0;
      background: #9d9090;
      border-radius: 0.625rem;
      .left {
        width: 3.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          border-radius: 50%;
          width: 2.5rem;
        }
      }
      .right {
        flex: 1;
        display: flex;
        padding: 0 0.625rem;
        flex-direction: column;
        .top {
          display: flex;
          height: 1.25rem;
          font-size: 0.9375rem;
          color: #dcdcdc;
          justify-content: space-between;
        }
        .bottom {
          flex: 1;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
