<template>
  <div>
    <van-search
      @input="onSearch"
      shape="round"
      v-model="value"
      background="#fff"
      placeholder="请输入歌名"
    />

    <Scroll class="scroll" v-show="this.value.length > 0">
      <div class="res">
        <div
          @click="toMusicDetail(item)"
          class="res-item"
          v-for="item in searchRes"
          :key="item.id"
        >
          <span class="iconfont icon-sousuo"></span>
          <h3>{{ item.name }}</h3>
        </div>
      </div>
    </Scroll>
    <div class="wrapper" v-show="searchHistory.length > 0">
      <div class="top">
        <h3>历史记录</h3>
        <span @click="clearHistory" class="iconfont icon-shanchu"></span>
      </div>
      <div class="bottom" ref="bscroll">
        <div class="content" ref="contents">
          <div
            class="history"
            v-for="(item, index) in searchHistory"
            :key="index"
            @click="HistorySearch(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

import { mapActions, mapGetters } from 'vuex'
import BScroll from 'better-scroll'
import Scroll from '@/components/scroll/index.vue'

export default {
  data() {
    return {
      value: '',
      res: true,
      searchRes: []
    }
  },
  components: {
    Scroll
  },

  methods: {
    toMusicDetail(item) {
      this.$router.push('/songDetail?k=' + item.name)
      this.saveSearchHistory(this.value)
      this.value = ''
    },
    onSearch() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        api.search.getMusic(this.value, 20).then(res => {
          this.searchRes = res.data.result.songs
        })
      }, 300)
    },
    // 根据历史记录搜索词进入到歌曲详情页
    HistorySearch(item) {
      this.$router.push('/songDetail?k=' + item)
    },
    clearHistory() {
      this.clearSearchHistory()
    },
    // 动态获取需要滑动部分父级的宽度
    personScroll() {
      let width = this.searchHistory.length * 100
      this.$refs.contents.style.width = width + 'px'
    },
    ...mapActions(['saveSearchHistory', 'clearSearchHistory'])
  },
  computed: {
    ...mapGetters(['searchHistory'])
  },
  created() {
    this.$nextTick(() => {
      this.personScroll()
    })
  },
  mounted() {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.bscroll, {
        scrollX: true,
        scrollY: false,
        click: true,
        dblclick: true,
        stopPropagation: true,
        bounce: false
      })
    }, 20)
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.k != oldVal.query.k) {
        this.personScroll()
      }
      return
    }
  }
}
</script>

<style lang="less" scoped>
.scroll {
  height: calc(100vh - 110px);

  .res {
    width: 100%;
    z-index: 99999;
    background: #fff;
    .res-item {
      height: 50px;
      margin: 5px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        color: #8d8383;
      }
      h3 {
        margin-left: 10px;
      }
    }
  }
}

.wrapper {
  width: 100%;
  // margin-bottom: 10px;
  padding: 10px;
  .top {
    display: flex;
    justify-content: space-between;
    span {
      margin-left: 70%;
    }
  }
  .bottom {
    height: 40px;
    margin-top: 10px;
    width: 100%;
    overflow: hidden;
    .content {
      white-space: nowrap;
      .history {
        border-radius: 5px;
        color: #333;
        display: inline-block;
        font-size: 14px;
        height: 25px;
        line-height: 25px;
        padding: 0 5px;
        background: #eee;
        margin: 0 5px;
      }
    }
  }
}
</style>
