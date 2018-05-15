<template>
  <main class="home">
    <div class="wrapper">
      <p class="subTitle">时装周 </p>
      <div class="imageGalleryList">
            <!--<Loading :center="true" v-show="!imageGallerys.length"></Loading>-->
            <ImageGalleryItem v-for="image in imageGallerys" :key="image.imageGalleryID" :image="image"></ImageGalleryItem>
          </div>
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import ImageGalleryItem from '../components/ImageGalleryItem'
  export default {
    name: 'Home',
    components: {
      ImageGalleryItem
    },
    data() {
      return {
        showMore: false,
        imageList:this.$store.state.images
      }
    },
    computed: {
      ...mapState({
        imageGallerys: 'dataList',
        count:'all',
        fetchCount: 'fetchCount'
      })
    },
    created(){
      this.$store.dispatch('getImageGalleryList', {count:this.fetchCount})
    },
    methods: {
      more() {
        this.showMore = !this.showMore;
        const {logoList, figure} = this.$refs;
        const singleHeight = figure[0].offsetHeight;
        logoList.style.height = this.showMore ? `${singleHeight * 2}px` : `${singleHeight}px`
      },
    },
    mounted() {
      let {isHome} = this.$store.state;
      if (isHome === false) {
        this.$store.state.isHome = true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/public.scss";

  .home {
    font-size: 1rem;
    .wrapper{
      padding: 2rem;
      .imageGalleryList{
        display:flex;
      }
    }
  }
</style>
