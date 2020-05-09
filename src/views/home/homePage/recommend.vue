<template>
  <div>
    <!-- 每日推荐歌单 -->
    <div class="recommend">
      <h3>推荐歌单</h3>
      <div class="wrapper">
        <div
          class="content"
          v-for="item in recommend"
          :key="item.id"
          @click="toRecommendDetail(item)"
        >
          <img :src="item.coverImgUrl" alt="" />
          <span>{{ item.playCount }}</span>
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
          if (this.recommend[i].playCount > 100000) {
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
  h3 {
    height: 30px;
  }
  .wrapper {
    flex: 1;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .content {
      flex: 30%;
      padding: 3px;
      // border-radius: 15px;

      img {
        width: 100%;
        height: 110px;
        border-radius: 15px;
      }
      span {
        position: absolute;
        color: #fff;
        margin-left: -50px;
        font-size: 13px;
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
