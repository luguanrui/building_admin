import pagination from '@/mixins/pagination'
import { mapState, mapActions } from 'vuex'
import { getEmployeeCountList, getBuildAggrList, exportBuildAggrList } from '@/api/index'
import AddUpdate from '@/pages/info-manage/enterprise/add-update/index.vue'

export default {
  components: { AddUpdate },
  mixins: [pagination],
  data() {
    return {
      loading: false,
      downLoading: false,
      columns: [],
      data: [],

      visible: false,
      checkValue: ['name'],
      employeeCountList: [],
      form: {
        companyName: '',
        companyType: undefined,
        address: '',
        buildId: undefined,
        buildType: [],
        floor: [],
        roomNums: [],
        belongType: undefined,
        regAddress: '',
        regDate: '',
        industryType: [], // 行业类别
        employeeCountType: undefined,
        dy: undefined,
        zc: undefined,
        minTax: 0,
        maxTax: 0,
        minIncome: 0,
        maxIncome: 0,
        human: [],
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
  },
  computed: {
    ...mapState('common', ['buildTypeList', 'companyTypeList', 'buildingAllList', 'belongList', 'industryList', 'whetherList', 'abilityList', 'buildingFloorList', 'buildingRoomList']),
  },
  mounted() {
    // 企业性质列表
    this.getCompanyTypeList()
    // 属地性质列表
    this.getBelongList()
    // 房产地址
    this.getBuildAllList()
    // 行业类别列表
    this.getIndustryList()
    // 企业人数
    this.getEmployeeCountList()
    // 人才类别
    this.getAbilityList()
  },
  methods: {
    ...mapActions('common', ['getCompanyTypeList', 'getBelongList', 'getBuildAllList', 'getIndustryList', 'getAbilityList', 'getBuildFloorList', 'getBuildRoomList']),
    handleOpenSearch() {
      this.visible = true
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
      // this.getOwnerList()
    },
    handleSearch() {
      console.log(this.form)
      this.getBuildAggrList()
    },
    formatter(value) {
      return `${value}万元`
    },
    // 选择地址
    handleChangeBuild() {
      this.form.buildType = []
      this.form.floor = []
      this.form.roomNum = []
      this.$store.commit('common/SET_BUILDING_FLOOR_LIST', [])
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType.length) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType.join(),
        }
        this.getBuildFloorList(params)
      }
    },
    // 选择主楼裙房
    handleChangeMain() {
      this.form.floor = []
      this.form.roomNum = []
      this.$store.commit('common/SET_BUILDING_FLOOR_LIST', [])
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType.length) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType.join(),
        }
        this.getBuildFloorList(params)
      }
    },
    // 选择楼层
    handleChangeFloor() {
      this.form.roomNum = []
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType.length && this.form.floor.length) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType.join(),
          floor: this.form.floor.join(),
        }
        this.getBuildRoomList(params)
      }
    },
    // 企业详情
    handleDetail(record) {
      this.$refs.addUpdate.handleVisible(record.id, 'detail')
    },
    // 导出
    handleExport() {
      this.exportBuildAggrList()
    },
    async exportBuildAggrList() {
      try {
        this.downLoading = true
        const queryValue = {}
        this.checkValue.forEach(check => {
          if (check === 'name') {
            queryValue.companyName = this.form.companyName
          } else if (check === 'address') {
            queryValue.buildId = this.form.buildId
            queryValue.buildType = this.form.buildType.join()
            queryValue.floor = this.form.floor.join()
            queryValue.roomNums = this.form.roomNums.join()
          } else if (check === 'industryType') {
            queryValue.industryType = this.form.industryType.length ? this.form.industryType[this.form.industryType.length - 1] : ''
          } else if (check === 'employeeCount') {
            queryValue.employeeCountType = this.form.employeeCountType
          } else if (check === 'taxValue') {
            queryValue.minTax = this.form.minTax
            queryValue.maxTax = this.form.maxTax
          } else if (check === 'incomeValue') {
            queryValue.minIncome = this.form.minIncome
            queryValue.maxIncome = this.form.maxIncome
          } else if (check === 'human') {
            queryValue.human = this.form.human.join()
          } else {
            queryValue[check] = this.form[check]
          }
        })
        const params = {
          queryColumn: this.checkValue.join(),
          ...queryValue,
        }
        let result = await exportBuildAggrList(params)
        if (result) {
          this.downLoading = false
        }

        let blob = new Blob([result], {
          type: 'application/vnd.ms-excel,charset=UTF-8',
        })

        let fileName = `综合查询.xlsx`
        this.downFile(blob, fileName)
      } catch (err) {
        this.downLoading = false
      }
    },
    // 下载
    downFile(blob, fileName) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(link.href)
      }
    },
    // 查询列
    async getBuildAggrList() {
      if (!this.checkValue.length) {
        this.$message.error('请选择自定义列')
        return
      }
      this.columns = []
      this.data = []
      const queryValue = {}
      this.checkValue.forEach(check => {
        if (check === 'name') {
          queryValue.companyName = this.form.companyName
        } else if (check === 'address') {
          queryValue.buildId = this.form.buildId
          queryValue.buildType = this.form.buildType.join()
          queryValue.floor = this.form.floor.join()
          queryValue.roomNums = this.form.roomNums.join()
        } else if (check === 'industryType') {
          queryValue.industryType = this.form.industryType.length ? this.form.industryType[this.form.industryType.length - 1] : ''
        } else if (check === 'employeeCount') {
          queryValue.employeeCountType = this.form.employeeCountType
        } else if (check === 'taxValue') {
          queryValue.minTax = this.form.minTax
          queryValue.maxTax = this.form.maxTax
        } else if (check === 'incomeValue') {
          queryValue.minIncome = this.form.minIncome
          queryValue.maxIncome = this.form.maxIncome
        } else if (check === 'human') {
          queryValue.human = this.form.human.join()
        } else {
          queryValue[check] = this.form[check]
        }
      })
      const params = {
        queryColumn: this.checkValue.join(),
        ...queryValue,
      }
      const { code, rs } = await getBuildAggrList(params)
      if (code === 200) {
        if (rs.length) {
          rs.forEach(row => {
            this.columns = []
            const obj = {}
            row.forEach(col => {
              this.columns.push({
                title: col.label,
                dataIndex: col.props,
                ellipsis: true,
                scopedSlots: col.props === 'name' ? { customRender: 'name' } : {},
              })
              obj[col.props] = col.value
              if (col.props === 'name') {
                obj['id'] = col.companyId
              }
            })
            this.data.push(obj)
          })
          console.log(this.data, 'this.data')
          this.visible = false
        } else {
          this.$message.error('暂无数据')
        }
      }
    },
    // 企业人数
    async getEmployeeCountList() {
      const { code, rs } = await getEmployeeCountList()
      if (code === 200) {
        this.employeeCountList = rs
      }
    },
  },
}
