<template>
  <div id="play" v-show="playlist.length > 0">
    <div class="maxplay" v-show="maxPlay">
      <div class="top">
        <van-icon color="#ccc" name="arrow-left" @click="back" />
        <div class="right">
          <span>{{ songDetail.name }}</span>
          <p>{{ singerName }}</p>
        </div>
      </div>
      <div class="content">
        <div class="imgWrapper" @click="checks" v-show="check">
          <img :src="picurl" alt="" :class="cdCls" />
        </div>
        <div class="lyric" @click="checks" v-show="!check">
          <Scroll ref="lyricList" :data="lyrics && lyrics.lines">
            <p
              ref="lyricLine"
              class="text"
              :class="{ current: currentLineNum === index }"
              v-for="(item, index) in lyrics"
              :key="index"
            >
              {{ item.txt }}
            </p>
          </Scroll>
        </div>
      </div>
      <div class="bottom">
        <div class="like">
          <span style="fontSize:35px" class="iconfont icon-fenxiang"></span>
          <span class="iconfont icon-xihuan"></span>
          <span class="iconfont icon-comment"></span>
        </div>
        <div class="time">
          <span>{{ format(currentTime) }}</span>
          <div class="content">
            <bar :percent="percent" @percentChange="percentChange"></bar>
          </div>
          <span>{{ format(currentSong.duration / 1000) }}</span>
        </div>
        <div class="play">
          <span
            class="iconfont mode"
            :class="iconMode"
            @click="changeMode"
            style="fontSize:28px"
          >
          </span>
          <span class="iconfont icon-shangyishou" @click="prev"></span>
          <span
            @click="togglePlaying"
            v-show="!playState"
            class="iconfont icon-bofang2"
            style="fontSize:45px"
          ></span>
          <span
            @click="togglePlaying"
            v-show="playState"
            style="fontSize:45px"
            class="iconfont icon-zanting"
          ></span>
          <span class="iconfont icon-xiayishou" @click="next"></span>
          <span class="iconfont icon-gedan" style="fontSize:25px"></span>
        </div>
      </div>
    </div>
    <div class="miniplay" v-show="!maxPlay">
      <div class="left" @click="open">
        <div class="imgWrapper">
          <img :src="picurl" alt="" :class="cdCls" />
        </div>
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
            class="iconfont icon-bofang2"
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
      @timeupdate="updataTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import Scroll from '../scroll/index.vue'
import api from '@/api/index.js'
import { mapMutations, mapGetters } from 'vuex'
import bar from '../../components/bar/index.vue'
import { playMode } from '../js/config.js'
import { shuffle } from '../js/util.js'
import Lyric from 'lyric-parser'

export default {
  data() {
    return {
      playState: true,
      musicUrl: '',
      songDetail: [],
      singerName: '',
      picurl: '',
      currentTime: 0,
      check: true,
      lyric: null,
      lyrics: null,
      currentLineNum: 0
    }
  },
  components: {
    bar,
    Scroll
  },
  computed: {
    // 歌曲图片旋转样式
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    percent() {
      return this.currentTime / (this.currentSong.duration / 1000)
    },
    iconMode() {
      return this.mode === playMode.sequence
        ? 'icon-xunhuanbofang'
        : this.mode === playMode.loop
        ? 'icon-danquxunhuan1'
        : 'icon-suijibofang'
    },
    ...mapGetters([
      'playlist',
      'maxPlay',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
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
      // 当暂停播放时，停止歌词滚动
      if (this.lyric) {
        this.lyric.togglePlay()
      }
    },
    // 切换歌曲图片和歌词
    checks() {
      this.check = !this.check
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
    // 获取歌曲歌词
    getMusicLyrics() {
      api.search.getMusicLyric(this.currentSong.id).then(res => {
        this.lyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
        this.lyrics = this.lyric.lines
        if (this.playing) {
          this.lyric.play()
        }
      })
    },
    // 使当前播放的歌词和时间对上
    handleLyric({ lineNum }) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    // 下一首，如果当前播放歌曲索引等于列表播放长度，则播放的是最后一首歌，需要把索引重置为第一首歌
    next() {
      if (this.playlist.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
    },
    // 上一首，如果当前播放歌曲索引为-1，则播放的是第一首歌，需要把索引重置为最后一首歌
    prev() {
      if (this.playlist.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
    },
    // 当前歌曲播放结束时，判断播放模式，然后播放下一首
    end() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    // 循环播放
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      //歌曲播放完时，把歌词重新重置到最初的位置
      if (this.lyric) {
        this.lyric.seek(0)
      }
    },
    updataTime(e) {
      this.currentTime = e.target.currentTime
    },
    // 格式化歌曲播放时间
    format(interval) {
      interval = interval | 0
      let minute = (interval / 60) | 0
      let second = interval % 60
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
    // 拖动小球时改变进度条
    percentChange(percent) {
      const currentTime = (this.currentSong.duration / 1000) * percent
      this.$refs.audio.currentTime = currentTime

      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.lyric) {
        this.lyric.seek(currentTime * 1000)
      }
    },
    // 改变播放模式按钮状态
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },

    // 控制播放器显示哪一个
    ...mapMutations({
      setMaxPlay: 'SET_MAX_PLAY',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST'
    })
  },
  created() {
    this.MusicDetail()
    this.getMusicUrl()
    this.getMusicLyrics()
  },
  watch: {
    // 监听数据变化时重新请求所有数据，并且把播放状态重置为true
    currentSong() {
      this.MusicDetail()
      this.getMusicUrl()
      this.getMusicLyrics()
      this.playState = true
      // 歌曲变化时，重置当前歌词
      if (this.lyric) {
        this.lyric.stop()
      }
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
  .maxplay {
    height: 100vh;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: fixed;
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
        font-size: 2.5rem;
      }
      .right {
        flex: 1;
        margin-left: 20px;
        font-size: 1.125rem;
        margin-top: 10px;
        span {
          color: #fff;
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 260px;
          display: block;
        }
        p {
          color: #bdc3c7;
          margin-top: 8px;
          font-size: 0.8125rem;
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
        width: 19.375rem;
        height: 19.375rem;
        margin: 0 auto;
        margin-top: 1.25rem;
        align-items: center;
        display: flex;
        position: relative;
        justify-content: center;
        border-radius: 50%;
        z-index: 999;
        img {
          border-radius: 50%;
          height: 17.5rem;
          position: absolute;
          width: 17.5rem;
          z-index: 2;
          &.play {
            animation: rotate 25s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
      .lyric {
        height: 23.125rem;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
      }
      .text {
        color: #b9b4b4;
        font-size: 0.9375rem;

        margin: 0.625rem 0;
        &.current {
          color: #fff;
        }
      }
    }
    .bottom {
      height: 12.5rem;
      display: flex;
      flex-direction: column;
      .like {
        height: 3.125rem;
        // background: red;
        display: flex;
        align-items: center;
        span {
          flex: 1;
          text-align: center;
          font-size: 1.75rem;
          color: #cac7c7;
        }
      }
      .time {
        height: 3.75rem;
        display: flex;
        align-items: center;
        span {
          width: 2.5rem;
          text-align: center;
          font-size: 0.8125rem;
          color: #fff;
        }
        .content {
          flex: 1;
          margin: 0 0.375rem;
        }
      }
      .play {
        display: flex;
        align-items: center;
        flex: 1;
        // background: blue;
        span {
          flex: 1;
          text-align: center;
          font-size: 2.25rem;
          color: #cac7c7;
        }
      }
    }
  }
  .miniplay {
    height: 3.75rem;
    width: 100%;
    background: #f8f8f6;
    align-items: center;
    display: flex;
    position: fixed;
    bottom: 0;
    margin-bottom: -1px;
    .left {
      width: 3.75rem;
      .imgWrapper {
        background: #9d9494;
        width: 3.4375rem;
        height: 3.4375rem;
        margin: 0 auto;
        align-items: center;
        display: flex;
        position: relative;
        justify-content: center;
        border-radius: 50%;
        img {
          width: 3rem;
          height: 3rem;
          z-index: 2;
          position: absolute;
          border-radius: 50%;
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
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
        margin-left: 0.625rem;
        // color: #999;
      }
      p {
        margin-left: 0.1875rem;
      }
    }
    .right {
      width: 6.25rem;
      display: flex;
      text-align: center;
      .right-one {
        width: 3.75rem;
        span {
          font-size: 1.75rem;
        }
      }
      .right-two {
        flex: 1;
        span {
          font-size: 1.75rem;
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
