<template>
  <div class="front">
    <header class="header" :class="{ headerBg: !isHome || scrolled}">
      <div class="logoWrapper">
        <span class="logo"><router-link :to="'/'"><img src="../assets/images/logo.png" alt="logo" title="logo"></router-link></span>
        <span class="webName">图片收藏</span>
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li><router-link :to="'/home'">首页</router-link></li>
          <li><router-link :to="'/imageGallery'">图集</router-link></li>
          <li><router-link :to="'/about'">关于</router-link></li>
        </ul>
      </nav>
      <div class="sign" v-show="!isLogin">
        <span><a href="#" @click.prevent="signDialog" signStatus="in">登录</a></span>
        <span>|</span>
        <span><a href="#" @click.prevent="signDialog" signStatus="up">注册</a></span>
      </div>
    </header>
    <signDialog v-show="showSignDialog"></signDialog>
    <Toolbar v-show="isLogin"></Toolbar>
  </div>
</template>

<script>
  import SignDialog from './SignDialog';
  import Toolbar from './Toolbar';
  import { mapState } from 'vuex'
    export default {
      name: "Header",
      components: {SignDialog,Toolbar},
      data() {
        return {
          isShow: false,
          scrolled: false
        }
      },
      computed: {
        ...mapState({
          isLogin:'isLogin',
          user:'user',
          isHome:'isHome',
          message:'message',
          showSignDialog:'showSignDialog',
          signInfo:'signInfo'
        })
      },
      created() {
        // 如果已登录，直接获取用户信息
        if (this.$store.state.isLogin) {
          this.$store.dispatch('getUserData')
        }
      },
      methods: {
        updateScrollTop() {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          scrollTop > 0 ? this.scrolled = true : this.scrolled = false
        },
        // 显示登录注册框
        signDialog(e) {
          this.$store.commit('openSignDialog',e.target.getAttribute("signStatus"));
        },
      },
      mounted() {
        window.addEventListener('scroll', this.updateScrollTop)
      }
    }
</script>

<style scoped lang="scss">
  @import '../assets/css/public';
  $navColor:#333;
  .header{
    position:relative;
    .logoWrapper{
      background: #000;
      height:60px;
      text-align: left;
      padding: 6px 0 0 10%;
      color:#fff;
      span{
        display:inline-block;
        vertical-align:middle ;
      }
      .webName{
        font-size:1.5rem;
      }
    }
    .nav{
      background: #eee;
      height:40px;
      >.nav-list{
        list-style-type: none;
        display: flex;
        padding: 8px 10% 0;
        justify-content: space-around;
        >li>a{
          color:$navColor;
          text-decoration: none;
          font-size:1.2rem;
          &:link{
            color:$navColor;
          }
          &:focus,&:hover{

          }
          &:visited,&:active{
            color:$navColor;
          }
        }
      }
    }
    .sign{
      right:15px;
      color:#eee;
      position:absolute;
      top: 25px;
      a{
        color:#fff;
        text-decoration: none;
        &:link,&:hover,&:visited,&:active{
          color:#fff;
        }
      }
    }
    .toolBar{

    }
  }


</style>
