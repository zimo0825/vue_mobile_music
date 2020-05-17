<template>
  <div>
    <div class="wrapper">
      <div class="top">
        <h3>不可错过的精品歌曲</h3>
        <div class="play-item" @click="playAll">
          <span class="iconfont icon-bofang1"></span>
          <h2>
            播放全部
          </h2>
        </div>
      </div>

      <div class="bottom" ref="bscroll">
        <div class="bottom-item" ref="wrappers">
          <div
            @click="toSong(item, index)"
            class="container"
            v-for="(item, index) in BestMusics"
            :key="item.id"
          >
            <div class="left">
              <img :src="item.picUrl" alt="" />
            </div>
            <div class="right">
              <div class="right-top">
                <span>{{ item.name }}</span>
                <h3>- {{ item.song.artists[0].name }}</h3>
              </div>
              <div class="bottom">
                <h4>{{ item.song.album.company }}</h4>
              </div>
            </div>
            <div class="play">
              <span class="iconfont icon-bofang2"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import BScroll from 'better-scroll'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      BestMusic: [],
      BestMusics: []
    }
  },
  methods: {
    getRecommendMusics() {
      api.find.getRecommendMusic().then(res => {
        this.BestMusic = res.data.result
        this.BestMusics = this.BestMusic.slice(0, 9)
      })
    },
    personScroll() {
      let width = 3 * 340
      this.$refs.wrappers.style.width = width + 'px'
    },
    toSong(item, index) {
      console.log(this.BestMusics, index)
      this.selectPlay({
        list: this.BestMusics,
        index
      })
    },
    playAll() {
      const arr = []
      for (let i = 0; i < this.BestMusics.length; i++) {
        arr.push(this.BestMusics[i])
        this.selectPlay({
          list: arr,
          index: 0
        })
      }
    },
    ...mapActions(['selectPlay'])
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
  created() {
    this.getRecommendMusics(),
      this.$nextTick(() => {
        this.personScroll()
      })
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  height: 290px;
  margin-top: 10px;
  // background: red;
  .top {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-weight: 600;
    }
    .play-item {
      display: flex;
      color: #000;
      width: 100px;
      justify-content: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      line-height: 28px;

      span {
        font-size: 12px;
        font-weight: 600;
      }
      h2 {
        font-size: 14px;
        overflow: hidden;
      }
    }
  }
  .bottom {
    height: 220px;
    overflow: hidden;
    touch-action: scroll;
    .bottom-item {
      white-space: nowrap;
      display: flex;
      flex-wrap: wrap;
      .container {
        flex: 1;
        height: 72px;
        display: flex;
        .left {
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 60px;
          }
        }
        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-top: 10px;
          .right-top {
            display: flex;
            span {
              font-size: 14px;
              margin-right: 2px;
            }
            h3 {
              font-size: 13px;
              margin-left: 4px;
              color: #999191;
            }
          }
          .bottom {
            margin-top: 12px;
            h4 {
              font-size: 14px;
              color: #999191;
            }
          }
        }
        .play {
          width: 40px;
          display: flex;
          align-items: center;
          span {
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>
