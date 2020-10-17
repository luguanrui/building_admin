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
          title: '房产地址',
          dataIndex: 'address',
          ellipsis: true,
        },
        {
          title: '物业公司',
          dataIndex: 'company',
          ellipsis: true,
        },
        {
          title: '创建时间',
          dataIndex: 'time',
          ellipsis: true,
          //   customRender: (text, record) =>
          //     dayjs(record.createAt).format("YYYY-MM-DD"),
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
    // 自定义查询
    handleAutoSearch() {},
  },
}
