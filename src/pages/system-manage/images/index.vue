<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
        <a-form-model-item label="主题名">
          <a-input v-model="form.a" placeholder="请输入" allowClear style="width: 120px" />
        </a-form-model-item>
        <a-form-model-item label="关键字">
          <a-input v-model="form.c" placeholder="请输入" allowClear style="width: 120px" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSubmit" icon="search">查询</a-button>
          <a-button style="margin-left: 10px;" @click="handleReset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="opreation-wrapper">
      <a-button type="primary" @click="handleAdd">新增</a-button>
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" :pagination="pagination" :loading="loading">
        <a slot="name" slot-scope="text" @click="handleDetail(record)">{{ text }}</a>
        <template slot="operation" slot-scope="record">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)">修改</a-button>
          <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
            <a-button type="danger" size="small" style="margin-right: 10px">删除</a-button>
          </a-popconfirm>
          <a-button size="small" @click="handlePublish(record)">发布</a-button>
        </template>
      </a-table>
    </div>
    <!-- 新增修改公告 -->
    <AddAnnouncement ref="addAnnouncement" @handleSuccess="handleSuccess" />
  </a-card>
</template>

<script>
import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'
import AddAnnouncement from './add.vue'

export default {
  components: { AddAnnouncement },
  mixins: [pagination],
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        a: '',
        c: '',
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
      data: [
        {
          a: '疫情通知',
          b: '通知',
          c: '王小三',
          d: '2020-10-22',
        },
           {
          a: '疫情通知',
          b: '通知',
          c: '王小三',
          d: '2020-10-22',
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
          title: '主题名',
          dataIndex: 'a',
          ellipsis: true,
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '发布人',
          dataIndex: 'c',
          ellipsis: true,
        },
        {
          title: '发布时间',
          dataIndex: 'd',
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
  mounted() {
    
  },
  methods: {
    dayjs,
    onSubmit() {
      // this.getUserList();
    },
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      // this.getUserList();
    },
    // 新增
    handleAdd() {
      this.$refs.addAnnouncement.handleVisible()
    },
    // 查看
    handleDetail(record) {
      this.$refs.addAnnouncement.handleVisible('detail', record)
    },
    // 修改
    handleUpdate(record) {
      this.$refs.addAnnouncement.handleVisible('update', record)
    },
    // 新增修改成功
    handleSuccess() {
      this.onSubmit()
    },
    // 删除
    handleDel(record) {
      console.log(record)
      // this.delUser(record.userId);
      // this.getUserList();
    },
    // 发布
    handlePublish(record) {
      console.log(record)
    },

    // 添加成功之后
    addSuccess() {
      // this.getUserList();
    },
    // 列表
    // async getUserList() {
    //   this.loading = true;
    //   try {
    //     const { code, rs } = await getUserList(this.form);
    //     if (code === 200) {
    //       this.data = rs;
    //     }
    //     this.loading = false;
    //   } catch (error) {
    //     this.loading = false;
    //   }
    // },
    // // 删除
    // async delUser(userId) {
    //   const { code } = await delUser({ userId });
    //   if (code === 200) {
    //     this.$message.success("删除成功");
    //   }
    // },
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
