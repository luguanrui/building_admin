import { saveBuild, getBuildDetail, getUserList, importData } from '@/api/index'
import Upload from '@/pages/components/upload'
import { mapState } from 'vuex'

export default {
  components: { Upload },
  data() {
    return {
      importVisible: false,
      showUploadFile: false,
      file: '',
      fileName: '',
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
      userList: [],

      form: {
        id: '',
        name: '', // 楼宇名称
        constructCompany: '', // 建设单位
        address: '', // 建设单位地址
        propertyCompany: '', // 物业公司
        contactName: '',
        contactUserId: undefined, // 负责人
        contactPhone: '', // 联系电话
        mainArea: '', // 主楼面积
        singleApartmentArea: '', // 单身公寓面积
        mainAreaLeft: '', // 主楼空置
        viceArea: '', // 副楼面积
        viceAreaLeft: '', // 副楼空置
        buildingPic: '', // 楼宇照片
        roomList: [
          {
            buildType: undefined,
            floor: undefined,
            roomNum: undefined,
            area: undefined,
          },
        ], // 楼宇的房间列表
      },

      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        constructCompany: [{ required: true, message: '必填', trigger: 'blur' }],
        address: [{ required: true, message: '必填', trigger: 'blur' }],
        propertyCompany: [{ required: true, message: '必填', trigger: 'blur' }],
        contactUserId: [{ required: true, message: '必填', trigger: 'change' }],
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
    ...mapState('common', ['buildTypeList']),
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
    templateUrl() {
      return `http://60.191.18.38:8080/file/prod/test/2021-01-02/f27a500e-e9ae-4328-ba6a-95689d251a97.xlsx?sessionId=${localStorage.getItem('buildSessionId')}`
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

      // 用户列表
      this.getUserList()
      // 详情/编辑
      if (this.form.id) {
        this.getBuildDetail()
      }

      if (dialogStatus === 'detail') {
        this.rules = {}
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
    // 选择负责人
    handleContact(userId) {
      this.userList.forEach(user => {
        if (user.userId === userId) {
          this.form.contactPhone = user.phone
        }
      })
    },
    // 上传
    handleImport() {
      this.importVisible = true
    },
    handleChangeUpload(info) {
      info.file.status = 'done'
      this.showUploadFile = false
    },
    customRequest(data) {
      this.fileName = data.file.name
      this.file = data.file
    },
    handleRemoveFile() {
      this.showUploadFile = true
    },
    // 确定导入成功
    handleConfirmImport() {
      this.importData()
    },
    // 上传
    async importData() {
      if (!this.file) {
        this.$message.error('请上传文件')
        return
      }
      let formdata = new FormData()
      formdata.append('file', this.file)
      const { code } = await importData(formdata)
      if (code === 200) {
        this.$message.success('导入成功')
        // 初始化数据
        this.showUploadFile = true
        this.file = ''
        this.fileName = ''

        this.importVisible = false
        this.getTaxImportList()
      }
    },
    // 用户列表
    async getUserList() {
      const { code, rs } = await getUserList()
      if (code === 200) {
        this.userList = rs || []
      }
    },
    // 详情
    async getBuildDetail() {
      const { code, rs } = await getBuildDetail({ id: this.form.id })
      if (code === 200) {
        rs.employeeList = rs.employeeList || []
        Object.keys(this.form).forEach(key => (this.form[key] = rs[key]))
      }
    },
    // 新增
    async saveBuild() {
      try {
        this.loading = true
        // 参数
        const params = { ...this.form }
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
