<template>
  <div class="wrapper">
    <span style="fontWeight: 600;"> 官方榜</span>
    <SoaringList></SoaringList>
    <newList></newList>
    <HotList></HotList>
    <CnList></CnList>
  </div>
</template>

<script>
import SoaringList from './soaringList'
import newList from './newList'
import HotList from './hotList'
import CnList from './cnList'

export default {
  components: {
    SoaringList,
    newList,
    HotList,
    CnList
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  height: auto;
  span {
    margin: 10px;
  }
}
</style>
