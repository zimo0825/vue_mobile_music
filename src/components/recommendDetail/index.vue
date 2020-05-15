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
        <h3>
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
            <h3>
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
      this.isStyick = -position.y > 222
    },
    back() {
      this.$router.go(-1)
    },
    getRecommendDetails() {
      api.find.getRecommendDetail(this.$route.query.id).then(res => {
        this.RecommendList = res.data.playlist
        this.avatarUrl = this.RecommendList.creator.avatarUrl
        this.nickname = this.RecommendList.creator.nickname
        console.log(this.RecommendList)
        this.tracks = res.data.playlist.tracks
      })
    }
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
  height: 50px;
  display: flex;
  position: absolute;
  background: #af96ac;
  margin-top: -1px;
  width: 99.9%;
  z-index: 99;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    span {
      font-size: 18px;
      margin-left: 5px;
    }
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin-left: 10px;
    }
    h4 {
      font-size: 14px;
      color: #cfcaca;
    }
  }
  .right {
    display: flex;
    margin-right: 10px;
    background: red;
    align-items: center;
    color: #fff;
    font-size: 14px;
    justify-content: center;
    width: 100px;
    height: 40px;
    margin-top: 5px;
    border-radius: 20px;
    h4 {
      color: #eee;
    }
  }
}
.top {
  display: flex;
  background: #af96ac;
  height: 60px;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid #af96ac;
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
.scroll {
  height: calc(100vh - 58px);

  .header {
    display: flex;
    height: 270px;
    flex-direction: column;
    background: #af96ac;
    .container {
      flex: 1;
      display: flex;
      overflow: hidden;
      top: 60px;
      .left {
        width: 160px;
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
        padding: 6px;
        flex-direction: column;
        height: 150px;
        margin-top: 10px;
        h3 {
          height: 43px;
          font-size: 17px;
          color: #fff;
          font-weight: 500;
          margin-bottom: 5px;
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
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          h2 {
            color: #d5d5d5;
            margin-left: 5px;
            font-size: 15px;
          }
        }
        span {
          font-size: 13.5px;
          height: 38px;
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
      height: 40px;
      display: flex;
      align-items: center;
      span {
        flex: 1;
        text-align: center;
        font-size: 28px;
      }
    }
    .playAll {
      height: 50px;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        span {
          font-size: 18px;
          margin-left: 12px;
        }
        h3 {
          font-size: 18px;
          font-weight: 600;
          margin-left: 10px;
        }
        h4 {
          font-size: 14px;
          color: #cfcaca;
        }
      }
      .right {
        display: flex;
        margin-right: 10px;
        background: red;
        align-items: center;
        color: #fff;
        font-size: 14px;
        justify-content: center;
        width: 100px;
        height: 40px;
        margin-top: 5px;
        border-radius: 20px;
        h4 {
          color: #eee;
        }
      }
    }
  }
}
</style>
