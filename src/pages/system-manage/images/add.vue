<template>
  <a-drawer :title="title" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="主题名" prop="title">
          <a-input v-model="form.title" placeholder="请输入" allowClear :maxLength="200" />
        </a-form-model-item>
        <a-form-model-item label="上传" prop="fileList">
          <Upload ref="upload" @uploadSuccess="uploadSuccess" :fileObjList="form.fileList" />
        </a-form-model-item>
        <a-form-model-item label="正文" prop="content">
          <a-input v-model="form.content" placeholder="请输入" type="textarea" :rows="6" style="width: 100%" :maxLength="2000" allowClear />
        </a-form-model-item>
      </a-form-model>
    </div>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        取消
      </a-button>
      <a-button type="primary" @click="handleSubmit" :loading="loading">
        保存
      </a-button>
    </div>
  </a-drawer>
</template>
<script>
import Upload from '@/pages/components/upload'
import { saveImg, getImgDetail } from '@/api/index'

export default {
  components: { Upload },
  data() {
    return {
      dialogStatus: 'add',
      obj: {},
      visible: false,
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      list: [],
      form: {
        id: '',
        title: '',
        noticeType: 3,
        fileList: '',
        content: '',
      },
      rules: {
        title: [{ required: true, message: '请输入', trigger: 'blur' }],
        fileList: [{ required: true, message: '请上传', trigger: 'blur' }],
        content: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      disabled: false,
    }
  },
  computed: {
    title() {
      switch (this.dialogStatus) {
        case 'add':
          return '图片新增'
        case 'update':
          return '图片修改'
        case 'detail':
          return '图片详情'
        default:
          return '图片新增'
      }
    },
  },
  methods: {
    handleVisible(id, dialogStatus) {
      Object.assign(this.$data, this.$options.data())
      this.form.id = id || ''
      this.visible = true
      this.dialogStatus = dialogStatus

      // 详情/编辑
      if (this.form.id) {
        this.getImgDetail()
      }
    },

    // 上传成功
    uploadSuccess(list) {
      this.form.fileList = JSON.stringify(list)
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },
    handleSubmit() {
      this.saveImg()
    },
    // 新增
    async saveImg() {
      this.loading = true
      try {
        const { code } = await saveImg(this.form)
        if (code === 200) {
          this.$message.success('图片新增成功！')
          this.$emit('handleSuccess')
          this.onClose()
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 详情
    async getImgDetail() {
      const { code, rs } = await getImgDetail({ id: this.form.id })
      if (code === 200) {
        const { id, title, fileList, noticeType, content } = rs
        Object.assign(this.form, { id, title, noticeType, fileList, content })
      }
    },
  },
}
</script>
