import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'
import AddUpdate from './add-update/index.vue'
import { getHouseList } from '@/api/index'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [pagination],
  components: { AddUpdate },
  data() {
    return {
      form: {
        contactName: '', // 房屋联系人
        buildId: undefined, // 楼宇名称
        buildType: undefined, // 主楼副楼
        floor: undefined, // 楼层
        roomNum: undefined, // 房号
      },
      loading: false,
      data: [
        {
          a: 1,
          b: '11',
          c: '11',
          d: '11',
          e: '11',
        },
      ],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: 80,
          customRender: (text, record, index) => index + 1,
        },
        {
          title: '楼宇名称',
          dataIndex: 'buildName',
          ellipsis: true,
        },
        {
          title: '房产地址',
          dataIndex: 'buildAddress',
          ellipsis: true,
        },
        {
          title: '住户联系人',
          dataIndex: 'contactName',
          ellipsis: true,
        },
        {
          title: '人数',
          dataIndex: 'userCount',
          ellipsis: true,
        },
        {
          title: '房屋性质',
          dataIndex: 'houseTypeName',
          ellipsis: true,
        },
        {
          title: '入住时间',
          dataIndex: 'liveInTime',
          ellipsis: true,
          customRender: (text, record) => record.liveInTime && dayjs(record.liveInTime).format('YYYY年MM月DD日'),
        },
        {
          title: '操作',
          width: 100,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  computed: {
    ...mapState('common', ['buildingAllList', 'buildTypeList', 'buildingFloorList', 'buildingRoomList']),
  },
  activated() {
    this.getBuildAllList()
    this.getHouseList()
  },
  mounted() {
    this.getBuildAllList()
    this.getHouseList()
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
    // 查询
    handleSearch() {
      this.pagination.pageSize = 10
      this.pagination.current = 1
      this.getHouseList()
    },
    // 重置
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.getHouseList()
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
      this.getHouseList()
      // 获取列表
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
    handleExport() {},
    // 列表
    async getHouseList() {
      this.loading = true
      try {
        const { pageSize, current: pageNum } = this.pagination
        let params = {
          pageSize,
          pageNum,
          ...this.form,
        }
        const { code, rs } = await getHouseList(params)
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
  },
}
