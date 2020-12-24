import BarItem from '../components/barItem.vue'
import AreaLine from '../components/area-line.vue'
import { mapState, mapActions } from 'vuex'
import { getDataByIndustry, getDataByMonth, getDataByYear } from '@/api/index'

export default {
  components: { AreaLine, BarItem },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      yearList: [
        { key: '2020', value: 2020 },
        { key: '2019', value: 2019 },
        { key: '2018', value: 2018 },
        { key: '2017', value: 2017 },
        { key: '2016', value: 2016 },
      ],
      form: {
        year: undefined, // 年度
        buildIdList: [], // 楼宇
        industryIdList: [], // 行业列表
        // educationIdList: [],
        // abilityIdList: [],
        dataAnalyseType: 2,
      },
      downLoading: false,
      data: [],
      columns: [],

      downLoading2: false,
      data2: [],
      columns2: [],

      downLoading3: false,
      data3: [],
      columns3: [],

      columnarData: [],
      columnarData2: [],
      columnarData3: [],
    }
  },
  activated() {
    this.getBuildAllList()
    this.getIndustryList()
    this.getEducationList()
    this.getAbilityList()

    this.onSubmit()
  },
  mounted() {
    this.getBuildAllList()
    this.getIndustryList()
    this.getEducationList()
    this.getAbilityList()

    this.onSubmit()
  },
  computed: {
    ...mapState('common', ['buildingAllList', 'industryList', 'educationList', 'abilityList']),
  },
  methods: {
    ...mapActions('common', ['getBuildAllList', 'getIndustryList', 'getEducationList', 'getAbilityList']),
    onSubmit() {
      this.getDataByIndustry()
      this.getDataByMonth()
      this.getDataByYear()
    },
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.getDataByIndustry()
      this.getDataByMonth()
      this.getDataByYear()
    },
    // 按年度，从2017年至今xx分析
    async getDataByYear() {
      const params = {
        year: this.form.year, // 年度
        buildIdList: this.form.buildIdList ? this.form.buildIdList.join(',') : '', // 楼宇
        industryIdList: this.form.industryIdList ? this.form.industryIdList.join(',') : '', // 行业列表
        // educationIdList: this.form.educationIdList ? this.form.educationIdList.join(',') : '',
        // abilityIdList: this.form.abilityIdList ? this.form.abilityIdList.join(',') : '',
        dataAnalyseType: this.form.dataAnalyseType,
      }
      try {
        const { code, rs } = await getDataByYear(params)
        if (code === 200) {
          this.columns = []
          rs.cols.forEach(col => {
            this.columns.push({ title: col.label, dataIndex: col.prop })
          })
          this.data = rs.tableData
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 年度xx分析
    async getDataByMonth() {
      const params = {
        year: this.form.year, // 年度
        buildIdList: this.form.buildIdList ? this.form.buildIdList.join(',') : '', // 楼宇
        industryIdList: this.form.industryIdList ? this.form.industryIdList.join(',') : '', // 行业列表
        // educationIdList: this.form.educationIdList ? this.form.educationIdList.join(',') : '',
        // abilityIdList: this.form.abilityIdList ? this.form.abilityIdList.join(',') : '',
        dataAnalyseType: this.form.dataAnalyseType,
      }
      try {
        const { code, rs } = await getDataByMonth(params)
        if (code === 200) {
          this.columns2 = []
          rs.table.cols.forEach(col => {
            this.columns2.push({ title: col.label, dataIndex: col.prop })
          })
          this.data2 = rs.table.tableData
          this.columnarData2 = rs.image
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 年度行业xx情况分析
    async getDataByIndustry() {
      const params = {
        year: this.form.year, // 年度
        buildIdList: this.form.buildIdList ? this.form.buildIdList.join(',') : '', // 楼宇
        industryIdList: this.form.industryIdList ? this.form.industryIdList.join(',') : '', // 行业列表
        // educationIdList: this.form.educationIdList ? this.form.educationIdList.join(',') : '',
        // abilityIdList: this.form.abilityIdList ? this.form.abilityIdList.join(',') : '',
        dataAnalyseType: this.form.dataAnalyseType,
      }
      try {
        const { code, rs } = await getDataByIndustry(params)
        if (code === 200) {
          this.columns3 = []
          rs.table.cols.forEach(col => {
            this.columns3.push({ title: col.label, dataIndex: col.prop })
          })
          this.data3 = rs.table.tableData
          this.columnarData3 = rs.image
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
