import { saveBuild, getBuildHome } from '@/api/index'
import Upload from '@/pages/components/upload'

export default {
  components: { Upload },
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 24 },
      span: 12,

      visible: false,
      loading: false,
      dialogStatus: '', // add ,edit,detail

      roomTypeList: [
        { key: 1, value: '主楼' },
        { key: 2, value: '副楼' },
        { key: 3, value: '单身公寓' },
      ],

      form: {
        id: '',
        name: '', // 楼宇名称
        constructCompany: '', // 建设单位
        address: '', // 建设单位地址
        propertyCompany: '', // 物业公司
        contactName: '', // 负责人
        contactPhone: '', // 联系电话
        mainArea: '', // 主楼面积
        singleApartmentArea: '', // 单身公寓面积
        mainAreaLeft: '', // 主楼空置
        viceArea: '', // 副楼面积
        viceAreaLeft: '', // 副楼空置
        buildingPic: '', // 楼宇照片
        roomList: [], // 楼宇的房间列表
      },

      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        constructCompany: [{ required: true, message: '必填', trigger: 'blur' }],
        address: [{ required: true, message: '必填', trigger: 'blur' }],
        propertyCompany: [{ required: true, message: '必填', trigger: 'blur' }],
        contactName: [{ required: true, message: '必填', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '必填', trigger: 'blur' }],
        mainArea: [{ required: true, message: '必填', trigger: 'blur' }],
        singleApartmentArea: [{ required: true, message: '必填', trigger: 'blur' }],
        viceArea: [{ required: true, message: '必填', trigger: 'blur' }],
        buildingPic: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      data: [],
    }
  },

  computed: {
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
      this.form.id = id || ''
      this.visible = true
      this.dialogStatus = dialogStatus

      // 详情/编辑
      if (this.form.id) {
        this.getBuildHome()
      }
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },
    // 上传成功
    uploadSuccess(list) {
      this.form.buildingPic = JSON.stringify(list)
    },
    // 提交信息
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 新增
          if (this.dialogStatus === 'add' || this.dialogStatus === 'edit') {
            this.saveBuild()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    handleAddRoom() {
      this.form.roomList.push({ buildType: undefined, roomNum: '', area: '' })
    },
    handleRemove(item) {
      let index = this.form.roomList.indexOf(item)
      if (index !== -1) {
        this.form.roomList.splice(index, 1)
      }
    },
    // 新增员工成功
    handleSuccess(dialogStatus, obj) {
      if (dialogStatus === 'add') {
        this.form.employeeList.push({
          ...obj,
          createAt: new Date(),
        })
      } else if (dialogStatus === 'edit') {
        // 编辑
      }
    },
    // 详情
    async getBuildHome() {
      const { code, rs } = await getBuildHome({ buildId: this.form.id })
      if (code === 200) {
        rs.employeeList = rs.employeeList || []
        this.form = Object.assign(this.form, rs)
      }
    },
    // 新增
    async saveBuild() {
      try {
        this.loading = true
        // 参数
        const params = { ...this.form }
        console.log(params, 'params')
        if (params) {
          const { code } = await saveBuild(params)
          if (code === 200) {
            this.visible = false
            this.$emit('handleSuccess')
            this.loading = false
          }
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
}