<template>
  <div>
    <div class="personalPage">
      <div class="personalInfo">
        <img :src="'../../static/images/avatar/'+ userInfo[0].avatar" title="用户头像" alt="用户头像">
        <div >
          <p class="name"><span>用户名：</span><span>{{ userInfo[0].userName }}</span></p>
          <p><span>性别：</span><span>{{userInfo[0].gender}}</span></p>
          <p><span>年龄：</span><span>{{userInfo[0].age}}</span></p>
          <p><span>注册时间：</span><span>{{userInfo[0].registerTime}}</span></p>
        </div>
      </div>
      <div class="imageGalleryList" :userID="userInfo[0].userID">
        <p>图片集</p>
        <p>用户创建了{{count}}个图片集</p>
        <ImageGalleryItem v-for="image in imageGallerys" :key="image.imageGalleryID" :image="image"></ImageGalleryItem>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ImageGalleryItem from '../components/ImageGalleryItem'
  import Upload from '../components/UploadFile'
    export default {
        name: "User",
      data () {
        return {
          showFlag: false
        }
      },
      components: {
        ImageGalleryItem,
        Upload
      },
      created () {
        this.fetchUser()
      },
      watch: {
        // '$route': 'fetchUser'
      },
      computed: {
        ...mapState({
          userInfo:'userInfo',
          count:'all',
          imageGallerys:'dataList'
        })
      },
      methods: {
        fetchUser () {
          const id = this.$route.params.id;
          this.$store.commit('showUserInfo', id);
          console.log(this.$store.state.userInfo.userID);
          this.$store.dispatch('getImageGalleryByUID', this.$store.state.userInfo.userID);
        },
        switchShowFlag () {
          this.showFlag = !this.showFlag
        },
        closeUpload () {
          this.showFlag = false
        }
      },
      mounted () {
        this.$store.state.isHome = false
      }
    }
</script>

<style scoped lang="scss">
  @import '../assets/css/public.scss';

  .personalPage {
  padding-bottom: 1rem;
  }

  .personalInfo {
    width: 100%;
    height: 25rem;
    position: relative;
  }

</style>
