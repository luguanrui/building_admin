import pagination from '@/mixins/pagination'
import { getEmployeeSearch, getCompanyAll } from '@/api/index'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [pagination],
  data() {
    return {
      companyAllList: [],
      form: {
        companyIdList: [],
        buildId: undefined, // 楼宇名称
        abilityTypeList: [],
        countryList: [],
        dy: undefined,
        educationList: [],
        phone: undefined,
        sex: undefined,
      },
      loading: false,
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
          title: '性别',
          dataIndex: 'sexName',
        },
        {
          title: '电话',
          dataIndex: 'phone',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '学历',
          dataIndex: 'educationName',
        },
        {
          title: '人才类别',
          dataIndex: 'abilityTypeName',
        },
        {
          title: '国籍',
          dataIndex: 'countryName',
        },
        {
          title: '政治面貌',
          dataIndex: 'politicalTypeName',
        },
        {
          title: '企业名称',
          dataIndex: 'companyName',
        },
        // {
        //   title: '操作',
        //   width: 310,
        //   scopedSlots: { customRender: 'operation' },
        // },
      ],
    }
  },
  activated() {
    this.getBuildAllList()
    this.getAbilityList()
    this.getEducationList()
    this.getCountryList()
    this.getCompanyAll()

    this.getEmployeeSearch()
  },
  mounted() {
    this.getBuildAllList()
    this.getAbilityList()
    this.getEducationList()
    this.getCountryList()
    this.getCompanyAll()

    this.getEmployeeSearch()
  },
  computed: {
    ...mapState('common', [
      'permissionList',
      'buildingAllList',
      'buildTypeList',
      'buildingFloorList',
      'buildingRoomList',
      'abilityList',
      'educationList',
      'countryList',
      'genderList',
      'whetherList',
    ]),
  },
  methods: {
    ...mapActions('common', ['getBuildAllList', 'getBuildFloorList', 'getBuildRoomList', 'getAbilityList', 'getEducationList', 'getCountryList']),
    // 查询
    handleSearch() {
      this.pagination.current = 1
      this.pagination.pageSize = 10
      this.getEmployeeSearch()
    },
    // 重置
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.getEmployeeSearch()
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
      this.getEmployeeSearch()
    },
    // 企业
    async getCompanyAll() {
      const { code, rs } = await getCompanyAll()
      if (code === 200) {
        this.companyAllList = rs
      }
    },
    // 列表
    async getEmployeeSearch() {
      this.data = []
      this.loading = true
      try {
        const { pageSize, current: pageNum } = this.pagination
        const params = {
          ...this.form,
          companyIdList: this.form.companyIdList.join(),
          abilityTypeList: this.form.abilityTypeList.join(),
          countryList: this.form.countryList.join(),
          educationList: this.form.educationList.join(),
          pageSize,
          pageNum,
        }
        const { code, rs } = await getEmployeeSearch(params)
        if (code === 200) {
          this.data = rs.data
          const { current, pageSize, total } = rs
          this.pagination = Object.assign(this.pagination, { current, pageSize, total })
        }
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
}
