import BarItem from '../components/barItem.vue'
import AreaLine from '../components/area-line.vue'
import BarChart from '../components/bar-chart.vue'
import { mapState, mapActions } from 'vuex'
import { getDataHouseIndustry, getDataHousePercent, getDataHouseUseful } from '@/api/index'

export default {
  components: { AreaLine, BarItem, BarChart },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        buildIdList: [], // 楼宇
        industryIdList: [], // 行业列表
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

    this.onSubmit()
  },
  mounted() {
    this.getBuildAllList()
    this.getIndustryList()

    this.onSubmit()
  },
  computed: {
    ...mapState('common', ['buildingAllList', 'industryList']),
  },
  methods: {
    ...mapActions('common', ['getBuildAllList', 'getIndustryList']),
    onSubmit() {
      this.getDataHouseUseful()
      this.getDataHouseIndustry()
      this.getDataHousePercent()
    },
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.onSubmit()
    },
    // 按照楼宇用途情况分析
    async getDataHouseUseful() {
      const params = {
        buildIdList: this.form.buildIdList ? this.form.buildIdList.join(',') : '', // 楼宇
        industryIdList: this.form.industryIdList ? this.form.industryIdList.join(',') : '', // 行业列表
      }
      try {
        const { code, rs } = await getDataHouseUseful(params)
        if (code === 200) {
          this.columns = []
          rs.table.cols.forEach(col => {
            this.columns.push({ title: col.label, dataIndex: col.prop })
          })
          this.data = rs.table.tableData
          this.columnarData = rs.image
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 按照楼宇情况分析
    async getDataHousePercent() {
      const params = {
        buildIdList: this.form.buildIdList ? this.form.buildIdList.join(',') : '', // 楼宇
        industryIdList: this.form.industryIdList ? this.form.industryIdList.join(',') : '', // 行业列表
      }
      try {
        const { code, rs } = await getDataHousePercent(params)
        if (code === 200) {
          this.columns2 = []
          rs.table.cols.forEach(col => {
            this.columns2.push({ title: col.label, dataIndex: col.prop })
          })
          this.data2 = rs.table.tableData
          this.columnarData2 = rs.image.map(item => {
            item.value = item.value / 100
            return item
          })
          console.log(this.columnarData2, 'columnarData2')
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 按照楼宇行业情况分析
    async getDataHouseIndustry() {
      const params = {
        buildIdList: this.form.buildIdList ? this.form.buildIdList.join(',') : '', // 楼宇
        industryIdList: this.form.industryIdList ? this.form.industryIdList.join(',') : '', // 行业列表
      }
      try {
        const { code, rs } = await getDataHouseIndustry(params)
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
