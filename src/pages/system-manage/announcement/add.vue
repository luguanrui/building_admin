<template>
  <a-card>
    <a-page-header :backIcon="false">
      <template slot="title"></template>
      <template slot="extra">
        <a-button type="primary" @click="handleSubmit">新增</a-button>
      </template>
    </a-page-header>
    <div class="wrapper">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="主题名" prop="title">
          <a-input v-model="form.title" placeholder="请输入" allowClear :maxLength="200" />
        </a-form-model-item>
        <a-form-model-item label="公告类型" prop="noticeType">
          <a-select v-model="form.noticeType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
            <a-select-option v-for="item in noticeTypeList" :value="item.key" :key="item.item">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="上传" prop="fileList">
          <Upload ref="upload" @uploadSuccess="uploadSuccess" :fileObjList="form.fileList" :fileListLength="1" :multiple="false" :acceptStr="'img'" />
        </a-form-model-item>
        <a-form-model-item label="正文" prop="content">
          <span ref="editor"></span>
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-card>
</template>
<script>
import Upload from '@/pages/components/upload'
import E from 'wangeditor'
import { mapState } from 'vuex'
import { saveNotice, getNoticeDetail } from '@/api/index'

export default {
  components: { Upload },
  data() {
    return {
      dialogStatus: '', // add ,update,detail
      obj: {},
      editor: null,
      visible: false,
      loading: false,
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      form: {
        id: '',
        title: '',
        noticeType: undefined,
        fileList: '',
        content: '',
      },
      rules: {
        title: [{ required: true, message: '请输入', trigger: 'blur' }],
        noticeType: [{ required: true, message: '请选择', trigger: 'change' }],
        fileList: [{ required: true, message: '请输入', trigger: 'blur' }],
        content: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      options: {
        placeholder: '请输入',
        theme: 'snow',
      },
    }
  },
  computed: {
    ...mapState('common', ['noticeTypeList']),
  },
  mounted() {
    Object.assign(this.$data, this.$options.data())
    this.initEditor()
  },
  methods: {
    initEditor() {
      this.editor = new E(this.$refs.editor)
      this.editor.config.height = 400
      this.editor.config.onchange = newHtml => {
        this.form.content = newHtml
      }
      this.editor.create()
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
      this.saveNotice()
    },
    // 新增
    async saveNotice() {
      this.loading = true
      try {
        const { code } = await saveNotice(this.form)
        if (code === 200) {
          this.$message.success('公告新增成功！')
          this.$emit('handleSuccess')
          this.onClose()
          //   https://iczer.gitee.io/vue-antd-admin-docs/advance/api.html#%E5%A4%9A%E9%A1%B5%E7%AD%BE
          this.$closePage(this.$route.fullPath)
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 详情
    async getNoticeDetail() {
      const { code, rs } = await getNoticeDetail({ id: this.form.id })
      if (code === 200) {
        const { id, title, noticeType, fileList, content } = rs
        Object.assign(this.form, { id, title, noticeType, fileList, content })
        this.initEditor()
        this.editor.txt.html(this.form.content)
      }
    },
  },
}
</script>
<style lang="less" scoped>
/deep/ .ant-page-header {
  padding: 0;
}
.wrapper {
  padding: 20px 0;
}
</style>
