<template>
  <a-card>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" :pagination="pagination" @change="handleChange" :loading="loading">
        <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'
import { getMsgList } from '@/api/index'

export default {
  mixins: [pagination],
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
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
          title: '消息',
          dataIndex: 'title',
          ellipsis: true,
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '发布人',
          dataIndex: 'createUserName',
          ellipsis: true,
        },
        {
          title: '发布时间',
          dataIndex: 'publishTime',
          ellipsis: true,
          customRender: (text, record) => record.updateAt && dayjs(record.updateAt).format('YYYY年MM月DD日'),
        },
        // {
        //   title: '操作',
        //   width: 200,
        //   scopedSlots: { customRender: 'operation' },
        // },
      ],
    }
  },
  activated() {
    this.getMsgList()
  },
  mounted() {
    this.getMsgList()
  },
  methods: {
    dayjs,
    // 查看
    handleDetail(record) {
      console.log(record)
      //   this.$router.push({
      //     path: 'announcement/detail',
      //     query: { id: record.id },
      //   })
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
      this.getMsgList()
    },
    // 列表
    async getMsgList() {
      this.loading = true
      try {
        const { pageSize, current: pageNum } = this.pagination
        let params = {
          pageSize,
          pageNum,
        }
        const { code, rs } = await getMsgList(params)
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
