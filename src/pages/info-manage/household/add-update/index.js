import { mapState } from 'vuex'

export default {
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 24 },
      span: 12,

      visible: false,
      loading: false,
      dialogStatus: '', // add ,edit,detail

      form: {
        aa: '',
      },

      rules: {
        aa: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },

  computed: {
    ...mapState('common', ['buildingList']),
    title() {
      switch (this.dialogStatus) {
        case 'add':
          return '新建'
        case 'edit':
          return '编辑'
        case 'detail':
          return '详情'
        default:
          return '未知状态'
      }
    },
    // 显示详情
    disabled() {
      // const arr = ['detail', 'talking-about', 'contracted', 'landing', 'start', 'invest']
      // return arr.includes(this.dialogStatus)
      return this.dialogStatus === 'detail' ? true : false
    },
  },
  methods: {
    /**
     *
     * @param {*} id 项目id
     * @param {*} disabled 是否可编辑 true不可编辑，false可编辑
     */
    handleVisible(id, dialogStatus) {
      Object.assign(this.$data, this.$options.data())
      this.id = id || ''
      this.visible = true
      this.dialogStatus = dialogStatus

      if (id) {
        // this.getCase()
      }
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },
    // 新增用户
    handleAddHousehold() {},
    // 提交信息
    handleSubmit() {
      // 新增
      if (this.dialogStatus === 'add' || this.dialogStatus === 'edit') {
        this.addCase()
      }
    },
    // textarea详情处理
    textarea(str) {
      return str && str.replace(/\n|\r\n/g, '<br>')
    },

    findValue(arr, key) {
      let result = arr.find(item => item.key === key)
      if (result) {
        return result.value
      } else {
        return '未知类型'
      }
    },
    // 新增
    // async addCase() {
    //   try {
    //     this.loading = true
    //     // 参数
    //     let investFrom = this.form.investFrom.length ? this.form.investFrom.join() : ''
    //     const params = { ...this.form, id: this.id, investFrom }
    //     console.log(params, 'params')
    //     if (params) {
    //       const { code, rs } = await addCase(params)
    //       if (code === 200) {
    //         this.visible = false
    //         this.$emit('handleSuccess')
    //         this.loading = false
    //         this.id = ''
    //       }
    //     }
    //     this.loading = false
    //   } catch (error) {
    //     this.loading = false
    //   }
    // },
  },
}
