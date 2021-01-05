import { mapState, mapActions } from 'vuex'
import dayjs from 'dayjs'
import { saveCompanyOther, getCompany, getCompanyOtherList } from '@/api/index'

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
        name: '', // 企业名称
        buildId: undefined, // 楼宇ID
        buildType: undefined, // 主楼副楼
        floor: undefined, // 楼层
        roomNum: undefined, // 房号
        companyType: undefined, // 企业性质
        belongType: undefined, // 属地性质
        creditCode: '', // 统一信用代码
        regAddress: '', // 注册地址
        regDate: '', // 注册时间
        industryType: undefined, // 行业类别
        iegalPerson: '', // 法人
        taxId: '', // 纳税人识别号
        businessScope: '', // 经营范围
      },
      otherList: [
        {
          year: undefined, // 年度
          income: '', // 营收
          tax: '', // 税收
          enjoy: 0, // 是否享受商务区政策；0-否；1-是
          outLimitDate: [],
          outLimitDateStart: '', // 政策期限开始时间
          outLimitDateEnd: '',
          patent: '', // 专利
          policyContent: '', // 政策内容
          policyPayDesc: '', // 政策兑现情况
          patentContent: '', // 专利内容
        },
      ],

      // rules: {
      //   name: [{ required: true, message: '必填', trigger: 'blur' }],
      //   buildId: [{ required: true, message: '必填', trigger: 'blur' }],
      //   buildType: [{ required: true, message: '必填', trigger: 'blur' }],
      //   floor: [{ required: true, message: '必填', trigger: 'blur' }],
      //   roomNum: [{ required: true, message: '必填', trigger: 'blur' }],
      //   companyType: [{ required: true, message: '必填', trigger: 'blur' }],
      //   belongType: [{ required: true, message: '必填', trigger: 'blur' }],
      //   creditCode: [{ required: true, message: '必填', trigger: 'blur' }],
      //   regAddress: [{ required: true, message: '必填', trigger: 'blur' }],
      //   regDate: [{ required: true, message: '必填', trigger: 'blur' }],
      //   iegalPerson: [{ required: true, message: '必填', trigger: 'blur' }],
      //   taxId: [{ required: true, message: '必填', trigger: 'blur' }],
      //   businessScope: [{ required: true, message: '必填', trigger: 'blur' }],
      // },
    }
  },

  computed: {
    ...mapState('common', [
      'buildTypeList',
      'buildingAllList',
      'companyTypeList',
      'belongList',
      'industryList',
      'workRoomTypeList',
      'buildingFloorList',
      'buildingRoomList',
      'whetherList',
      'yearList',
    ]),
    title() {
      switch (this.dialogStatus) {
        case 'add':
          return '新建企业其他信息'
        case 'edit':
          return '编辑'
        case 'detail':
          return '详情'
        default:
          return '未知状态'
      }
    },
    // disabledOther
    disabledOther() {
      return this.dialogStatus === 'detail'
    },
    // 显示详情
    disabled() {
      return this.dialogStatus === 'detail' ? true : false
    },
  },
  methods: {
    dayjs,
    ...mapActions('common', ['getBuildAllList', 'getCompanyTypeList', 'getBelongList', 'getIndustryList', 'getBuildFloorList', 'getBuildRoomList', 'getYearList']),
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
      this.getYearList()

      this.getCompany()

      if (this.form.id) {
        this.getCompanyOtherList()
      }
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },
    validChange(rule, value, callback) {
      console.log(rule, 'rule')
      if (!value) {
        callback(new Error('必填'))
      } else {
        callback()
      }
    },
    // 选择地址
    handleChangeBuild() {
      this.form.buildType = undefined
      this.form.floor = undefined
      this.form.roomNum = undefined
      this.$store.commit('common/SET_BUILDING_FLOOR_LIST', [])
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType,
        }
        this.getBuildFloorList(params)
      }
    },
    // 选择主楼副楼
    handleChangeMain() {
      this.form.floor = undefined
      this.form.roomNum = undefined
      this.$store.commit('common/SET_BUILDING_FLOOR_LIST', [])
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType,
        }
        this.getBuildFloorList(params)
      }
    },
    // 选择楼层
    handleChangeFloor() {
      this.form.roomNum = undefined
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType && this.form.floor) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType,
          floor: this.form.floor,
        }
        this.getBuildRoomList(params)
      }
    },
    // 提交信息
    handleSubmit() {
      // 新增
      if (this.dialogStatus === 'add' || this.dialogStatus === 'edit') {
        this.saveCompanyOther()
      }
      // this.$refs.form.validate(valid => {
      //   if (valid) {

      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    findValue(arr, key) {
      let result = arr.find(item => item.key === key)
      if (result) {
        return result.value
      } else {
        return '未知类型'
      }
    },
    // 房地产
    findBuildingValue(arr, key) {
      let result = arr.find(item => item.id === key)
      if (result) {
        return result.name
      } else {
        return '未知类型'
      }
    },
    // 新增员工成功
    handleSuccess(dialogStatus, obj) {
      console.log(dialogStatus, obj)
      // if (dialogStatus === 'add') {
      //   this.form.employeeList.push({
      //     ...obj,
      //     createAt: new Date(),
      //   })
      // } else if (dialogStatus === 'edit') {
      //   // 编辑
      // }
    },
    // 删除
    handleRemove(index) {
      this.otherList.splice(index, 1)
    },
    // 新增其他信息
    handleAddOtherInfo() {
      this.otherList.push({
        year: '', // 年度
        income: '', // 营收
        tax: '', // 税收
        enjoy: 0, // 是否享受商务区政策；0-否；1-是
        outLimitDate: [],
        outLimitDateStart: '', // 政策期限开始时间
        outLimitDateEnd: '',
        patent: '', // 专利
        policyContent: '', // 政策内容
        policyPayDesc: '', // 政策兑现情况
        patentContent: '', // 专利内容
      })
    },
    // 详情
    async getCompany() {
      const { code, rs } = await getCompany({ id: this.form.id })
      if (code === 200) {
        this.form = Object.assign(this.form, rs)
      }
    },
    // 列表
    async getCompanyOtherList() {
      this.otherList = []
      const { code, rs } = await getCompanyOtherList({ companyId: this.form.id })
      if (code === 200) {
        rs.forEach(info => {
          this.otherList.push({
            id: info.id,
            year: info.year, // 年度
            income: info.income, // 营收
            tax: info.tax, // 税收
            enjoy: info.enjoy, // 是否享受商务区政策；0-否；1-是
            outLimitDate: [info.outLimitDateStart, info.outLimitDateEnd],
            outLimitDateStart: info.outLimitDateStart, // 政策期限开始时间
            outLimitDateEnd: info.outLimitDateEnd,
            patent: info.patent, // 专利
            policyContent: info.policyContent, // 政策内容
            policyPayDesc: info.policyPayDesc, // 政策兑现情况
            patentContent: info.patentContent, // 专利内容
          })
        })
      }
    },
    // 新增
    async saveCompanyOther() {
      try {
        this.loading = true
        // 参数
        let list = []
        this.otherList.forEach(item => {
          list.push({
            ...item,
            outLimitDateStart: item.outLimitDate[0],
            outLimitDateEnd: item.outLimitDate[1],
          })
        })

        const params = { companyId: this.form.id, otherList: list }
        if (params) {
          const { code } = await saveCompanyOther(params)
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
