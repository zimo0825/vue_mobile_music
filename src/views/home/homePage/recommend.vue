<template>
  <div>
    <!-- 每日推荐歌单 -->
    <div class="recommend">
      <div class="tag">
        <h3>推荐歌单</h3>
        <span @click="toSong">歌单广场</span>
      </div>

      <div class="wrapper">
        <div
          class="content"
          v-for="item in recommend"
          :key="item.id"
          @click="toRecommendDetail(item)"
        >
          <img :src="item.coverImgUrl" alt="" />
          <div class="playCount">
            <span class="iconfont icon-bofang icon"></span>
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
    getRecommends() {
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
    },
    toSong() {
      this.$router.push('/songlist')
    }
  },

  created() {
    this.getRecommends()
  }
}
</script>

<style lang="less" scoped>
.recommend {
  height: 400px;
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  .tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      height: 30px;
    }
    span {
      border: 1px solid #999;
      border-radius: 10px;
      font-size: 13px;
      padding: 0 8px;
    }
  }

  .wrapper {
    flex: 1;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 10px;
    .content {
      flex: 30%;
      padding: 3px;
      img {
        width: 100%;
        height: 110px;
        border-radius: 15px;
        position: relative;
      }
      .playCount {
        display: flex;
        position: absolute;
        margin-top: -110px;
        align-items: cneter;
        height: 15px;
        margin-left: 5px;
        span {
          color: #fff;
          font-size: 13px;
        }
        .icon {
          // width: 20px;
          font-size: 9px;
          margin-top: 4px;
        }
      }

      p {
        margin-top: -1px;
        position: absolute;
        font-size: 14px;
        width: 100px;
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
