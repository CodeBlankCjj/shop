<template>
  <div id="app">
    <router-view></router-view>
    <MainTabbar></MainTabbar>
  </div>
</template>

<script>
import MainTabbar from '@/components/content/MainTabbar/MainTabbar'

export default {
  components: {
    MainTabbar
  }
}
</script>

<style lang="scss">
@import 'assets/css/base.css'
</style>
