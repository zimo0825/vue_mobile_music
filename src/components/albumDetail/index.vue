<template>
  <div id="all">
    <van-sticky>
      <div class="top">
        <span @click="back" class="iconfont icon-fanhui"></span>
        <!-- <h3 v-for="(item, index) in RecommendList.tags" :key="index">
          {{ item }}
        </h3> -->
      </div>
    </van-sticky>
    <div class="header">
      <div class="container">
        <div class="left">
          <!-- <img :src="RecommendList.coverImgUrl" alt="" /> -->
        </div>
        <div class="right">
          <!-- <h3>{{ RecommendList.name }}</h3>
          <span>{{ RecommendList.description }}</span> -->
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
    </div>

    <div class="main"></div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data() {
    return {
      AlbumDetail: [],
      tracks: []
    }
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1)
    },
    getAlbumDetails() {
      api.find.getAlbumDetail(this.$route.query.id).then(res => {
        // this.RecommendList = res.data.playlist
        // this.tracks = res.data.playlist.tracks
        console.log(res)
      })
    }
  },
  created() {
    this.getAlbumDetails()
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.id != oldVal.query.id) {
        this.getAlbumDetails()
      }
      return
    }
  }
}
</script>

<style lang="less" scoped>
#all {
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    background: #8e989f;
    height: 3.75rem;
    position: sticky;
    top: 3.75rem;
    align-items: center;
    color: #fff;
    z-index: 10;
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
  .header {
    display: flex;
    height: 13.75rem;
    flex-direction: column;
    background: #8e989f;

    .container {
      flex: 1;
      display: flex;
      overflow: hidden;
      top: 3.75rem;
      .left {
        width: 9.375rem;
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
        padding: 1.625rem 0.125rem;
        flex-direction: column;

        h3 {
          height: 2.5rem;
          font-size: 1.0625rem;
          color: #f9f6f6;
          margin-bottom: 0.3125rem;
        }
        span {
          flex: 1;
          font-size: 0.8125rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      }
    }
    .bottom {
      height: 3.125rem;
      display: flex;
      align-items: center;
      span {
        font-size: 1.75rem;
        flex: 1;
        text-align: center;
        color: #d2cfcf;
      }
    }
  }

  .main {
    flex: 1;
  }
}
</style>
