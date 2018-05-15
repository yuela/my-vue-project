<template>
  <div class="imageItem">
    <div class="imgBox">
      <router-link :to="`/image/${image.imageID}`">
        <img class="image" :src="'../'+image.imageUrl" :title="image.title" :alt="image.title">
      </router-link>
      <span class="count"></span>
      <div class="title">
        <p><span></span></p>
        <router-link :to="`/image/${image.imageID}`">{{ image.title }}</router-link>
        <p>{{image.description}}</p>
        <p>{{image.createTime}}</p>
      </div>
      <div>
        <router-link :to="`/users/${image.userName}`">{{ image.userName }}</router-link>
        <span>{{image.createTime}}</span>
      </div>
    </div>
  </div>

</template>

<script>
  import ImageDetail from '../pages/ImageDetail'
    export default {
        name: "Image",
      props: ['image'],
      data () {
        return {
          isSelected: false,
          imageShow:false
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
