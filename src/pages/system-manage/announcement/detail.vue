<template>
  <a-card>
    <div v-html="form.content"></div>
    <Upload ref="upload" @uploadSuccess="uploadSuccess" :fileObjList="form.fileList" :fileListLength="1" :multiple="false" :acceptStr="'img'" />
  </a-card>
</template>
<script>
import Upload from '@/pages/components/upload'
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
    const { id } = this.$route.query
    this.form.id = id || ''
    this.getNoticeDetail()
  },
  methods: {
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
