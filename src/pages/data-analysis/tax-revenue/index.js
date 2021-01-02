import BarItem from '../components/barItem.vue'
import AreaLine from '../components/area-line.vue'
import { mapState, mapActions } from 'vuex'
import { getDataByIndustry, getDataByMonth, getDataByYear, exportDataByIndustry, exportDataByMonth, exportDataByYear } from '@/api/index'

export default {
  components: { AreaLine, BarItem },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
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
    this.getYearList()

    this.onSubmit()
  },
  mounted() {
    this.getBuildAllList()
    this.getIndustryList()
    this.getEducationList()
    this.getAbilityList()
    this.getYearList()

    this.onSubmit()
  },
  computed: {
    ...mapState('common', ['permissionList','buildingAllList', 'industryList', 'educationList', 'abilityList', 'yearList']),
  },
  methods: {
    ...mapActions('common', ['getBuildAllList', 'getIndustryList', 'getEducationList', 'getAbilityList', 'getYearList']),
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
    handleExport() {
      this.exportDataByYear()
    },
    handleExport2() {
      this.exportDataByMonth()
    },
    handleExport3() {
      this.exportDataByIndustry()
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
    // 导出
    async exportDataByIndustry() {
      try {
        this.downLoading3 = true
        const params = {
          year: this.form.year, // 年度
          buildIdList: this.form.buildIdList ? this.form.buildIdList.join(',') : '', // 楼宇
          industryIdList: this.form.industryIdList ? this.form.industryIdList.join(',') : '', // 行业列表
          dataAnalyseType: this.form.dataAnalyseType,
        }
        let result = await exportDataByIndustry(params)
        if (result) {
          this.downLoading3 = false
        }

        let blob = new Blob([result], {
          type: 'application/vnd.ms-excel,charset=UTF-8',
        })

        let fileName = `行业税收情况分析.xlsx`
        this.downFile(blob, fileName)
      } catch (err) {
        this.downLoading3 = false
      }
    },
    //
    async exportDataByMonth() {
      try {
        this.downLoading2 = true
        const params = {
          year: this.form.year, // 年度
          buildIdList: this.form.buildIdList ? this.form.buildIdList.join(',') : '', // 楼宇
          industryIdList: this.form.industryIdList ? this.form.industryIdList.join(',') : '', // 行业列表
          dataAnalyseType: this.form.dataAnalyseType,
        }
        let result = await exportDataByMonth(params)
        if (result) {
          this.downLoading2 = false
        }

        let blob = new Blob([result], {
          type: 'application/vnd.ms-excel,charset=UTF-8',
        })

        let fileName = `${this.form.year}年度税收情况分析.xlsx`
        this.downFile(blob, fileName)
      } catch (err) {
        this.downLoading2 = false
      }
    },
    //
    async exportDataByYear() {
      try {
        this.downLoading = true
        const params = {
          year: this.form.year, // 年度
          buildIdList: this.form.buildIdList ? this.form.buildIdList.join(',') : '', // 楼宇
          industryIdList: this.form.industryIdList ? this.form.industryIdList.join(',') : '', // 行业列表
          dataAnalyseType: this.form.dataAnalyseType,
        }
        let result = await exportDataByYear(params)
        if (result) {
          this.downLoading = false
        }

        let blob = new Blob([result], {
          type: 'application/vnd.ms-excel,charset=UTF-8',
        })

        let fileName = `${this.form.year}年度以来整体税收情况分析.xlsx`
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
  },
}
