// import dayjs from "dayjs";
import pagination from '@/mixins/pagination'
import AddUpdate from './add-update/index.vue'

export default {
  mixins: [pagination],
  components: { AddUpdate },
  data() {
    return {
      form: {
        aa: '',
        bb: undefined,
      },
      loading: false,
      columnsVisible: false, // 自定义列
      checkedColumn: [],
      columnList: [
        { key: '楼宇名称', value: 'aa' },
        { key: '建设单位', value: 'bb' },
        { key: '楼宇地址', value: 'ccc' },
        { key: '物业该公司', value: 'dd' },
        { key: '建筑面积范围', value: 'ee' },
      ],
      data: [
        {
          id: 1,
          address: '11',
          company: '11',
          time: '11',
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
          title: '企业名称',
          dataIndex: 'address',
          ellipsis: true,
        },
        {
          title: '楼宇名称',
          dataIndex: 'company',
          ellipsis: true,
        },
        {
          title: '办公地址',
          dataIndex: 'company',
          ellipsis: true,
        },
        {
          title: '创建时间',
          dataIndex: 'time',
          ellipsis: true,
          //   customRender: (text, record) =>
          //     dayjs(record.createAt).format("YYYY年MM月DD日"),
        },
        {
          title: '操作',
          width: 180,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  methods: {
    // 查询
    handleSearch() {
      //   this.form = data;
    },
    // 重置
    handleReset() {
      Object.assign(this.$data, this.$options.data())
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
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
    // 导出
    handleExport() {},
    // 取消查询列
    hideColumns() {
      this.columnsVisible = false
    },
    // 查询列
    handleAutoSearch() {
      this.columnsVisible = false
    },
    // 列表
    // async getCaseList() {
    //   this.data = []
    //   this.loading = true
    //   try {
    //     const { pageSize, current } = this.pagination
    //     const params = { ...this.form, pageSize, pageNum: current }
    //     const { code, rs } = await getCaseList(params)
    //     if (code === 200) {
    //       this.data = rs.data
    //       this.loading = false
    //       const { pageSize, current, total } = rs
    //       if (total > pageSize) {
    //         const pageObject = { pageSize, current, total }
    //         this.pagination = _.cloneDeep(pageObject)
    //       }
    //     }
    //   } catch (error) {
    //     this.loading = false
    //     console.log(error)
    //   }
    // },
  },
}