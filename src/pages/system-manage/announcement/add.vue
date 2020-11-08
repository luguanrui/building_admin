<template>
  <a-drawer :title="title" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="主题名" prop="a">
          <a-input v-model="form.a" placeholder="请输入" allowClear :maxLength="200" />
        </a-form-model-item>
        <a-form-model-item label="公告类型" prop="b">
          <a-select v-model="form.b" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
            <a-select-option v-for="item in list" :value="item.key" :key="item.item">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="上传" prop="name">
          <Upload ref="upload" @uploadSuccess="uploadSuccess" :fileObjList="form.c" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="正文" prop="d">
          <a-input v-model="form.d" placeholder="请输入" type="textarea" :rows="4" style="width: 100%" :maxLength="2000" allowClear />
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

export default {
  components: { Upload },
  data() {
    return {
      status: 'add',
      obj: {},
      visible: false,
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      list: [],
      form: {
        a: '',
        b: undefined,
        c: [],
        d: '',
      },
      rules: {
        a: [{ required: true, message: '请输入', trigger: 'blur' }],
        b: [{ required: true, message: '请选择', trigger: 'change' }],
        d: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      disabled: false,
    }
  },
  computed: {
    title() {
      switch (this.status) {
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
    handleVisible(status, obj) {
      this.status = status
      this.obj = obj
      this.visible = true
    },

    // 上传成功
    uploadSuccess(list) {
      console.log(list)
      //   this.form.recAppendList = JSON.stringify(list)
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },
    handleSubmit() {
      //   this.add()
    },
    // 新增
    // async add() {
    //   this.loading = true
    //   const params = {
    //     projectId: this.projectId,
    //     remark: this.ruleForm.remark,
    //   }
    //   try {
    //     const { code } = await add(params)
    //     if (code === 200) {
    //       this.$message.success('公告新增成功！')
    //       this.$emit('handleSuccess')
    //       this.onClose()
    //     }
    //     this.loading = false
    //   } catch (error) {
    //     this.loading = false
    //   }
    // },
  },
}
</script>
