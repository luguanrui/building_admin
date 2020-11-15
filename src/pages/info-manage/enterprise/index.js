import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'
import AddUpdate from './add-update/index.vue'
import { getCompanyList, removeCompany } from '@/api/index'
import _ from 'lodash'

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
          title: '操作',
          width: 180,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  activated() {
    this.getCompanyList()
  },
  mounted() {
    this.getCompanyList()
  },
  methods: {
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
    // 新增成功
    handleSuccess() {
      this.handleSearch()
    },
    // 导出
    handleExport() {},
    // 列表
    async getCompanyList() {
      this.data = []
      this.loading = true
      try {
        const { pageSize, current } = this.pagination
        const params = { ...this.form, pageSize, pageNum: current }
        const { code, rs } = await getCompanyList(params)
        if (code === 200) {
          this.data = rs.data
          this.loading = false
          const { pageSize, current, total } = rs
          if (total > pageSize) {
            const pageObject = { pageSize, current, total }
            this.pagination = _.cloneDeep(pageObject)
          }
        }
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
}
