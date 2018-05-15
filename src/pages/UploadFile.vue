<template>
    <div class="upload-box">
      <form name="uploadForm" enctype="multipart/form-data" method="post" class="uploadForm">
        <!--action="http://localhost:3000/api/upload"-->
        <div class="imageShow">
          <div class="form-control">
            <label for="imageGallery">选择用户已创建的图片集</label>
            <select title="选择用户已创建的图片集" id="imageGallery" v-model="formInfo.imageGalleryID">
              <option v-for="imageGallery in imageGallerys" :value="imageGallery.imageGalleryID">
                {{imageGallery.imageGalleryName}}
              </option>
            </select>
          </div>
          <div class="preview">
            <img :src="url" class="previewImg" v-if="url" v-mode="formInfo.img">
            <span v-else-if="text">{{ text }}</span>
          </div>
          <a href="#">
            点击选择上传的图片
          </a>
          <input type="file" @change="handleChange" ref="filesList" name="imageFile">
        </div>
        <div class="imageInfo">
          <div class="form-control">
            <label for="imageName">图片标题</label>
            <input id="imageName" name="title" maxlength="20" placeholder="图片标题20字以内" v-model="formInfo.title">
          </div>
          <div class="form-control">
            <label for="imageDescription">图片描述</label>
            <textarea id="imageDescription" name="description" maxlength="200" placeholder="图片描述200字以内" v-model="formInfo.description" cols="5" resize="none"></textarea>
          </div>
          <div class="form-control">
            <label for="imageName">图片尺寸(宽*高)</label>
            <input id="imageWidth" name="size" v-model="formInfo.imageWidth" readonly>*
            <input id="imageHeight" name="size" v-model="formInfo.imageHeight" readonly>
          </div>
          <div class="form-control">
            <label for="imageName">图片大小(KB)</label>
            <input id="imageSpace" name="space" v-model="formInfo.imageSpace" readonly>
          </div>
        </div>
        <button type="submit" class="upload" @click.prevent="upload" ref="uploadButton">
          确认上传
        </button>
      </form>
    </div>
</template>

<script>
  import {addImage,uploadImage} from "../api/imageAPI";
  import { mapState } from 'vuex'
    export default {
      name: "UploadFile",
      data() {
        return {
          url: '',
          text: '',
          showFlag: true,
          file: '',
          formInfo:{}
        }
      },
      computed: {
        ...mapState({
          isLogin:'isLogin',
          user:'user',
          isHome:'isHome',
          imageGallerys:'dataList',
          message:'message'
        })
      },
      created(){
        this.$store.dispatch('getImageGalleryByUID',this.$store.state.user.userID);
      },
      methods: {
        handleChange(e) {
          // this.switchShowFlag();
          const {filesList} = this.$refs;
          this.file = filesList.files[0];
          const url = window.URL.createObjectURL(this.file);
        //   let imgReg="/w(.gif|.jpeg|.png|.jpg|.bmp|image/jpeg|image/jpg|image/gif|image/png|image/bmp)/i";
        //   alert(this.file.type);
        //   if (this.file.type.matchs(imgReg)) {
        //   this.url = url;
        //
        //  } else {
        //  this.text = '您选择的不是图片';
        // }
          this.url = url;
          this.formInfo.imageSpace=this.file.size/1024;
          // this.formInfo.imageWidth=document.querySelector('.previewImg').width;
          // this.formInfo.imageHeight=document.querySelector('.previewImg').height;

    },
        upload() {
          const formData=new FormData();
          formData.append('imageFile', this.file);
          const formInfo = {
            imageGalleryID: this.formInfo.imageGalleryID,
            title:this.formInfo.title,
            description:this.formInfo.description,
            imageWidth:this.formInfo.imageWidth,
            imageHeight:this.formInfo.imageHeight,
            imageSpace:this.formInfo.imageSpace
          };
          //上传图片
          uploadImage(formData).then((res) => {
                let data = res.data;
                if(data.success){
                  formInfo.imageUrl=data.msg.path.replaceAll("\\","/").replaceAll("/upload/","/image/");
                  addImage(formInfo).then(res => {
                    let data1 = res.data;
                    if(data1.success){
                      if (confirm("添加成功，是否继续")) {
                        this.$route.push('/post/image');
                      } else {
                        this.$route.push('/user/test');
                      }
                    }
                  });
                }
                resolve(data);
              }).catch(error => {
                reject(error);
              });
          },
        // switchShowFlag() {
        //   this.showFlag = !this.showFlag;
        // },
      }
    }
</script>

<style scoped lang="scss">
  .upload-box {
    padding: 2rem;
  .preview {
    height: auto;
    max-width: 14rem;
    border: 1px dotted #eee;
    text-align: center;
    line-height: 14rem;

  .previewImg {
    width: 100%;
    height: 100%;
  }
  }
  .uploadForm{
    text-align: left;
    .imageInfo{
      display: inline-block;
      width: calc(100% - 22rem);
      vertical-align: top;
      margin-left: 3em;
    }
    .imageShow{
      display: inline-block;
      width: 14rem;
    }
    .form-control{
      margin: 10px 0;
    }
  }
    .upload {
      display: inline-block;
      margin-top: 20px;
      text-align: center;
      width: 12rem;
      // border: 1px solid ;
      color: white;
      padding: .5rem 0;
      background: red;
      border-radius: 8px;
      transition: all .3s;
      text-decoration: none;
      &:hover {
        background: black;
      }

      input[type="file"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        opacity: 0;
        filter: alpha(opacity=0);
      }
    }

  }
</style>
