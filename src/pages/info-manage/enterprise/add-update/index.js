import { mapState, mapActions } from 'vuex'
import dayjs from 'dayjs'
import { saveCompany, getCompany } from '@/api/index'
import EmployeeAdd from '../employee-add/index.vue'

export default {
  components: { EmployeeAdd },
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
        name: '', // 企业名称
        buildId: undefined, // 楼宇ID
        buildType: undefined, // 主楼副楼
        floor: '', // 楼层
        roomNum: '', // 房号
        companyType: undefined, // 企业性质
        belongType: undefined, // 属地性质
        creditCode: '', // 统一信用代码
        regAddress: '', // 注册地址
        regDate: '', // 注册时间
        industryType: undefined, // 行业类别
        iegalPerson: '', // 法人
        businessScope: '', // 经营范围

        // 联系方式
        contactName: '', // 联系人
        contactJob: '', // 职务
        contactPhone: '', // 联系电话

        // 办公场所
        workRoomType: undefined, // 所属权
        workRoomArea: '', // 面积
        workRoomPhone: '', // 联系电话

        // 入驻企业员工信息列表
        employeeList: [],
      },

      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        buildId: [{ required: true, message: '必填', trigger: 'blur' }],
        buildType: [{ required: true, message: '必填', trigger: 'blur' }],
        floor: [{ required: true, message: '必填', trigger: 'blur' }],
        roomNum: [{ required: true, message: '必填', trigger: 'blur' }],
        companyType: [{ required: true, message: '必填', trigger: 'blur' }],
        belongType: [{ required: true, message: '必填', trigger: 'blur' }],
        creditCode: [{ required: true, message: '必填', trigger: 'blur' }],
        regAddress: [{ required: true, message: '必填', trigger: 'blur' }],
        regDate: [{ required: true, message: '必填', trigger: 'blur' }],
        iegalPerson: [{ required: true, message: '必填', trigger: 'blur' }],
        businessScope: [{ required: true, message: '必填', trigger: 'blur' }],

        contactJob: [{ required: true, message: '必填', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '必填', trigger: 'blur' }],

        workRoomType: [{ required: true, message: '必填', trigger: 'blur' }],
        workRoomArea: [{ required: true, message: '必填', trigger: 'blur' }],
        workRoomPhone: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      data: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: 80,
          customRender: (text, record, index) => index + 1,
        },
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: '证件号码',
          dataIndex: 'cardNum',
        },
        {
          title: '创建时间',
          dataIndex: 'createAt',
          customRender: (text, record) => dayjs(record.createAt).format('YYYY年MM月DD日'),
        },
        {
          title: '操作',
          width: 180,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },

  computed: {
    ...mapState('common', ['buildTypeList', 'buildingAllList', 'companyTypeList', 'belongList', 'industryList', 'workRoomTypeList']),
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
    // 员工情况,总人数
    totalCount() {
      let total = 0
      this.form.educationCountList.forEach(item => {
        total += item.count
      })
      return total
    },
    // 显示详情
    disabled() {
      return this.dialogStatus === 'detail' ? true : false
    },
  },
  methods: {
    ...mapActions('common', ['getBuildAllList', 'getCompanyTypeList', 'getBelongList', 'getIndustryList']),
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

      // 查询楼宇列表（分页）
      this.getBuildAllList()
      // 企业性质列表
      this.getCompanyTypeList()
      // 属地性质列表
      this.getBelongList()
      // 行业类别列表
      this.getIndustryList()

      // 详情/编辑
      if (this.form.id) {
        this.getCompany()
      }
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },

    // 提交信息
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 新增
          if (this.dialogStatus === 'add' || this.dialogStatus === 'edit') {
            this.saveCompany()
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
    // 新增员工
    handleAddEmployee() {
      this.$refs.employeeAdd.handleVisible(this.form.id, undefined, 'add')
    },
    // 修改员工信息
    handleUpdate(record) {
      this.$refs.employeeAdd.handleVisible(this.form.id, record, 'edit')
    },
    // 删除员工
    handleDel(record) {
      console.log(record)
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
    async getCompany() {
      const { code, rs } = await getCompany({ id: this.form.id })
      if (code === 200) {
        rs.employeeList = rs.employeeList || []
        this.form = Object.assign(this.form, rs)
      }
    },
    // 新增
    async saveCompany() {
      try {
        this.loading = true
        // 参数
        const params = { ...this.form }
        console.log(params, 'params')
        if (params) {
          const { code } = await saveCompany(params)
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
