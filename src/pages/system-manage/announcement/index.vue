<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
        <a-form-model-item label="主题名">
          <a-input v-model="form.title" placeholder="请输入" allowClear style="width: 120px" />
        </a-form-model-item>
        <a-form-model-item label="公告类型">
          <a-select v-model="form.noticeType" placeholder="请选择" style="min-width: 120px" allowClear>
            <a-select-option v-for="item in noticeTypeList" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="关键字">
          <a-input v-model="form.keyword" placeholder="请输入" allowClear style="width: 120px" />
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
        <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
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
import { mapState } from 'vuex'
import { getNoticeList, removeNotice } from '@/api/index'

export default {
  components: { AddAnnouncement },
  mixins: [pagination],
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        title: '',
        noticeType: undefined,
        keyword: '',
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
          title: '主题名',
          dataIndex: 'title',
          ellipsis: true,
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '类型',
          dataIndex: 'noticeType',
          ellipsis: true,
          customRender: (text, record) => this.noticeTypeListText(record.noticeType),
        },
        {
          title: '发布人',
          dataIndex: 'updateUserName',
          ellipsis: true,
        },
        {
          title: '发布时间',
          dataIndex: 'publishTime',
          ellipsis: true,
          customRender: (text, record) => record.publishTim && dayjs(record.publishTime).format('YYYY年MM月DD日'),
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
    this.getNoticeList()
  },
  mounted() {
    this.getNoticeList()
  },
  computed: {
    ...mapState('common', ['noticeTypeList']),
  },
  methods: {
    dayjs,
    onSubmit() {
      this.getNoticeList()
    },
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.getNoticeList()
    },
    // 新增
    handleAdd() {
      this.$refs.addAnnouncement.handleVisible()
    },
    // 查看
    handleDetail(record) {
      this.$refs.addAnnouncement.handleVisible(record.id, 'detail')
    },
    // 修改
    handleUpdate(record) {
      this.$refs.addAnnouncement.handleVisible(record.id, 'update')
    },
    // 新增修改成功
    handleSuccess() {
      this.onSubmit()
    },
    noticeTypeListText(val) {
      switch (val) {
        case 1:
          return '政策'
        case 2:
          return '通知'
        default:
          return '未知类型'
      }
    },
    // 删除
    handleDel(record) {
      this.removeNotice(record.id)
      this.getNoticeList()
    },
    // 发布
    handlePublish(record) {
      console.log(record)
    },
    // 列表
    async getNoticeList() {
      this.loading = true
      try {
        const { code, rs } = await getNoticeList(this.form)
        if (code === 200) {
          this.data = rs.data
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 删除
    async removeNotice(id) {
      const { code } = await removeNotice({ id })
      if (code === 200) {
        this.$message.success('删除成功')
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
