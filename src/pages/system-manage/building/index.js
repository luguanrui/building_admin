import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'
import { getBuildList, removeBuild } from '@/api/index'
import BuildingAdd from './add/index.vue'

export default {
  mixins: [pagination],
  components: { BuildingAdd },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        buildName: '',
        propertyCompany: '',
      },
      list: [
        {
          key: 1,
          value: '政策',
        },
        {
          key: 2,
          value: '通知',
        },
      ],
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
          title: '楼宇名称',
          dataIndex: 'name',
          ellipsis: true,
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '楼宇地址',
          dataIndex: 'address',
          ellipsis: true,
        },
        {
          title: '物业名称',
          dataIndex: 'propertyCompany',
          ellipsis: true,
        },
        {
          title: '发布时间',
          dataIndex: 'createAt',
          ellipsis: true,
          customRender: (text, record) => dayjs(record.d).format('YYYY年MM月DD日'),
        },
        {
          title: '操作',
          width: 200,
          scopedSlots: { customRender: 'operation' },
        },
      ],
      addVisible: false,
    }
  },
  activated() {
    this.getBuildList()
  },
  mounted() {
    this.getBuildList()
  },
  methods: {
    dayjs,
    onSubmit() {
      this.getBuildList()
    },
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.getBuildList()
    },
    // 新增
    handleAdd() {
      this.$refs.buildingAdd.handleVisible('', 'add')
    },
    // 查看
    handleDetail(record) {
      this.$refs.buildingAdd.handleVisible(record.id, 'detail')
    },
    // 修改
    handleUpdate(record) {
      this.$refs.buildingAdd.handleVisible(record.id, 'edit')
    },
    // 新增修改成功
    handleSuccess() {
      this.onSubmit()
    },
    // 删除
    handleDel(record) {
      console.log(record)
      this.removeBuild(record.id)
      this.getBuildList()
    },
    // 发布
    handlePublish(record) {
      console.log(record)
    },

    // 添加成功之后
    addSuccess() {
      this.getBuildList()
    },
    // 列表
    async getBuildList() {
      this.loading = true
      try {
        const { code, rs } = await getBuildList(this.form)
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
    // 删除
    async removeBuild(id) {
      const { code } = await removeBuild({ id })
      if (code === 200) {
        this.$message.success('删除成功')
      }
    },
  },
}
