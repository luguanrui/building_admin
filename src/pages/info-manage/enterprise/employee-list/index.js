import dayjs from 'dayjs'
import { getEmployeeList, removeEmployee } from '@/api/index'
import EmployeeAdd from '../employee-add/index.vue'

export default {
  components: { EmployeeAdd },
  data() {
    return {
      companyId: '',
      visible: false,
      loading: false,

      employeeList: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: 80,
          customRender: (text, record, index) => index + 1,
        },
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: '证件号码',
          dataIndex: 'cardNum',
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
  methods: {
    dayjs,
    /**
     *
     * @param {*} id 项目id
     * @param {*} disabled 是否可编辑 true不可编辑，false可编辑
     */
    handleVisible(id) {
      Object.assign(this.$data, this.$options.data())
      this.companyId = id
      this.visible = true
      // 详情/编辑
      if (this.companyId) {
        this.getEmployeeList()
      }
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },
    // 新增员工
    handleAddEmployee() {
      const params = {
        companyId: this.companyId,
        employeeId: '',
        dialogStatus: 'add',
      }
      console.log(params, 'handleAddEmployee')
      this.$refs.employeeAdd.handleVisible(params)
    },
    // 修改员工信息
    handleUpdate(record) {
      const params = {
        companyId: this.companyId,
        employeeId: record.id,
        dialogStatus: 'edit',
      }
      this.$refs.employeeAdd.handleVisible(params)
    },
    // 删除员工
    handleDel(record) {
      this.removeEmployee(record.id)
    },
    // 新增员工成功
    handleSuccess() {
      this.getEmployeeList()
    },
    // 员工列表
    async getEmployeeList() {
      this.loading = true
      try {
        const { code, rs } = await getEmployeeList({ companyId: this.companyId })
        if (code === 200) {
          this.employeeList = rs || []
        }
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    // 删除
    async removeEmployee(employeeId) {
      const params = { companyId: this.companyId, employeeId }
      const { code } = await removeEmployee(params)
      if (code === 200) {
        this.$message.success('删除员工成功')
      }
    },
  },
}
