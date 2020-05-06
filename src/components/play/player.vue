<template>
  <div id="play" v-show="playlist.length > 0">
    <div class="maxplay" v-show="maxPlay">
      <div class="top">
        <van-icon name="arrow-left" @click="back" />
        <div class="right">
          <span>{{ songDetail.name }}</span>
          <p>{{ singerName }}</p>
        </div>
      </div>
      <div class="content">
        <div class="imgWrapper">
          <img :src="picurl" alt="" :class="cdCls" />
        </div>
      </div>
      <div class="bottom">
        <div class="like">
          <span class="iconfont icon-gedan"></span>
          <span class="iconfont icon-xihuan"></span>
          <span class="iconfont icon-pinglun1"></span>
        </div>
        <div class="time">
          time
        </div>
        <div class="play">
          <span class="iconfont icon-shangyishou"></span>
          <span
            @click="togglePlaying"
            v-show="!playState"
            class="iconfont icon-bofang"
          ></span>
          <span
            @click="togglePlaying"
            v-show="playState"
            class="iconfont icon-zanting"
          ></span>
          <span class="iconfont icon-xiayishou"></span>
        </div>
      </div>
    </div>
    <div class="miniplay" v-show="!maxPlay">
      <div class="left" @click="open">
        <img :src="picurl" alt="" />
      </div>
      <div class="content" @click="open">
        <h3>{{ songDetail.name }}</h3>
        <p>- {{ singerName }}</p>
      </div>
      <div class="right">
        <div class="right-one">
          <span
            @click="togglePlaying"
            v-show="!playState"
            class="iconfont icon-bofang"
          ></span>

          <span
            @click="togglePlaying"
            v-show="playState"
            class="iconfont icon-zanting"
          ></span>
        </div>
        <div class="right-two">
          <span class="iconfont icon-gedan three"></span>
        </div>
      </div>
    </div>

    <audio
      :src="musicUrl"
      autoPlay
      style="display:none"
      ref="audio"
      controls
    ></audio>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      playState: true,
      musicUrl: '',
      songDetail: [],
      singerName: '',
      picurl: ''
    }
  },
  computed: {
    // 歌曲图片旋转样式
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    ...mapGetters(['playlist', 'maxPlay', 'currentSong', 'playing'])
  },
  methods: {
    // 切换小播放器
    back() {
      this.setMaxPlay(false)
    },
    // 切换全屏播放器
    open() {
      this.setMaxPlay(true)
    },
    // 切换播放按钮的状态
    togglePlaying() {
      this.setPlayingState(!this.playing)
      // 控制播放或者暂停按钮显示一个
      this.playState = !this.playState
    },
    MusicDetail() {
      api.search.songDetail(this.currentSong.id).then(async res => {
        this.singerName = await res.data.songs[0].ar[0].name
        this.songDetail = await res.data.songs[0]
        this.picurl = await res.data.songs[0].al.picUrl
      })
    },
    getMusicUrl() {
      api.search.getMusciUrl(this.currentSong.id).then(async res => {
        this.musicUrl = await res.data.data[0].url
      })
    },

    // 控制播放器显示哪一个
    ...mapMutations({
      setMaxPlay: 'SET_MAX_PLAY',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  },
  created() {
    this.MusicDetail()
    this.getMusicUrl()
  },
  watch: {
    // 监听数据变化时重新请求所有数据，并且把播放状态重置为true
    currentSong() {
      this.MusicDetail()
      this.getMusicUrl()
      this.playState = true
    },
    // 如果当前按钮是播放状态则播放当前歌曲，否则暂停
    playing(newPlaying) {
      const audio = this.$refs.audio
      newPlaying ? audio.play() : audio.pause()
    }
  }
}
</script>

<style lang="less" scoped>
#play {
  position: fixed;
  bottom: 0;
  width: 100vw;
  // height: 100%;
  z-index: 99;
  .maxplay {
    height: 100vh;
    background: rgb(119, 111, 111);
    display: flex;
    flex-direction: column;
    .top {
      height: 60px;
      display: flex;
      .van-icon {
        width: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 40px;
      }
      .right {
        flex: 1;
        margin-right: 20px;
        font-size: 18px;
        span {
          color: #fff;
          font-size: 14px;
        }
        p {
          color: #bdc3c7;
          margin-top: 8px;
          font-size: 13px;
          line-height: 0.1rem;
        }
      }
    }
    .content {
      flex: 1;
      // background: blue;
      text-align: center;
      .imgWrapper {
        background: rgb(71, 63, 63);
        width: 310px;
        height: 310px;
        margin: 0 auto;
        margin-top: 20px;
        align-items: center;
        display: flex;
        position: relative;
        justify-content: center;
        border-radius: 50%;
        img {
          border-radius: 50%;
          height: 280px;
          position: absolute;
          width: 280px;
          z-index: 2;
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
    .bottom {
      height: 220px;
      display: flex;
      flex-direction: column;
      .like {
        height: 50px;
        background: red;
        display: flex;
        align-items: center;
        span {
          flex: 1;
          text-align: center;
          font-size: 28px;
        }
      }
      .time {
        height: 40px;
      }
      .play {
        display: flex;
        align-items: center;
        flex: 1;
        background: blue;
        span {
          flex: 1;
          text-align: center;
          font-size: 38px;
        }
      }
    }
  }
  .miniplay {
    height: 60px;
    width: 100%;
    background: #e8e1ede3;
    align-items: center;
    display: flex;
    position: absolute;
    bottom: 0;
    .left {
      width: 60px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 5px;
        margin-top: 2px;
      }
    }
    .content {
      flex: 1;
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      h3 {
        margin-left: 10px;
        // color: #999;
      }
      p {
        margin-left: 3px;
      }
    }
    .right {
      width: 100px;
      display: flex;
      text-align: center;
      .right-one {
        width: 60px;
        span {
          font-size: 28px;
        }
      }
      .right-two {
        flex: 1;
        span {
          font-size: 28px;
        }
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
