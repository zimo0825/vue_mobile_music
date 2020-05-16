<template>
  <div>
    <!-- 新歌速递 -->
    <div class="new">
      <h3 @click="newSongs">新歌</h3>
      <h3 @click="newDiscs">| 新碟</h3>
    </div>

    <div class="bottom" ref="bscroll" v-if="checkType">
      <div class="bottom-item" ref="wrappers">
        <div
          @click="selectItem(item, index)"
          class="container"
          v-for="(item, index) in newSong"
          :key="item.id"
        >
          <div class="left">
            <img :src="item.album.blurPicUrl" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom" ref="bscroll" v-if="!checkType">
      <div class="bottom-item" ref="wrappers">
        <div
          @click="selectItems(item, index)"
          class="container"
          v-for="(item, index) in newDisc"
          :key="item.id"
        >
          <div class="left">
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
      newSong: [],
      newDisc: [],
      checkType: true
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
      let width = 6 * 110
      this.$refs.wrappers.style.width = width + 'px'
    },
    // 新歌
    getNewSongList() {
      api.find.getNewSong().then(res => {
        this.newSong = res.data.data.slice(0, 6)
        if (res.data.code === 200) {
          setTimeout(() => {
            this.personScroll()
          }, 50)
        }
      })
    },
    // 新碟
    getAlbums() {
      api.find.getNewSong(7).then(res => {
        this.newDisc = res.data.data.slice(0, 6)
        if (res.data.code === 200) {
          setTimeout(() => {
            this.personScroll()
          }, 50)
        }
      })
    },
    newDiscs() {
      this.checkType = false
    },
    newSongs() {
      this.checkType = true
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.newSong,
        index
      })
    },
    selectItems(item, index) {
      this.selectPlay({
        list: this.newDisc,
        index
      })
    },
    ...mapActions(['selectPlay'])
  },
  created() {
    this.getNewSongList()
  }
}
</script>

<style lang="less" scoped>
.new {
  display: flex;
  margin-bottom: 10px;
  h3 {
    font-weight: 600;
    &:nth-child(1) {
      margin-right: 5px;
    }
  }
}
.bottom {
  height: 140px;
  overflow: hidden;
  touch-action: none;
  .bottom-item {
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    .container {
      flex: 1;
      // height: 110px;
      display: flex;
      .left {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 110px;
          border-radius: 10px;
        }
        p {
          position: absolute;
          margin-top: 38px;
          color: #fff;
          width: 80px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
