<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
        <a-form-model-item label="用户名">
          <a-input v-model="form.userName" placeholder="请输入" allowClear style="width: 120px" />
        </a-form-model-item>
        <!-- <a-form-model-item label="所属机构">
          <a-select v-model="form.deptId" placeholder="请选择" style="min-width: 120px" allowClear>
            <a-select-option v-for="item in allOrgList" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item> -->
        <a-form-model-item label="姓名">
          <a-input v-model="form.realName" placeholder="请输入" allowClear style="width: 120px" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSubmit" icon="search">查询</a-button>
          <a-button style="margin-left: 10px;" @click="handleReset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="opreation-wrapper">
      <a-button type="primary" @click="handleAdd" :disabled="!permissionList.includes('100063')">新增</a-button>
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" :pagination="false" :loading="loading">
        <template slot="operation" slot-scope="record, text" @click="handleRecord(text)">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)" :disabled="!permissionList.includes('100063')">修改</a-button>
          <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
            <a-button type="danger" size="small" style="margin-right: 10px" :disabled="!permissionList.includes('100064')">删除</a-button>
          </a-popconfirm>
          <a-button size="small" @click="handleResetPwd(record)">重置密码</a-button>
        </template>
      </a-table>
    </div>
    <AddUser ref="addUser" @addSuccess="addSuccess" />
  </a-card>
</template>

<script>
import { mapState } from 'vuex'
import AddUser from './add-user.vue'
import { getUserList, delUser, resetPwd } from '@/api/index'

export default {
  components: { AddUser },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        userName: '',
        deptId: undefined,
        realName: '',
      },
      loading: false,
      data: [],
      columns: [
        {
          title: '用户名',
          dataIndex: 'userName',
          key: 'userName',
          ellipsis: true,
        },
        {
          title: '姓名',
          dataIndex: 'realName',
          key: 'realName',
          ellipsis: true,
        },
        {
          title: '角色名称',
          dataIndex: 'roleName',
          key: 'roleName',
          ellipsis: true,
        },
        {
          title: '所属企业',
          dataIndex: 'companyName',
          key: 'companyName',
          ellipsis: true,
        },
        {
          title: '联系方式',
          dataIndex: 'phone',
          key: 'phone',
          ellipsis: true,
        },
        {
          title: '操作',
          width: 250,
          scopedSlots: { customRender: 'operation' },
        },
      ],
      addVisible: false,
    }
  },
  computed: {
    ...mapState('common', ['permissionList']),
  },
  activated() {
    this.getUserList()
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    onSubmit() {
      this.getUserList()
    },
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.getUserList()
    },
    // 新增
    handleAdd() {
      this.addVisible = true
      this.$refs.addUser.handleVisible()
    },
    // 修改
    handleUpdate(record) {
      this.$refs.addUser.handleVisible(record, 'edit')
    },

    // 删除
    handleDel(record) {
      this.delUser(record.userId)
      this.getUserList()
    },

    // 重置密码
    handleResetPwd(record) {
      this.resetPwd(record.userId)
    },
    // 添加成功之后
    addSuccess() {
      this.getUserList()
    },
    // 列表
    async getUserList() {
      this.loading = true
      try {
        const { code, rs } = await getUserList(this.form)
        if (code === 200) {
          this.data = rs
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 删除
    async delUser(userId) {
      const { code } = await delUser({ userId })
      if (code === 200) {
        this.$message.success('删除成功')
      }
    },
    // 重置密码
    async resetPwd(userId) {
      const { code } = await resetPwd({ userId })
      if (code === 200) {
        this.$message.success('重置密码成功')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.search-wrapper {
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 20px;
}
.opreation-wrapper {
  .ant-btn {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
