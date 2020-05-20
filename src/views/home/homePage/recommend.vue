<template>
  <div>
    <!-- 歌单推荐 -->
    <div class="newSong">
      <div class="top">
        <h3>人气歌单推荐</h3>
        <span @click="toSongList">歌单广场</span>
      </div>
      <div class="wrapper">
        <div
          class="content"
          @click="toRecommendDetail(item)"
          v-for="item in recommend"
          :key="item.id"
        >
          <img :src="item.coverImgUrl" alt="" />
          <div class="play">
            <span style="fontSize:8px" class="iconfont icon-bofang1"></span>
            <span>{{ item.playCount }}</span>
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data() {
    return {
      recommend: []
    }
  },
  methods: {
    toSongList() {
      this.$router.push('/songlist')
    },
    getRecommendLists() {
      api.find.getRecommendList().then(res => {
        this.recommend = res.data.playlists
        for (let i = 0; i < this.recommend.length; i++) {
          if (this.recommend[i].playCount > 10000) {
            this.recommend[i].playCount =
              parseInt(this.recommend[i].playCount / 10000) + '万'
          }
        }
      })
    },
    toRecommendDetail(item) {
      this.$router.push('/recommenddetail?id=' + item.id)
    }
  },
  created() {
    this.getRecommendLists()
  }
}
</script>

<style lang="less" scoped>
.newSong {
  height: 23.75rem;
  display: flex;
  margin-top: 1.875rem;
  flex-direction: column;
  width: 100%;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.625rem;
    h3 {
      height: 1.875rem;
      font-weight: 600;
    }
    span {
      // padding: 2px;
      width: 4.375rem;
      font-weight: 500;
      text-align: center;
      line-height: 1.875rem;
      font-size: 0.8125rem;
      border: 1px solid #ccc;
      border-radius: 0.9375rem;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    .content {
      padding: 0.1875rem;
      flex: 30%;
      position: relative;
      img {
        border-radius: 0.9375rem;
      }
      .play {
        position: absolute;
        margin-left: 10px;
        font-size: 0.8125rem;
        margin-top: 2px;
        top: 0;
        span {
          font-size: 0.75rem;
          color: #fff;
        }
      }
      p {
        font-size: 0.875rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
