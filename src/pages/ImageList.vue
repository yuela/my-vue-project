<template>
  <div class="imageList">
    <div class="imageGalleryInfo">
      <p>图片集{{ galleryInfo[0].imageGalleryName }}
        中共有<span>{{count}}</span>张图片</p>
      <p>创建时间：<span>{{galleryInfo[0].createTime}}</span></p>
      <p>创建者
        <router-link :to="`/user/${galleryInfo[0].userName}`">{{ galleryInfo[0].userName }}</router-link>
      </p>
    </div>
    <div class="imagesWrapper">
      <!--<Loading :center="true" v-show="!(count>0)"></Loading>-->
      <ImageItem v-for="image in images" :key="image.imageID" :image="image"></ImageItem>
    </div>
    <a href="#" class="loadMore" @click.prevent="fetchMore" v-show="count>12 && fetchCount <= 1">加载更多</a>
    <!--<Loading v-show="this.$store.state.isFetch"></Loading>-->
    <router-view></router-view>
    <Pagination v-show="count>12"></Pagination>
  </div>
</template>

<script>
  import ImageItem from '../components/Image'
  import Pagination from "../components/Pagination";
  import Loading from '../components/Loading'
  import { mapState } from 'vuex'
    export default {
        name: "ImageList",
      props:[],
      components: {
        ImageItem,
        Loading,
        Pagination
      },
      created () {
        this.showImage();
      },
      computed: {
        ...mapState({
          images: 'dataList',
          fetchCount: 'fetchCount',
          count:'all',
          galleryInfo:'dataInfo'
        })
      },
      methods: {
          showImage(){
            const id = this.$route.params.id;
            this.$store.dispatch('image', {count:this.fetchCount,imageGalleryID:id});
          },
        fetchMore () {
          this.$store.state.fetchCount += 1;
          this.showImage();
        }
      },
      mounted () {
        this.$store.state.isHome = false;
        window.addEventListener('scroll', () => {
          const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          // 页面滚动的高度 + 浏览器窗口的视口（viewport）高度 >= 整个页面可视区域高度 - 页面底部高度
          if (scrollTop + window.innerHeight >= document.body.clientHeight - 50 && this.$store.state.isFetch === false && this.fetchCount >= 2) {
            this.$store.state.isFetch = true;
            this.fetchMore()
          }
        })
      }
    }
</script>

<style scoped lang="scss">
  @import '../assets/css/public.scss';

  .imagelist {
    text-align: center;
    padding-top: 1rem;

  .imagesWrapper {

    width: 79rem;
    margin: 0 auto;
    display: flex;
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
