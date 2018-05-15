<template>
  <div class="imageGalleryList">
    <div class="imagesWrapper">
      <!--<Loading :center="true" v-show="!imageGallerys.length"></Loading>-->
      <ImageGalleryItem v-for="image in imageGallerys" :key="image.imageGalleryID" :image="image"></ImageGalleryItem>
    </div>
    <a href="#" class="loadMore" @click.prevent="fetchMore" v-show="all>12 && fetchCount <= 1">加载更多</a>
    <Loading v-show="this.$store.state.isFetch"></Loading>
    <router-view></router-view>
    <Pagination v-show="all>12"></Pagination>
  </div>
</template>

<script>
  import ImageGalleryItem from '../components/ImageGalleryItem'
  import Loading from '../components/Loading'
  import { mapState } from 'vuex'
  import Pagination from "../components/Pagination";
    export default {
        name: "ImageGallery",
      components: {
        Pagination,
        ImageGalleryItem,
        Loading
      },
      created () {
        this.$store.dispatch('getImageGalleryList', {count:this.fetchCount})
      },
      computed: {
        ...mapState({
          imageGallerys: 'dataList',
          count:'all',
          fetchCount: 'fetchCount'
        })
      },
      methods: {
        fetchMore () {
          this.$store.state.fetchCount += 1;
          this.$store.dispatch('getImageGalleryList', {count:this.fetchCount});
        }
      },
      mounted () {
        this.$store.state.isHome = false;
        window.addEventListener('scroll', () => {
          const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          // 页面滚动的高度 + 浏览器窗口的视口（viewport）高度 >= 整个页面可视区域高度 - 页面底部高度
          if (scrollTop + window.innerHeight >= document.body.clientHeight - 50 && this.$store.state.isFetch === false && this.fetchCount >= 2) {
            this.$store.state.isFetch = true;
            this.fetchMore();
          }
        })
      }
    }
</script>

<style scoped lang="scss">
  @import '../assets/css/public.scss';

  .imageGalleryList {
    text-align: center;
    padding: 2rem;

  .imagesWrapper {
    display: flex;
    width: 79rem;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .loadMore {
    display: inline-block;
    padding: .5rem;
    margin: 1rem;
    color: white;
    background: #999;
    border-radius: 5px;
  }
  }
</style>
