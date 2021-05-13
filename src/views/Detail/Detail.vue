<template>
  <div class="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <DetailSwiper ref="topimage" :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </Scroll>
    <DetailBottomBar></DetailBottomBar>
    <BackTop @click.native="backClick" v-show="isShow"></BackTop>
  </div>
</template>

<script>
import DetailNavBar from './ChildComps/DetailNavBar'
import DetailSwiper from './ChildComps/DetailSwiper'
import DetailBaseInfo from './ChildComps/DetailBaseInfo'
import DetailShopInfo from './ChildComps/DetailShopInfo'
import DetailGoodsInfo from './ChildComps/DetailGoodsInfo'
import DetailParamInfo from './ChildComps/DetailParamInfo'
import DetailCommentInfo from './ChildComps/DetailCommentInfo'
import DetailBottomBar from './ChildComps/DetailBottomBar'

import Scroll from '../../components/common/Scroll/Scroll'
import GoodsList from '../../components/content/Goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '../../network/detail'
import { itemListenerMixin, backTopMixin } from '../../common/mixin'
import { debounce } from '../../common/utils'

export default {
  name: 'detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)

    }, 100)
  },
  methods: {
    imageLoad() {
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isShow = (-position.y) > 1000
    }
  },
  destroyed() {
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style lang="scss" scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
}
</style>