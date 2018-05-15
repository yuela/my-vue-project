<template>
  <div class="editImageGallery">
    <div class="imageGalleryBody">
      <div class="title">
        <span class="message">{{ addOrUpdate==='add'?"新建图片集":"编辑图片集" }}</span>
        <span class="close">&times;</span>
      </div>
      <div class="content">
        <form class="editForm" ref="imageGalleryForm">
          <div class="form-control">
            <label for="imageGalleryName">图片集名称</label>
            <input id="imageGalleryName" type="text" placeholder="图片集名称" v-model="imageGalleryInfo.name"/>
          </div>
          <button ref="imageGalleryButton" type="submit" @click.prevent="sure" :flag="addOrUpdate">
            <!--<span v-show="!isLoading">登录</span>-->
            <!--<span v-show="isLoading">登录中...</span>-->
            确定
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "Edit",
    components: {

    },
    data() {
      return {
        imageGalleryInfo: {},
        addOrUpdate:this.$route.query
      }
    },
    computed: {
      ...mapState({
        isLogin:'isLogin',
        user:'user',
        isHome:'isHome',
        message:'message'
      })
    },
    methods: {
      //添加或者修改图片集
      sure(e){
        let { imageGalleryForm, imageGalleryButton } = this.$refs;
        imageGalleryButton.disabled = 'disabled';
        const imageGalleryInfo = {
          imageGalleryName: this.imageGalleryInfo.name.trim(),
          userID:this.$store.state.user.userID,
          type:'add'
        };
        this.$store.dispatch('changeImageGallery', imageGalleryInfo).then((data) => {
          // 为true时
          if (data) {
            imageGalleryForm.reset();
            this.imageGalleryInfo = {};
            this.$store.state.message = {};
            // this.$store.commit('closeSignDialog');
            imageGalleryButton.disabled = '';
          } else { // 为false的时候，既验证失败，将按钮重新至为可用
            imageGalleryButton.disabled = '';
          }
        }).catch(err => {
          imageGalleryButton.disabled = '';
          this.$store.state.message = {
            success: false,
            msg: err
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
