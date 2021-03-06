import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'
import AddUpdate from './add-update/index.vue'
import OtherInfo from './other-info/index.vue'
import EmployeeList from './employee-list/index.vue'
import MoveOut from './move-out/index.vue'
import { getCompanyList, removeCompany, exportCompanyList } from '@/api/index'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [pagination],
  components: { AddUpdate, OtherInfo,EmployeeList,MoveOut },
  data() {
    return {
      form: {
        companyName: '', // 企业名称
        buildId: undefined, // 楼宇名称
        buildType: undefined, // 主楼裙房
        floor: undefined, // 楼层
        roomNum: undefined, // 房号
        isLeave: undefined,
        industryType: []
      },
      downLoading: false,
      loading: false,
      selectedRowKeys: [],
      data: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: 80,
          customRender: (text, record, index) => index + 1,
        },
        {
          title: '企业名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '楼宇名称',
          dataIndex: 'buildName',
        },
        {
          title: '办公地址',
          dataIndex: 'companyAddress',
        },
        {
          title: '企业联系人',
          dataIndex: 'contactName',
        },
        {
          title: '创建时间',
          dataIndex: 'createAt',
          customRender: (text, record) => dayjs(record.createAt).format('YYYY年MM月DD日'),
        },
        {
          title: '搬迁',
          dataIndex: 'leaveDesc',
        },
        {
          title: '操作',
          width: 310,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  activated() {
    this.getBuildAllList()
    this.getIndustryList()
    this.getCompanyList()
  },
  mounted() {
    this.getBuildAllList()
    this.getIndustryList()
    this.getCompanyList()
  },
  computed: {
    ...mapState('common', ['permissionList','buildingAllList', 'buildTypeList', 'buildingFloorList', 'buildingRoomList','whetherList','industryList']),
  },
  methods: {
    ...mapActions('common', ['getBuildAllList', 'getBuildFloorList', 'getBuildRoomList','getIndustryList']),
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
    // 选择主楼裙房
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
    // 查询
    handleSearch() {
      this.pagination.current = 1
      this.pagination.pageSize = 10
      this.getCompanyList()
    },
    // 重置
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.getCompanyList()
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
      this.getCompanyList()
    },
    handleDetail(record) {
      this.$refs.addUpdate.handleVisible(record.id, 'detail')
    },
    // 修改
    handleUpdate(record) {
      this.$refs.addUpdate.handleVisible(record.id, 'edit')
    },
    // 删除
    handleDel(record) {
      removeCompany({ id: record.id }).then(res => {
        const { code } = res
        if (code === 200) {
          this.handleSearch()
        }
      })
    },
    // 新增
    handleAdd() {
      this.$refs.addUpdate.handleVisible('', 'add')
    },
    // 员工列表
    handleEmployee(record) {
      this.$refs.employeeList.handleVisible(record.id)
    },
    // 搬迁
    handleMoveOut(record) {
      this.$refs.moveOut.handleVisible(record.id)
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 其他信息
    handleAddOther() {
      if (!this.selectedRowKeys.length) {
        this.$message.error('请先选择企业')
        return
      }
      this.$refs.otherInfo.handleVisible(this.selectedRowKeys[0], 'add')
    },
    handleOther(record) {
      this.$refs.otherInfo.handleVisible(record.id, 'detail')
    },
    // 新增成功
    handleSuccess() {
      this.handleSearch()
    },
    // 导出
    handleExport() {
      this.exportCompanyList()
    },
    // 员工列表
    handleEmployeeList() {
      this.$router.push({path: '/info-manage/employee'})
    },
    // 列表
    async getCompanyList() {
      this.data = []
      this.loading = true
      try {
        const { pageSize, current: pageNum } = this.pagination
        const params = { 
            ...this.form,
           pageSize, 
           pageNum,
           industryType: this.form.industryType.length ? this.form.industryType[this.form.industryType.length - 1] : ''
        }
        const { code, rs } = await getCompanyList(params)
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
    // 导出
    async exportCompanyList() {
      try {
        this.downLoading = true
        const { pageSize, current: pageNum } = this.pagination
        const params = { ...this.form, pageSize, pageNum }
        let result = await exportCompanyList(params)
        if (result) {
          this.downLoading = false
        }

        let blob = new Blob([result], {
          type: 'application/vnd.ms-excel,charset=UTF-8',
        })

        let fileName = `企业信息.xlsx`
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
