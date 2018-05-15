<template>
  <div class="toolBar">
    <img class="personalAvatar" :src="'../../static/images/avatar/'+ user[0].avatar" @click.prevent="showMenu" />
    <span>{{user[0].userName}}</span>
    <nav class="menu" v-show="showMenued">
      <ul>
        <li>
          <a href="#" @click.prevent="addGallery">添加图片集</a>
          <router-link :to="'/post/image'">上传图片</router-link>
          <router-link :to="{ name: 'user', params: { id: user[0].userName }}">个人主页</router-link>
          <a href="#" @click.prevent="signout">退出登录</a>
        </li>
      </ul>
    </nav>
    <Edit v-show="gallery"></Edit>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "Vuex";
  import Edit from './Edit'
  export default {
    name: 'ToolBar',
    data() {
      return {
        showMenued: false,
        gallery:false
      }
    },
    components:{
      Edit
    },
    computed: {
      ...mapState({
        isLogin:'isLogin',
        user:'user',
        isHome:'isHome',
        message:'message',
        showSignDialog:'showSignDialog'
      })
    },
    methods: {
      addGallery(){
        if(this.gallery) {
          this.gallery = false;
        } else{
          this.gallery = true;
        }
      },
      // 显示个人菜单
      showMenu() {
        if(this.showMenued) {
          this.showMenued = false;
        } else{
          this.showMenued = true;
        }
      },
      signout() {
        this.$store.commit('logout');
        // 如果该页面存在权限的话，在此页面登录将跳转到主页
        if (this.$route.meta.requireAuth) {
          this.$router.push('/')
        }
      }
    },
    mounted() {
      document.addEventListener('click', this.showMenu)
    }
  }
</script>

<style scoped lang="scss">
  .toolBar {
    border-radius: 50%;
    cursor: pointer;
    position:absolute;
    top: 15px;
    right: 120px;
    >img {
      max-width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    >span{
      color:#eee;
    }
    >img,>span{
      display: inline-block;
      vertical-align: middle;
    }
    .menu {
      position: absolute;
      width: 7rem;
      text-align: center;
      top: 20px;
      background: rgba(255, 255, 255, 0.35);
      border-radius: 5px;
      right: -100px;
      z-index: 9;

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      a {
        color: white;
        display: block;
        padding: .5rem;
        letter-spacing: 1px;
        transition: all .3s;
        cursor:pointer;

        &:hover {
          background: red;
        }
      }

    }
  }
</style>
