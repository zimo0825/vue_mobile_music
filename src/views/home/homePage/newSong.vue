<template>
  <div>
    <!-- 新歌速递 -->
    <div class="newSong">
      <h3>新歌速递</h3>
      <div class="container" ref="bscroll">
        <div class="wrapper" ref="wrappers">
          <div
            class="content"
            @click="selectItem(item, index)"
            v-for="(item, index) in newSong"
            :key="item.id"
          >
            <img :src="item.album.blurPicUrl" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { mapActions } from 'vuex'
import BScroll from 'better-scroll'

export default {
  data() {
    return {
      newSong: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.bscroll, {
        scrollX: true,
        click: true,
        dblclick: true,
        stopPropagation: true
      })
    }, 20)
  },
  methods: {
    // 动态获取需要滑动部分父级的宽度
    personScroll() {
      let width = 6 * 120
      this.$refs.wrappers.style.width = width + 'px'
    },
    getNewSongList() {
      api.find.getNewSong().then(res => {
        this.newSong = res.data.data.slice(0, 6)
      })
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.newSong,
        index
      })
    },
    ...mapActions(['selectPlay'])
  },
  created() {
    this.getNewSongList(),
      this.$nextTick(() => {
        this.personScroll()
      })
  }
}
</script>

<style lang="less" scoped>
.newSong {
  height: 400px;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  h3 {
    height: 30px;
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
