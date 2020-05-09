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
    height: 60px;
    position: sticky;
    top: 60px;
    align-items: center;
    color: #fff;
    z-index: 10;
    span {
      text-align: center;
      font-size: 30px;
      width: 60px;
    }
    h3 {
      margin: 0 6px;
      display: block;
      font-size: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .header {
    display: flex;
    height: 220px;
    flex-direction: column;
    background: #8e989f;

    .container {
      flex: 1;
      display: flex;
      overflow: hidden;
      top: 60px;
      .left {
        width: 150px;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
        img {
          border-radius: 10px;
          width: 90%;
        }
      }
      .right {
        display: flex;
        flex: 1;
        padding: 26px 2px;
        flex-direction: column;

        h3 {
          height: 40px;
          font-size: 17px;
          color: #f9f6f6;
          margin-bottom: 5px;
        }
        span {
          flex: 1;
          font-size: 13.5px;
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
      height: 50px;
      display: flex;
      align-items: center;
      span {
        font-size: 28px;
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
