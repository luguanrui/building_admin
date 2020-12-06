<template>
  <a-drawer :title="title" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
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
          <Upload ref="upload" @uploadSuccess="uploadSuccess" :fileObjList="form.fileList" />
        </a-form-model-item>
        <a-form-model-item label="正文" prop="content">
          <a-input v-model="form.content" placeholder="请输入" type="textarea" :rows="8" style="width: 100%" :maxLength="2000" allowClear />
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
import { mapState } from 'vuex'
import { saveNotice, getNoticeDetail } from '@/api/index'

export default {
  components: { Upload },
  data() {
    return {
      dialogStatus: '', // add ,update,detail
      obj: {},
      visible: false,
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
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
      disabled: false,
    }
  },
  computed: {
    ...mapState('common', ['noticeTypeList']),
    title() {
      switch (this.dialogStatus) {
        case 'add':
          return '公告新增'
        case 'update':
          return '公告修改'
        case 'detail':
          return '公告详情'
        default:
          return '公告新增'
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
        this.getNoticeDetail()
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
