<template>
  <div>
    <van-search
      @search="onSearch"
      shape="round"
      v-model="value"
      background="#fff"
      placeholder="请输入歌名"
    />
    <div class="wrapper" v-show="searchHistory.length">
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
import { mapActions, mapGetters } from 'vuex'
import BScroll from 'better-scroll'
// import { loadSearch } from '../components/js/cache.js'

export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onSearch() {
      if (this.value == '') {
        this.$toast('请输入歌名')
      } else {
        this.$router.push('/songDetail?k=' + this.value)
        this.saveSearchHistory(this.value)
        this.value = ''
      }
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
.wrapper {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  .top {
    display: flex;
    justify-content: space-between;
    span {
      margin-left: 70%;
    }
  }
  .bottom {
    height: 20px;
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
