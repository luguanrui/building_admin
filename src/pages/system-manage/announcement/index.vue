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
      <a-button type="primary" @click="handleAdd" :disabled="!permissionList.includes('100082')">新增</a-button>
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" :pagination="pagination" @change="handleChange" :loading="loading">
        <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
        <span slot="noticeType" slot-scope="text, record">{{ noticeTypeText(record.noticeType) }}</span>
        <template slot="operation" slot-scope="record">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)" :disabled="!permissionList.includes('100082')">修改</a-button>
          <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
            <a-button type="danger" size="small" style="margin-right: 10px" :disabled="!permissionList.includes('100083')">删除</a-button>
          </a-popconfirm>
          <a-button size="small" @click="handlePublish(record)" v-if="record.isPublish === 0 && permissionList.includes('100082')">发布</a-button>
          <a-button size="small" @click="handleBack(record)" v-if="record.isPublish === 1 && permissionList.includes('100082')">撤回</a-button>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'
import { mapState } from 'vuex'
import { getNoticeList, removeNotice, publishNotice, backNotice } from '@/api/index'

export default {
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
          scopedSlots: { customRender: 'noticeType' },
        },
        {
          title: '发布人',
          dataIndex: 'publishUserName',
          ellipsis: true,
        },
        {
          title: '发布时间',
          dataIndex: 'publishTime',
          ellipsis: true,
          customRender: (text, record) => record.publishTime && dayjs(record.publishTime).format('YYYY年MM月DD日'),
        },
        {
          title: '操作',
          width: 200,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  activated() {
    this.getNoticeList()
  },
  mounted() {
    this.getNoticeList()
  },
  computed: {
    ...mapState('common', ['permissionList', 'noticeTypeList']),
  },
  methods: {
    dayjs,
    noticeTypeText(type) {
      let typeObj = this.noticeTypeList.find(item => item.key === type)
      if (typeObj) {
        return typeObj.value
      }
      return ''
    },
    onSubmit() {
      this.pagination.pageSize = 10
      this.pagination.current = 1
      this.getNoticeList()
    },
    handleReset() {
      // console.log(this.$options.data())
      Object.assign(this.$data, this.$options.data())
      this.getNoticeList()
    },
    // 新增
    handleAdd() {
      this.$router.push({ path: 'announcement/add' })
    },
    // 查看
    handleDetail(record) {
      this.$router.push({
        path: 'announcement/detail',
        query: { id: record.id },
      })
    },
    // 修改
    handleUpdate(record) {
      this.$router.push({
        path: 'announcement/update',
        query: { id: record.id },
      })
    },
    // 新增修改成功
    handleSuccess() {
      this.onSubmit()
    },
    // 删除
    handleDel(record) {
      this.removeNotice(record.id)
    },
    // 发布
    handlePublish(record) {
      this.publishNotice(record.id)
    },
    // 撤回
    handleBack(record) {
      this.backNotice(record.id)
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
      this.getNoticeList()
    },
    // 列表
    async getNoticeList() {
      this.loading = true
      try {
        const { pageSize, current: pageNum } = this.pagination
        let params = {
          pageSize,
          pageNum,
          ...this.form,
        }
        const { code, rs } = await getNoticeList(params)
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
    async removeNotice(id) {
      const { code } = await removeNotice({ id })
      if (code === 200) {
        this.$message.success('删除成功')
        this.getNoticeList()
      }
    },
    // 发布
    async publishNotice(id) {
      const { code } = await publishNotice({ id })
      if (code === 200) {
        this.$message.success('发布成功')
        this.getNoticeList()
      }
    },
    // 撤回
    async backNotice(id) {
      const { code } = await backNotice({ id })
      if (code === 200) {
        this.$message.success('发布成功')
        this.getNoticeList()
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
