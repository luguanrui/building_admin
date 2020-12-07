import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'
import AddUpdate from './add-update/index.vue'
import { downFile } from '@/utils/utils'
import { getOwnerList } from '@/api/index'

export default {
  mixins: [pagination],
  components: { AddUpdate },
  data() {
    return {
      form: {
        buildName: '',
        cardNum: '',
      },
      loading: false,
      // columnsVisible: false, // 自定义列
      // checkedColumn: [],
      // columnList: [
      //   { key: '楼宇名称', value: 'aa' },
      //   { key: '建设单位', value: 'bb' },
      //   { key: '楼宇地址', value: 'ccc' },
      //   { key: '物业该公司', value: 'dd' },
      //   { key: '建筑面积范围', value: 'ee' },
      // ],
      data: [
        {
          a: 1,
          b: '11',
          c: '11',
          d: '11',
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
          title: '楼宇地址',
          dataIndex: 'ownerAddress',
          ellipsis: true,
        },
        {
          title: '房产联系人',
          dataIndex: 'ownerName',
          ellipsis: true,
        },
        {
          title: '人数',
          dataIndex: 'roomNum',
          ellipsis: true,
        },
        {
          title: '创建时间',
          dataIndex: 'createAt',
          ellipsis: true,
          customRender: (text, record) => record.createAt && dayjs(record.createAt).format('YYYY年MM月DD日'),
        },
        {
          title: '操作',
          width: 180,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  activated() {
    this.getOwnerList()
  },
  mounted() {
    this.getOwnerList()
  },
  methods: {
    dayjs,
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
    // 导出
    handleExport() {
      downFile()
    },
    // // 取消查询列
    // hideColumns() {
    //   this.columnsVisible = false
    // },
    // // 查询列
    // handleAutoSearch() {
    //   this.columnsVisible = false
    // },
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
  },
}
