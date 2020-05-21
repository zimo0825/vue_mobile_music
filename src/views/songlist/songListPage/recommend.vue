<template>
  <Scroll class="scroll" ref="scroll">
    <div class="wrapper">
      <div
        class="content"
        @click="toRecommendDetail(item)"
        v-for="item in RecommendSong"
        :key="item.id"
      >
        <img :src="item.picUrl" alt="" @load="imgLoad" />
        <div class="playCount">
          <span class="iconfont icon-bofang1 icon"></span>
          <span>{{ item.playCount }}</span>
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </Scroll>
</template>

<script>
import api from '@/api/index.js'
import Scroll from '@/components/scroll/index.vue'
import { debounce } from '@/components/js/util.js'

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
    },
    imgLoad() {
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      refresh()
    }
  },
  created() {
    this.getRecommendSongs()
  }
}
</script>

<style lang="less" scoped>
.scroll {
  height: calc(100vh - 6.875rem);
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    .content {
      flex: 30%;
      padding: 0.1875rem;
      position: relative;

      .playCount {
        display: flex;
        position: absolute;
        margin-left: 10px;
        font-size: 0.8125rem;
        margin-top: 2px;
        top: 0;
        color: #fff;
        .icon {
          font-size: 0.5625rem;
          margin-top: 0.25rem;
        }
        span {
          font-size: 0.8125rem;
        }
      }
      img {
        border-radius: 0.625rem;
      }
      p {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.875rem;
      }
    }
  }
}
</style>
