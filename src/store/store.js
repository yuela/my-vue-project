import Vue from 'vue'
import Vuex from 'vuex'
import {login,register,checkName,userInfo} from "../api/userAPI";
import {getImageList,imageInfo,imageCount} from "../api/imageAPI";
import {getImageComment,getUserComment} from "../api/commentAPI";
import {getUserImageGallery,getImageGallerys,getImageGalleryCount,addImageGallery,editImageGallery,imageGalleryInfo} from "../api/ImageGalleryAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isHome: true,
    isLogin: false,
    user: { // 登录者信息
    },
    //用户主页信息
    userInfo:{},
    message:{
      success:false,
      msg:''
    },
    signInfo:'',
    showSignDialog: false,
    current: 1,
    all: 0,
    dataList: [],//用于存储获取到的图片集、图片、评论的数据
    dataInfo: [],
    // 记录获取评论的次数，用于滚动加载
    fetchCount: 1,
    // 判断是否在加载，防止滚动加载多次
    isFetch: false
  },
  getters:{
    user:state => state.user
  },
  actions:{
    //登录
    signIn ({ commit, dispatch }, formInfo) {
      return new Promise((resolve, reject) => {
        login(formInfo).then((res) => {
          let data = res.data;
          commit('setMessage', data);
          // 后台有返回这个字段,success为true
          if (data.success) {
            dispatch('getUserData',{userName:formInfo.userName});
          }
          resolve(data);
        }).catch(error => {
          reject(error);
        })

      })
    },
    // 获取登录用户信息
    getUserData ({commit},name) {
      userInfo(name).then(res => {
        let data = res.data;
        commit('setLoginUser', data.msg);
      })
    },
    //注册
    signUp ({ commit, dispatch }, formInfo) {
      return new Promise((resolve, reject) => {
        checkName(formInfo.userName).then((res) => {
          let data1 = res.data;
          // 后台有返回这个字段,success为true
          if (data1.success) {
            register(formInfo).then((res) => {
              let data = res.data;
              commit('setMessage', data);
              // 后台有返回这个字段,success为true
              if (data.code>0) {
                commit('setLoginStatus',false);
                commit('openSignDialog','in');
              }
              resolve(data);
            }).catch(error => {
              reject(error);
            });
          }else{
            commit('setMessage', data1);
          }
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },
    getImageGalleryByUID ({commit,dispatch},name) {
      console.log(name);
      return new Promise((resolve, reject) => {
        getUserImageGallery({userID:name}).then((res) => {
          let data = res.data;
          // 后台有返回这个字段,success为true
          if (data.success) {
            commit('setDataList',data.msg);
            dispatch('imageGalleryCount',name);
          }
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },
    // 获取所有ImageGallery
    getImageGalleryList ({commit,dispatch}, count) {
      return new Promise((resolve, reject) => {
        getImageGallerys(count).then((res) => {
          let data = res.data;
          // 后台有返回这个字段,success为true
          if(data.success){
            commit('setDataList', data.msg);
            dispatch('imageGalleryCount');
          }
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },
    //添加编辑图片集
    changeImageGallery({commit},info){
      if(info.type==='add'){
        return new Promise((resolve, reject) => {
          addImageGallery(info).then((res) => {
            let data = res.data;
            commit('setMessage', data);
            resolve(data);
          }).catch(error => {
            reject(error);
          })
        })
      }else {
        return new Promise((resolve, reject) => {
          editImageGallery(info).then((res) => {
            let data = res.data;
            commit('setMessage', data);
            resolve(data);
          }).catch(error => {
            reject(error);
          })
        });
      }
    },
    //获取图片集数量
    imageGalleryCount({commit},name){
      getImageGalleryCount({userID:name}).then(res => {
        let data = res.data;
        commit('setDataCount', data.msg);
      });
    },
    //获取图片集信息
    getImageGalleryInfo ({commit},id) {
      imageGalleryInfo({imageGalleryID:id}).then(res => {
        let data = res.data;
      commit('setDataInfo', data.msg);
    })
    },
    // 获取图片集中图片的数量
    imageCount ({commit},id) {
      imageCount({imageGalleryID:id}).then(res => {
        let data = res.data;
        commit('setDataCount', data.msg);
      })
    },
    //获取图片集对应的图片
    image({commit,dispatch},info){
      return new Promise((resolve, reject) => {
        getImageList(info).then((res) => {
          let data = res.data;
          if(data.success){
            commit('setDataList', data.msg);
            dispatch('getImageGalleryInfo',info.imageGalleryID);
            dispatch('imageCount',info.imageGalleryID);
          }
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },
    //获取图片信息
    showImageInfo({commit,dispatch},name){
      return new Promise((resolve, reject) => {
        imageInfo({imageID:name}).then(res => {
          let data = res.data;
          commit('setDataInfo', data.msg);
          dispatch('imageComment',name);
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },
    // 获取图片评论信息
    imageComment ({commit},id) {
      getImageComment({imageID:id}).then(res => {
        let data = res.data;
        commit('setDataList', data.msg);
      })
    },
  },
  mutations:{
    // 将用户信息添加至状态
    setLoginUser (state, data) {
      state.user = data;
      state.isLogin = true;
  },
    // 退出
    logout (state) {
      state.isLogin = false;
    },
    // 弹出登录注册框
    openSignDialog(state,type) {
      state.signInfo=type;
      state.showSignDialog = true;
   },
    // 关闭登录框
    closeSignDialog (state) {
      state.signInfo='';
      state.showSignDialog = false;
    },
    //设置提示信息
    setMessage (state, message) {
      state.message = message;
    },
    //改变用户登录状态
    setLoginStatus(state,isLogin){
      state.isLogin=isLogin
    },
    //获取用户信息
    showUserInfo(state,name){
      userInfo({userName:name}).then(res => {
        let data = res.data;
        state.userInfo=data.msg;
      })
    },
    //获取全部的图片集
    setDataList (state, data) {
      state.dataList = data;
    },
    //获取图片集数量
    setDataCount (state,num) {
      state.all = num[0].count;
    },
    //获取图片集数量
    setDataInfo (state,data) {
      state.dataInfo = data;
    },
  }
})
