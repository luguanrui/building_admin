import { mapState, mapActions } from 'vuex'
import { saveOwner, getOwner } from '@/api/index'

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
        id: '',
        buildName: '', // 楼宇名称
        buildType: undefined, // 	0-无；1-主楼；2-副楼
        floor: '', // 楼层
        roomNum: '', // 房号
        totalArea: '', // 面积
        ownerName: '', // 产权所有人
        cardType: undefined, // 证件类型
        country: undefined, // 国籍
        cardNum: '', // 证件号码
        phone: '', // 联系电话
        ownerCardNo: '', // 产权证号
        carNum: '', // 车牌号码
      },

      rules: {
        buildName: [{ required: true, message: '必填', trigger: 'blur' }],
        floor: [{ required: true, message: '必填', trigger: 'blur' }],
        roomNum: [{ required: true, message: '必填', trigger: 'blur' }],
        totalArea: [{ required: true, message: '必填', trigger: 'blur' }],
        ownerName: [{ required: true, message: '必填', trigger: 'blur' }],
        cardType: [{ required: true, message: '必填', trigger: 'blur' }],
        country: [{ required: true, message: '必填', trigger: 'blur' }],
        phone: [{ required: true, message: '必填', trigger: 'blur' }],
        ownerCardNo: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },

  computed: {
    ...mapState('common', ['buildTypeList','countryList','carTypeList']),
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
    ...mapActions('common', ['getCountryList','getCardTypeList']),
    /**
     *
     * @param {*} id 项目id
     * @param {*} disabled 是否可编辑 true不可编辑，false可编辑
     */
    handleVisible(id, dialogStatus) {
      Object.assign(this.$data, this.$options.data())
      this.form.id = id || ''
      this.visible = true
      this.dialogStatus = dialogStatus

      this.getCountryList()
      this.getCardTypeList()
      if (id) {
        this.getOwner()
      }
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },

    // 提交信息
    handleSubmit() {
      // 新增
      if (this.dialogStatus === 'add' || this.dialogStatus === 'edit') {
        this.saveOwner()
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
    async saveOwner() {
      this.loading = true
      try {
        const { code } = await saveOwner(this.form)
        if (code === 200) {
          this.$message.success('业主信息新增成功！')
          this.$emit('handleSuccess')
          this.onClose()
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 详情
    async getOwner() {
      const { code, rs } = await getOwner({ id: this.form.id })
      if (code === 200) {
        const { id, title, noticeType, fileList, content } = rs
        Object.assign(this.form, { id, title, noticeType, fileList, content })
      }
    },
  },
}
