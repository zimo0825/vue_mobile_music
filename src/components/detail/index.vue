<template>
  <div id="all">
    <div class="wrapper">
      <div class="top">
        <span @click="back" class="iconfont icon-fanhui"></span>
        <van-search
          v-model="value"
          @search="onSearch"
          shape="round"
          placeholder="请输入歌名"
        />
      </div>
    </div>

    <van-tabs v-model="activeIndex">
      <van-tab title="单曲" name="songs">
        <Songs @select="selectItem" :songs="songs"></Songs>
      </van-tab>
      <van-tab title="视频" name="video">
        <Video :video="video"></Video>
      </van-tab>
      <van-tab title="歌手" name="singer">
        <Single :singer="singer"></Single>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from '@/api/index.js'
import Single from './songDetail/singer.vue'
import Songs from './songDetail/songs.vue'
import Video from './songDetail/video.vue'

import { mapActions } from 'vuex'

export default {
  data() {
    return {
      value: '',
      songs: [],
      activeIndex: 'songs',
      video: [],
      singer: []
    }
  },
  components: {
    Single,
    Songs,
    Video
  },
  watch: {
    // 输入的歌曲变化时重新请求数据并渲染页面
    $route(newVal, oldVal) {
      if (newVal.query.k != oldVal.query.k) {
        this.getmusic()
      }
      return
    },
    // value() {
    //   // 实现input连续输入，只发一次请求
    //   clearTimeout(this.timeout)
    //   this.timeout = setTimeout(() => {
    //     this.getmusic()
    //   }, 300)
    // },

    // 监听标签切换时数据的改变
    activeIndex() {
      let type = 1
      let limit = 20
      switch (this.activeIndex) {
        case 'songs':
          type = 1
          limit = 20
          break
        case 'video':
          type = 1014
          limit = 10
          break
        case 'singer':
          type = 100
          limit = 10
          break
        default:
          break
      }
      api.search.getMusic(this.$route.query.k, limit, type).then(res => {
        if (type == 1) {
          this.songs = res.data.result.songs
        } else if (type == 1014) {
          this.video = res.data.result.videos
        } else {
          this.singer = res.data.result.artists
        }
      })
    }
  },

  methods: {
    back() {
      this.$router.push('/search')
      this.value = ''
    },
    onSearch() {
      if (this.value == '') {
        this.$toast('请输入歌名')
      } else {
        this.$router.push('/songDetail?k=' + this.value)
      }
    },
    getmusic() {
      api.search.getMusic(this.$route.query.k, 20).then(async res => {
        this.songs = await res.data.result.songs
      })
    },

    // 跳转到play界面
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions(['selectPlay'])
  },
  created() {
    this.getmusic()
  }
}
</script>

<style lang="less" scoped>
#all {
  padding: 10px;
  .wrapper {
    display: flex;
    // height: 100vh;

    .top {
      height: 55px;
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #aaa;
      span {
        width: 50px;
        font-size: 28px;
        text-align: center;
      }
      .van-search {
        flex: 1;
        border-radius: 10px;
      }
    }
  }
  .van-tabs {
    margin-top: 10px;
  }
}
</style>
