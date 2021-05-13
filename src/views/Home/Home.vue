<template>
  <div class="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></TabControl>
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShow"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from './ChildComps/HomeSwiper'
import RecommendView from './ChildComps/RecommendView'
import FeatureView from './ChildComps/FeatureView'

import NavBar from '../../components/common/NavBar/NavBar'
import TabControl from '../../components/content/TabControl/TabControl'
import GoodsList from '../../components/content/Goods/GoodsList'
import Scroll from '../../components/common/Scroll/Scroll'

import { getHomeMultidata, getHomeGoods } from '../../network/home'
import { debounce } from '../../common/utils'
import { itemListenerMixin, backTopMixin } from '../../common/mixin'

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    }
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page +1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
        this.$refs.scroll.refresh()

      })
    },
    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index]
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      this.isShow = (-position.y) > 1000
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style lang="scss" scoped>
.home {
  // padding-top: 44px;
  height: 100vh;
  position: relative;
  .home-nav{
    background-color: var(--color-tint);
    // position: fixed;
    // left: 0;
    // top: 0;
    // right: 0;
    // z-index: 1;
    color: #Fff;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  // .content {
  //   height: calc(100vh - 93px);
  //   overflow: hidden;
  //   margin-top: 44px;
  // }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    // .fixed {
    //   position: fixed;
    //   left: 0;
    //   right: 0;
    //   top: 44px;
    // }
  }
}
</style>