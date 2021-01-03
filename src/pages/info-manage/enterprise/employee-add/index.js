import { mapState, mapGetters, mapActions } from 'vuex'
import { getEmployee, saveEmployee } from '@/api/index'

export default {
  data() {
    return {
      visible: false,
      labelCol: { span: 7 },
      wrapperCol: { span: 24 },
      span: 12,
      dialogStatus: '',
      form: {
        companyId: '',
        employeeId: '',
        name: '', // 员工名称
        cardType: undefined, // 证件类型
        country: undefined, // 国籍
        cardNum: '', // 证件号码
        sex: 1, // 性别
        age: '', // 年龄
        employeeFrom: undefined, // 籍贯
        employeeFromCopy: [],
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
      rules: null,
    }
  },
  computed: {
    ...mapGetters('account', ['user']),
    ...mapState('common', ['carTypeList', 'countryList', 'genderList', 'regionList', 'nationList', 'politicalList', 'educationList', 'abilityList', 'whetherList']),
    // 显示详情
    disabled() {
      return this.dialogStatus === 'detail' ? true : false
    },
  },
  methods: {
    ...mapActions('common', ['getCardTypeList', 'getCountryList', 'getRegionList', 'getNationList', 'getPoliticalList', 'getEducationList', 'getAbilityList']),
    // 打开
    // employeeObj, dialogStatus
    handleVisible(obj) {
      Object.assign(this.$data, this.$options.data())
      const { companyId, employeeId, dialogStatus } = obj
      console.log(obj, 'obj')
      this.form.companyId = companyId
      console.log(this.form, 'this.form')
      if (this.user.roleLevel < 3) {
        this.rules = {
          name: [{ required: true, message: '必填', trigger: 'blur' }],
          cardType: [{ required: true, message: '必填', trigger: 'change' }],
          country: [{ required: true, message: '必填', trigger: 'change' }],
          cardNum: [{ required: true, message: '必填', trigger: 'blur' }],
          sex: [{ required: true, message: '必填', trigger: 'blur' }],
          age: [{ required: true, message: '必填', trigger: 'blur' }],
          employeeFromCopy: [{ required: true, message: '必填', trigger: 'change' }],
          nation: [{ required: true, message: '必填', trigger: 'change' }],
          politicalType: [{ required: true, message: '必填', trigger: 'change' }],
          address: [{ required: true, message: '必填', trigger: 'blur' }],
          education: [{ required: true, message: '必填', trigger: 'change' }],
          outLimitDate: [{ required: true, message: '必填', trigger: 'blur' }],
          repeatCheck: [{ required: true, message: '必填', trigger: 'blur' }],
          phone: [{ required: true, message: '必填', trigger: 'blur' }],
          job: [{ required: true, message: '必填', trigger: 'blur' }],
          isContact: [{ required: true, message: '必填', trigger: 'blur' }],
        }
      } else {
        this.rules = {
          name: [{ required: true, message: '必填', trigger: 'blur' }],
          cardType: [{ required: true, message: '必填', trigger: 'change' }],
          country: [{ required: true, message: '必填', trigger: 'change' }],
          cardNum: [{ required: true, message: '必填', trigger: 'blur' }],
          sex: [{ required: true, message: '必填', trigger: 'blur' }],
          age: [{ required: true, message: '必填', trigger: 'blur' }],
          employeeFromCopy: [{ required: true, message: '必填', trigger: 'change' }],
          nation: [{ required: true, message: '必填', trigger: 'change' }],
          politicalType: [{ required: true, message: '必填', trigger: 'change' }],
          address: [{ required: true, message: '必填', trigger: 'blur' }],
          education: [{ required: true, message: '必填', trigger: 'change' }],
          outLimitDate: [{ required: true, message: '必填', trigger: 'blur' }],
          phone: [{ required: true, message: '必填', trigger: 'blur' }],
          job: [{ required: true, message: '必填', trigger: 'blur' }],
          isContact: [{ required: true, message: '必填', trigger: 'blur' }],
        }
      }
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

      if (employeeId) {
        this.getEmployee({ employeeId, companyId })
      }
    },
    // 关闭
    handleClose() {
      Object.assign(this.$data, this.$options.data())
    },
    // 提交
    handleSubmit() {
      // 籍贯处理
      this.form.employeeFrom = this.form.employeeFromCopy.length ? this.form.employeeFromCopy.join() : ''

      // 有效期限处理
      this.form.outLimitDateStart = this.form.outLimitDate[0]
      this.form.outLimitDateEnd = this.form.outLimitDate[1]

      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveEmployee(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取员工列表
    async getEmployee(params) {
      const { code, rs } = await getEmployee(params)
      if (code === 200) {
        Object.keys(this.form).forEach(key => {
          this.form[key] = rs[key]
        })
        this.form.employeeId = rs.id
        if (this.form.outLimitDateStart && this.form.outLimitDateEnd) {
          this.form.outLimitDate = [this.form.outLimitDateStart, this.form.outLimitDateEnd]
        }
        this.form.employeeFromCopy = this.form.employeeFrom ? this.form.employeeFrom.split(',').map(item => Number(item)) : []
      }
    },
    // 保存
    async saveEmployee(params) {
      const { code } = await saveEmployee(params)
      console.log(code, 'code')
      if (code === 200) {
        this.$message.success('添加员工成功')
        this.$emit('handleSuccess')
        this.handleClose()
      }
    },
  },
}
