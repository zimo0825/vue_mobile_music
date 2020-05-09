<template>
  <div>
    <div class="header">
      <span @click="back" class="iconfont icon-fanhui"></span>
      <h3>{{ this.$route.query.keywords }}</h3>
    </div>
    <Scroll>
      <div class="container">
        <div
          @dblclick="selectItem(item, index)"
          class="wrapper"
          v-for="(item, index) in hotMusicList"
          :key="index"
        >
          <div class="top">
            <div class="singer">{{ item.name }}</div>
          </div>
          <div class="bottom">
            <div class="singer">{{ item.artists[0].name }}</div>
            <div class="album">-{{ item.album.name }}</div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import api from '@/api/index.js'
import Scroll from '../scroll/index.vue'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      hotMusicList: []
    }
  },
  components: {
    Scroll
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getHotMusic() {
      api.search.getMusic(this.$route.query.keywords, 20).then(async res => {
        this.hotMusicList = await res.data.result.songs
      })
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.hotMusicList,
        index
      })
    },
    ...mapActions(['selectPlay'])
  },
  created() {
    this.getHotMusic()
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.keywords != oldVal.query.keywords) {
        this.getHotMusic()
      }
      return
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  span {
    font-size: 30px;
    width: 60px;
    text-align: center;
  }
  h3 {
    flex: 1;
    text-align: center;
    margin-right: 60px;
    color: #696ec9;
    font-size: 18px;
  }
}
.container {
  padding: 10px;
  .wrapper {
    display: flex;
    height: 60px;
    flex-direction: column;
    .top {
      height: 40px;
      display: flex;
      line-height: 50px;
      .singer {
        color: #44b64e;
        height: 40px;
        font-size: 17px;
        // background: red;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .bottom {
      flex: 1;
      display: flex;
      color: #767a73;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
    }
  }
}
</style>
