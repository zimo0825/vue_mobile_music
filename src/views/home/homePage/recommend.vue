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
            <span class="iconfont icon-bofang1"></span>
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
  height: 380px;
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  width: 100%;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    h3 {
      height: 30px;
      font-weight: 600;
    }
    span {
      // padding: 2px;
      width: 70px;
      font-weight: 500;
      text-align: center;
      line-height: 30px;
      font-size: 13px;
      border: 1px solid #ccc;
      border-radius: 15px;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    .content {
      padding: 3px;
      flex: 30%;
      img {
        width: 100%;
        border-radius: 15px;
        position: relative;
      }
      .play {
        position: absolute;
        margin-top: -111px;
        margin-left: 5px;
        span {
          font-size: 12px;
          color: #fff;
        }
      }
      p {
        font-size: 14px;
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
