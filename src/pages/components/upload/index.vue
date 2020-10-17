<template>
  <div class="upload-wrapper">
    <a-upload
      ref="upload"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
      :remove="handleRemove"
      :customRequest="customRequest"
      :multiple="true"
      :disabled="disabled"
    >
      <div v-if="isCanAdd">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          上传
        </div>
      </div>
    </a-upload>
    <!-- <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="handleCancelPreview"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal> -->
  </div>
</template>

<script>
// import { upload } from "@/api/common";
import _ from "lodash";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: {
    fileObjList: String,
    fileListLength: {
      type: Number,
      default: 8,
    },
    disabled: [Boolean],
  },
  watch: {
    fileObjList(val) {
      this.fileList = val ? JSON.parse(val) : [];
    },
  },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
    };
  },
  computed: {
    isCanAdd() {
      return this.fileList.length < this.fileListLength;
    },
  },
  methods: {
    clearUpload() {
      this.fileList = [];
    },
    // 自定义上传
    customRequest(data) {
      this.upload(data);
    },
    // 取消预览
    handleCancelPreview() {
      this.previewVisible = false;
    },
    // 预览
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      console.log(file.url,111)
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
      window.open(file.url)
    },

    handleChange() {
      // console.log(file, "file");
      // this.fileList = fileList;
      // console.log(fileList, 'fileList')
    },
    // 删除
    handleRemove(file) {
      console.log(file);
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    // 上传
    async upload(data) {
      const formData = new FormData();
      formData.append("file", data.file);

      // const { code, rs } = await upload(formData);
      // if (code === 200) {
      //   console.log(rs, "rs");
      //   let fileFormate = this.fileFormatter(rs.name, rs.url);
      //   this.fileList.push(fileFormate);
      //   // console.log(this.fileList, "this.fileList");
      //   this.$emit("uploadSuccess", this.fileList);
      // }
    },

    // 图片格式化
    fileFormatter(name, url) {
      let file = {
        uid: _.uniqueId(),
        name: name,
        url: url,
      };
      return file;
    },
  },
};
</script>
