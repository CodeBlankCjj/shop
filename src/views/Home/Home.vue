<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
  </div>
</template>

<script>
import NavBar from '../../components/common/NavBar/NavBar'
import HomeSwiper from './ChildComps/HomeSwiper'
import RecommendView from './ChildComps/RecommendView'

import { getHomeMultidata } from '../../network/home'

export default {
  components: { NavBar, HomeSwiper, RecommendView },
  created() {
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
}
</style>