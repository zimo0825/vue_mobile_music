<template>
  <div>
    <div class="top">
      <span @click="back" class="iconfont icon-fanhui"></span>
      <h3 v-for="(item, index) in RecommendList.tags" :key="index">
        {{ item }}
      </h3>
    </div>
    <div class="playAllTop" v-show="isStyick">
      <div class="left">
        <span class="iconfont icon-bofang2"></span>
        <h3 @click="playAll">
          播放全部
        </h3>
        <h4>(共{{ RecommendList.trackCount }}首)</h4>
      </div>
      <div class="right">
        <h3>
          +收藏
        </h3>
        <h4>({{ RecommendList.subscribedCount }})</h4>
      </div>
    </div>
    <Scroll class="scroll" :probe-type="3" @scroll="scrollContent">
      <div class="header">
        <div class="container">
          <div class="left">
            <img :src="RecommendList.coverImgUrl" alt="" />
          </div>
          <div class="right">
            <h3>{{ RecommendList.name }}</h3>
            <div class="right-img">
              <img :src="avatarUrl" alt="" />
              <h2>{{ nickname }}</h2>
            </div>
            <span>{{ RecommendList.description }}</span>
          </div>
        </div>
        <div class="bottom">
          <span class="iconfont icon-pinglun1"></span>
          <span
            style="fontSize:35px;marginBottom:6px"
            class="iconfont icon-fenxiang"
          ></span>
          <span class="iconfont icon-xihuan"></span>
          <span class="iconfont icon-xiazai"></span>
        </div>
        <div class="playAll">
          <div class="left">
            <span class="iconfont icon-bofang2"></span>
            <h3 @click="playAll">
              播放全部
            </h3>
            <h4>(共{{ RecommendList.trackCount }}首)</h4>
          </div>
          <div class="right">
            <h3>
              +收藏
            </h3>
            <h4>({{ RecommendList.subscribedCount }})</h4>
          </div>
        </div>
      </div>
      <song :tracks="tracks"></song>
    </Scroll>
  </div>
</template>

<script>
import api from '@/api/index.js'
import song from './recommendDetailPage/song.vue'
import Scroll from '@/components/scroll/index.vue'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      RecommendList: {},
      tracks: [],
      isStyick: false,
      avatarUrl: '',
      nickname: ''
    }
  },
  components: {
    song,
    Scroll
  },
  methods: {
    scrollContent(position) {
      this.isStyick = -position.y > 220
    },
    back() {
      this.$router.go(-1)
    },
    getRecommendDetails() {
      api.find.getRecommendDetail(this.$route.query.id).then(res => {
        this.RecommendList = res.data.playlist
        if (this.RecommendList.subscribedCount > 10000) {
          this.RecommendList.subscribedCount =
            parseInt(this.RecommendList.subscribedCount / 10000) + '万'
        }
        this.avatarUrl = this.RecommendList.creator.avatarUrl
        this.nickname = this.RecommendList.creator.nickname
        this.tracks = res.data.playlist.tracks
      })
    },
    playAll() {
      const arr = []
      for (let i = 0; i < this.tracks.length; i++) {
        arr.push(this.tracks[i])
        this.selectPlay({
          list: arr,
          index: 0
        })
      }
    },
    ...mapActions(['selectPlay'])
  },
  created() {
    this.getRecommendDetails()
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.id != oldVal.query.id) {
        this.getRecommendDetails()
      }
      return
    }
  }
}
</script>

<style lang="less" scoped>
.playAllTop {
  height: 3.125rem;
  display: flex;
  position: absolute;
  background: #af96ac;
  margin-top: -1px;
  width: 99.8%;
  z-index: 99;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    span {
      font-size: 1.125rem;
      margin-left: 0.75rem;
    }
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-left: 0.625rem;
    }
    h4 {
      font-size: 0.875rem;
      color: #cfcaca;
    }
  }
  .right {
    display: flex;
    margin-right: 0.625rem;
    background: red;
    align-items: center;
    color: #fff;
    font-size: 0.875rem;
    justify-content: center;
    width: 6.25rem;
    height: 2.5rem;
    margin-top: 0.3125rem;
    border-radius: 1.25rem;
    h4 {
      color: #eee;
    }
  }
}
.top {
  display: flex;
  background: #af96ac;
  height: 3.75rem;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid #af96ac;
  span {
    text-align: center;
    font-size: 1.875rem;
    width: 3.75rem;
  }
  h3 {
    margin: 0 0.375rem;
    display: block;
    font-size: 1.5625rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.scroll {
  height: calc(100vh - 3.625rem);

  .header {
    display: flex;
    height: 16.875rem;
    flex-direction: column;
    background: #af96ac;
    .container {
      flex: 1;
      display: flex;
      overflow: hidden;
      top: 3.75rem;
      .left {
        width: 10rem;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
        img {
          border-radius: 0.625rem;
          width: 90%;
        }
      }
      .right {
        display: flex;
        flex: 1;
        padding: 0.375rem;
        flex-direction: column;
        height: 9.375rem;
        margin-top: 0.625rem;
        h3 {
          height: 2.6875rem;
          font-size: 1.0625rem;
          color: #fff;
          font-weight: 500;
          margin-bottom: 0.3125rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .right-img {
          flex: 1;
          display: flex;
          align-items: center;
          img {
            width: 1.875rem;
            height: 1.875rem;
            border-radius: 50%;
          }
          h2 {
            color: #d5d5d5;
            margin-left: 0.3125rem;
            font-size: 0.9375rem;
          }
        }
        span {
          font-size: 0.84375rem;
          height: 2.375rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          color: #d5d5d5;
          -webkit-box-orient: vertical;
        }
      }
    }
    .bottom {
      height: 2.5rem;
      display: flex;
      align-items: center;
      span {
        flex: 1;
        text-align: center;
        font-size: 1.75rem;
      }
    }
    .playAll {
      height: 3.125rem;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        span {
          font-size: 1.125rem;
          margin-left: 0.75rem;
        }
        h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-left: 0.625rem;
        }
        h4 {
          font-size: 0.875rem;
          color: #cfcaca;
        }
      }
      .right {
        display: flex;
        margin-right: 0.625rem;
        background: red;
        align-items: center;
        color: #fff;
        font-size: 0.875rem;
        justify-content: center;
        width: 6.25rem;
        height: 2.5rem;
        margin-top: 0.3125rem;
        border-radius: 1.25rem;
        h4 {
          color: #eee;
        }
      }
    }
  }
}
</style>
