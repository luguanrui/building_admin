import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      visible: false,
      labelCol: { span: 7 },
      wrapperCol: { span: 24 },
      span: 12,
      dialogStatus: '',
      enterpriseId: '', // 企业id
      employeeId: '', // 员工id
      form: {
        name: '', // 员工名称
        cardType: undefined, // 证件类型
        country: undefined, // 国籍
        cardNum: '', // 证件号码
        sex: 1, // 性别
        age: '', // 年龄
        employeeFrom: undefined, // 籍贯
        nation: undefined, // 名族
        politicalType: undefined, // 政治面貌
        address: '', // 居住地址
        education: undefined, // 学历
        abilityType: undefined, // 人才类别
        outLimitDate: [], // 有效期限
        outLimitDateStart: '', // 有效期限开始时间
        outLimitDateEnd: '', // 有效期限结束时间
        repeatCheck: '', // 复评情况
        carNum: '', // 车牌号码
        phone: '', // 联系电话
        job: '', // 职务
        isContact: 1, // 是否为联系人
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        cardType: [{ required: true, message: '必填', trigger: 'blur' }],
        country: [{ required: true, message: '必填', trigger: 'blur' }],
        cardNum: [{ required: true, message: '必填', trigger: 'blur' }],
        sex: [{ required: true, message: '必填', trigger: 'blur' }],
        age: [{ required: true, message: '必填', trigger: 'blur' }],
        employeeFrom: [{ required: true, message: '必填', trigger: 'blur' }],
        nation: [{ required: true, message: '必填', trigger: 'blur' }],
        politicalType: [{ required: true, message: '必填', trigger: 'blur' }],
        address: [{ required: true, message: '必填', trigger: 'blur' }],
        education: [{ required: true, message: '必填', trigger: 'blur' }],
        outLimitDate: [{ required: true, message: '必填', trigger: 'blur' }],
        repeatCheck: [{ required: true, message: '必填', trigger: 'blur' }],
        phone: [{ required: true, message: '必填', trigger: 'blur' }],
        job: [{ required: true, message: '必填', trigger: 'blur' }],
        isContact: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState('common', ['carTypeList', 'countryList', 'genderList', 'regionList', 'nationList', 'politicalList', 'educationList', 'abilityList', 'whetherList']),
    // 显示详情
    disabled() {
      return this.dialogStatus === 'detail' ? true : false
    },
  },
  methods: {
    ...mapActions('common', ['getCardTypeList', 'getCountryList', 'getRegionList', 'getNationList', 'getPoliticalList', 'getEducationList', 'getAbilityList']),
    handleVisible(enterpriseId, employeeId, dialogStatus) {
      Object.assign(this.$data, this.$options.data())
      this.enterpriseId = enterpriseId || ''
      this.employeeId = employeeId || ''
      //   this.form.id = id || ''
      this.visible = true
      this.dialogStatus = dialogStatus

      // 证件类型
      this.getCardTypeList()
      // 国籍
      this.getCountryList()
      // 籍贯
      this.getRegionList()
      // 名族
      this.getNationList()
      // 政治面貌
      this.getPoliticalList()
      // 学历
      this.getEducationList()
      // 人才列表
      this.getAbilityList()
      // 详情/编辑
      if (this.form.id) {
        // this.getCompany()
      }
    },
    // 关闭
    handleClose() {
      Object.assign(this.$data, this.$options.data())
    },
    // 提交
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 新增
          //   if (this.dialogStatus === 'add' || this.dialogStatus === 'edit') {
          //     // this.saveCompany()

          //   }
          this.$emit('handleSuccess', this.form)
          this.handleClose()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
