<template>
  <div>
    <div id="dropbox" name="image" style="min-width:300px;min-height:100px;border:1px dashed silver;">
      <span v-for="file in files" style="display:inline">
        <icon-upload :file="file"></icon-upload>
      </span>
    </div>
  </div>
</template>

<script>
  import IconUpload from './IconUpload'

  export default {
    data: function () {
      return {
        files: []
      }
    },
    methods: {},
    components: {IconUpload},
    name: "icon",
    comments: {
      IconUpload
    },
    mounted: function () {
      let dropbox = document.getElementById("dropbox")

      dropbox.ondragenter = function () {
        this.innerHTML = "可以释放了";

      }
      dropbox.ondragover = function (ev) {
        ev.preventDefault();
      }
      dropbox.ondragleave = function () {
        this.innerHTML = "将文件拖拽到此区域";
      }
      dropbox.ondrop = function (ev) {
        ev.preventDefault();
        this.files = ev.dataTransfer.files;
        // var fileListElement = document.getElementById("fileList")
        // let innerHtml = '';
        // for (var i=0; i<this.files.length; i++) {
        //   if (this.files[i].type.indexOf('image') == -1){
        //     alert("请选择图片上传")
        //     return;
        //   }
        //   innerHtml = innerHtml + '<IconUpload :file="files['+ i +']"/>'
        // }
        // debugger
        // dropbox.innerHTML = innerHtml
      }.bind(this)
    }
  }
</script>

<style scoped>
</style>
