<template>
  <Scroll class="scroll">
    <div class="wrapper">
      <div
        class="content"
        @click="toRecommendDetail(item)"
        v-for="item in RecommendSong"
        :key="item.id"
      >
        <div class="container">
          <img :src="item.picUrl" alt="" />
          <div class="playCount">
            <span class="iconfont icon-bofang1 icon"></span>
            <span>{{ item.playCount }}</span>
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </Scroll>
</template>

<script>
import api from '@/api/index.js'
import Scroll from '@/components/scroll/index.vue'

export default {
  data() {
    return {
      RecommendSong: []
    }
  },
  components: {
    Scroll
  },
  methods: {
    getRecommendSongs() {
      api.find.getRecommendSong().then(res => {
        this.RecommendSong = res.data.result
        for (let i = 0; i < this.RecommendSong.length; i++) {
          if (this.RecommendSong[i].playCount > 10000) {
            this.RecommendSong[i].playCount =
              parseInt(this.RecommendSong[i].playCount / 10000) + '万'
          }
        }
      })
    },
    toRecommendDetail(item) {
      this.$router.push('/recommenddetail?id=' + item.id)
    }
  },
  created() {
    this.getRecommendSongs()
  }
}
</script>

<style lang="less" scoped>
.scroll {
  height: calc(100vh - 110px);
  .wrapper {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .content {
      flex: 30%;
      padding: 3px;
      .container {
        height: 160px;
        margin: 5px 0;
        .playCount {
          display: flex;
          position: absolute;
          margin-left: 2px;
          margin-top: -110px;
          color: #fff;
          .icon {
            font-size: 9px;
            margin-top: 4px;
          }
          span {
            font-size: 13px;
          }
        }
        img {
          border-radius: 10px;
        }
        p {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
