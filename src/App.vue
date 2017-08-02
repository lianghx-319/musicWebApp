<template>
  <div class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <m-audio></m-audio>
  </div>
</template>

<script>
import mAudio from './components/audio.vue'
export default {
  name: 'app',
  components:{
    mAudio,
  },
}
</script>

<style lang="scss">

  .app{
    overflow: hidden;
  }
</style>
