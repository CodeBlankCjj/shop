<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
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
