<template>
  <div class="imgBox">
    <router-link :to="`/images/${image.imageGalleryID}`">
      <img class="image" :src="'../static/images/image/'+image.cover" :title="image.imageGalleryName" :alt="image.imageGalleryName">
    </router-link>
    <span class="count">{{image.count}}</span>
    <div class="title">
      <router-link :to="`/imageGallery/${image.imageGalleryID}`">{{ image.imageGalleryName }}</router-link>
    </div>
    <div>
      <router-link :to="`/user/${image.userName}`">{{ image.userName }}</router-link>
      <span>{{image.createTime}}</span>
    </div>
  </div>
</template>

<script>

    export default {
        name: "ImageGalleryItem",
      props: ['image'],
      data () {
        return {
          isSelected: false
        }
      },
    }
</script>

<style scoped lang="scss">
  @import '../assets/css/public.scss';

  .imgBox {
    width: 16.5rem;
    margin: 1.2rem 0 0 .6rem;
    border: 1px solid #eee;
    text-align: center;
    background: #eee;
    position: relative;
    overflow: hidden;

  /*.image-wrapper {*/
         /*!*&:hover + .title{*!*/
           /*!*transform: translateY(0);*!*/
         /*!*}*!*/
  /*}*/
  .image {
    height: 16.5rem;
    max-width: 100%;
    cursor: pointer;
  }


  /*.title {*/
    /*position: absolute;*/
  /*// 实现两行文字省略号*/
  /*width: 100%;*/
  /*// height: 2.3rem;*/
    /*text-overflow: ellipsis;*/
    /*overflow: hidden;*/
    /*display: flex;*/
    /*-webkit-line-clamp: 2;*/
    /*-webkit-box-orient: vertical;*/
    /*bottom: 1px;*/
    /*left: 0;*/
    /*background: rgba(0, 0, 0, .5);*/
    /*color: white;*/
    /*transform: translateY(110%);*/
    /*transition: all .3s;*/
    /*padding: .1rem 0;*/
    /*max-height: 4rem;*/

  /*&:hover {*/
     /*transform: translateY(0);*/
   /*}*/
  /*}*/


  /*.collect {*/
    /*position: absolute;*/
    /*right: 6%;*/
    /*top: 6%;*/
    /*cursor: pointer;*/
  /*}*/
  }
</style>
