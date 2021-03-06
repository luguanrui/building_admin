import dayjs from 'dayjs'
import { mapState, mapActions } from 'vuex'
import pagination from '@/mixins/pagination'
import AddUpdate from './add-update/index.vue'
import { getOwnerList, exportOwnerList } from '@/api/index'

export default {
  mixins: [pagination],
  components: { AddUpdate },
  data() {
    return {
      form: {
        buildId: undefined, // 楼宇名称
        buildType: undefined, // 主楼裙房
        floor: undefined, // 楼层
        roomNum: undefined, // 房号
        ownerName: '', // 联系人
      },
      loading: false,
      downLoading: false,
      data: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: 80,
          customRender: (text, record, index) => index + 1,
        },
        {
          title: '房产地址',
          dataIndex: 'ownerAddress',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '楼宇名称',
          dataIndex: 'buildName',
          ellipsis: true,
        },
        {
          title: '联系人',
          dataIndex: 'ownerName',
          ellipsis: true,
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          ellipsis: true,
        },
        // {
        //   title: '房号',
        //   dataIndex: 'roomNum',
        //   ellipsis: true,
        // },
        // {
        //   title: '创建时间',
        //   dataIndex: 'createAt',
        //   ellipsis: true,
        //   customRender: (text, record) => record.createAt && dayjs(record.createAt).format('YYYY年MM月DD日'),
        // },
        {
          title: '操作',
          width: 100,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  activated() {
    this.getBuildAllList()
    this.getOwnerList()
  },
  mounted() {
    this.getBuildAllList()
    this.getOwnerList()
  },
  computed: {
    ...mapState('common', ['permissionList','buildingAllList', 'buildTypeList', 'buildingFloorList', 'buildingRoomList']),
  },
  methods: {
    dayjs,
    ...mapActions('common', ['getBuildAllList', 'getBuildFloorList', 'getBuildRoomList']),
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
      this.pagination.pageSize = 10
      this.pagination.current = 1
      this.getOwnerList()
    },
    // 重置
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.getOwnerList()
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
      this.getOwnerList()
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
      console.log(record)
    },
    // 新增
    handleAdd() {
      this.$refs.addUpdate.handleVisible('', 'add')
    },
    handleSuccess() {
      this.handleSearch()
    },
    // 导出
    handleExport() {
      this.exportOwnerList()
    },
    // 列表
    async getOwnerList() {
      this.loading = true
      try {
        const { pageSize, current: pageNum } = this.pagination
        let params = {
          pageSize,
          pageNum,
          ...this.form,
        }
        const { code, rs } = await getOwnerList(params)
        if (code === 200) {
          this.data = rs.data
          const { current, pageSize, total } = rs
          this.pagination = Object.assign(this.pagination, { current, pageSize, total })
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 导出
    async exportOwnerList() {
      try {
        this.downLoading = true
        const { pageSize, current: pageNum } = this.pagination
        let params = {
          pageSize,
          pageNum,
          ...this.form,
        }
        let result = await exportOwnerList(params)
        if (result) {
          this.downLoading = false
        }

        let blob = new Blob([result], {
          type: 'application/vnd.ms-excel,charset=UTF-8',
        })

        let fileName = `业主信息.xlsx`
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
