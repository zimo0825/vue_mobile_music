<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <play></play>
  </div>
</template>

<script>
import play from './components/play/player.vue'
export default {
  data() {
    return {}
  },
  components: {
    play
  }
}
</script>
<style>
/* #app {
  padding: 10px;
} */
</style>
