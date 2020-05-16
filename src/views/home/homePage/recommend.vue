<template>
  <div>
    <!-- 歌单推荐 -->
    <div class="newSong">
      <div class="top">
        <h3>人气歌单推荐</h3>
        <span @click="toSongList">歌单广场</span>
      </div>

      <div class="container" ref="bscroll">
        <div class="wrapper" ref="wrappers">
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
  </div>
</template>

<script>
import api from '@/api/index.js'
import BScroll from 'better-scroll'

export default {
  data() {
    return {
      recommend: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.bscroll, {
        scrollX: true,
        click: true,
        dblclick: true,
        eventPassthrough: 'vertical',
        stopPropagation: true
      })
    })
  },
  methods: {
    // 动态获取需要滑动部分父级的宽度
    personScroll() {
      let width = 6 * 120
      this.$refs.wrappers.style.width = width + 'px'
    },
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
    this.getRecommendLists(),
      this.$nextTick(() => {
        this.personScroll()
      })
  }
}
</script>

<style lang="less" scoped>
.newSong {
  height: 180px;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
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

  .container {
    width: 100vw;
    .wrapper {
      white-space: nowrap;
      .content {
        padding: 3px;
        width: 110px;
        display: inline-block;
        img {
          width: 100%;
          border-radius: 15px;
          position: relative;
        }
        .play {
          position: absolute;
          margin-top: -106px;
          margin-left: 5px;
          span {
            font-size: 12px;
            color: #fff;
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
}
</style>
