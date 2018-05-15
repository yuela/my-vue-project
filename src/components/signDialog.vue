<template>
  <div class="signDialog">
    <div class="signContent">
      <div class="signBody">
        <div class="title">
          <span class="message">{{ signInfo==='in'?"登录":"注册" }}</span>
          <span class="close" @click="closeSignDialog">&times;</span>
        </div>
        <div class="sign">
          <form class="loginForm" ref="loginForm" v-show="signInfo==='in'">
            <div class="form-control">
              <label for="userName">用户名</label>
              <input id="userName" type="text" placeholder="用户名" v-model="loginInfo.username"/>
            </div>
            <div class="form-control">
              <label for="pwd">密码</label>
              <input id="pwd" type="password" placeholder="密码" v-model="loginInfo.password"/>
            </div>
            <button ref="loginButton" type="submit" class="sign" @click.prevent="login">
              <!--<span v-show="!isLoading">登录</span>-->
              <!--<span v-show="isLoading">登录中...</span>-->
              确定
            </button>
          </form>
          <form class="registerForm" ref="registerForm" v-show="signInfo==='up'">
            <div class="form-control">
              <label for="userNameR">用户名</label>
              <input id="userNameR" type="text" placeholder="用户名" v-model="registerInfo.username"/>
            </div>
            <div class="form-control">
              <label for="pwdR">密码</label>
              <input id="pwdR" type="password" placeholder="密码" v-model="registerInfo.password"/>
            </div>
            <div class="form-control">
              <label for="pwdReR">确认密码</label>
              <input id="pwdReR" type="password" placeholder="确认密码" v-model="registerInfo.passwordRe"/>
            </div>
            <div class="form-control">
              <label for="age">年龄</label>
              <input id="age" type="number" maxlength="2" placeholder="年龄" v-model="registerInfo.age"/>
            </div>
            <div class="form-control">
              <label for="userNameR">性别</label>
              <input type="radio" value="男" title="男" v-model="registerInfo.gender">男
              <input type="radio" value="女" title="女" v-model="registerInfo.gender">女
            </div>

            <button ref="registerButton" type="submit" class="sign" @click.prevent="register">
              <!--<span v-show="!isLoading">注册</span>-->
              <!--<span v-show="isLoading">注册中...</span>-->
              提交
            </button>
          </form>
          <a v-show="signInfo==='in'" class="login" href="#" @click.prevent="switchSignup">没有帐号？点击注册</a>
          <a v-show="signInfo==='up'" class="register" href="#" @click.prevent="switchSignup">已有帐号返回登录</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import alert from './Alert'
  import { mapState } from 'vuex'
    export default {
        name: "signDialog",
      components: {
        alert
      },
      data() {
        return {
          loginInfo: {},
          registerInfo:{}
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
      methods: {
        // 关闭登录注册框
        closeSignDialog () {
          this.$store.commit('closeSignDialog')
        },
        //注册
        register(){
          let { registerForm, registerButton } = this.$refs;
          registerButton.disabled = 'disabled';
          const registerInfo = {
            userName: this.registerInfo.username.trim(),
            password: this.registerInfo.password,
            age:this.registerInfo.age,
            gender:this.registerInfo.gender
          };
          this.$store.dispatch('signUp', registerInfo).then((data) => {
            // 为true时
            if (data) {
              registerForm.reset();
              this.registerInfo = {};
              this.$store.state.message = {};
              this.$store.commit('closeSignDialog');
              registerButton.disabled = '';
            } else { // 为false的时候，既验证失败，将按钮重新至为可用
              registerButton.disabled = '';
            }
          }).catch(err => {
            registerButton.disabled = '';
            this.$store.state.message = {
              success: false,
              msg: err
            }
          })
        },
        //登录
        login(){
          let { loginForm, loginButton } = this.$refs;
          loginButton.disabled = true;
          const loginInfo = {
            userName: this.loginInfo.username.trim(),
            password: this.loginInfo.password,
          };
          this.$store.dispatch('signIn', loginInfo).then((data) => {
            // 为true时
            if (data.success) {
              loginForm.reset();
              this.loginInfo = {};
              this.$store.commit('setMessage',{success:'',msg:''});
              this.$store.commit('closeSignDialog');
              loginButton.disabled = false;
            } else { // 为false的时候，既验证失败，将按钮重新至为可用
              loginButton.disabled = false;
            }
          }).catch(err => {
            loginButton.disabled = false;
            this.$store.state.message = {
              success: false,
              message: err
            }
          })
        },
        //切换登录注册
        switchSignup(e){
          if(e.target.className.includes('login')){
            this.$store.commit('openSignDialog','up');
          }else{
            this.$store.commit('openSignDialog','in');
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .signDialog{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.35);

   >.signContent{
    background: rgba(0,0,0,.35);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99;
  }
  }
  .signBody{
    background: #fff;
    width: 400px;
    margin: 20px auto;
    border-radius: 20px;
    padding: 35px 25px 35px 5px;
  }
  .title{
    position:relative;
    .close{
      font-size:30px;
      cursor: pointer;
      position:absolute;
      right:0;
      top:-25px;
    }
  }
  .sign{

     .form-control{
      margin:10px 0;
       label{
         width:80px;
         text-align:right;
         display: inline-block;
       }
       input{
         padding:5px;
         border: 1px solid #999;
         &:focus{
           box-shadow: 0 0 15px rgba(0,255,255,.15);
         }
       }
    }
  }
</style>
