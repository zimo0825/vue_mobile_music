<template>
  <div>
    <van-search
      @search="onSearch"
      shape="round"
      v-model="value"
      background="#fff"
      placeholder="请输入歌名"
    />
  </div>
</template>

<script>
// import api from '@/api/index.js'
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
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
