import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

Vue.use(Router);

const router=new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../pages/Home'], resolve)
    },
    {
      path: '/user/:id',
      name: 'user',
      component: resolve => require(['../pages/User'], resolve),
    },
    {
      path: '/imageGallery',
      name:'imageGallery',
      component: resolve => require(['../pages/ImageGallery'], resolve),
    },
    {
      path: '/imageGallery/:id',
      component: resolve => require(['../pages/ImageList'], resolve),
      children: [{
        path: '/image/:id',
        component: resolve => require(['../pages/ImageDetail'], resolve)
      }]
    },
    {
      path: '/post/image',
      name:'upload',
      component: resolve => require(['../pages/UploadFile'], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['../pages/About'], resolve)
    }
    ]
});

// router.beforeEach((to, from, next) => {
//   if((to==='/post/image'||to==='/post/imageGallery')&&store.state.isLogin){
//     next();
//   }else{
//     this.$router.push({
//       path: home
//     });
//   }
// });

export default router;
