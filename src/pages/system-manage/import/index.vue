<template>
  <a-card class="import-wrapper">
    <div class="import-header">
      <a-button type="primary" style="margin-right: 10px" @click="handleImport">导入</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" :pagination="pagination" @change="handleChange" :loading="loading">
      <template slot="operation" slot-scope="record">
        <a-button type="primary" size="small" style="margin-right: 10px" @click="handleDetail(record)">查看明细</a-button>
      </template>
    </a-table>
    <!-- 导入 -->
    <a-modal v-model="visible" title="导入数据" @ok="handleConfirmImport">
      <div class="step">
        <h5>使用模板并按照要求填写</h5>
        <p>使用导入模板，可以保证所有信息统一</p>
        <a :href="templateUrl" title="点击下载模板"><a-icon type="cloud-download" />&nbsp;&nbsp;模板下载</a>
      </div>
      <div class="step">
        <h5>请选择时间</h5>
        <a-form-model :model="form" :layout="'inline'">
          <a-form-model-item label="年度">
            <a-select v-model="form.year" placeholder="请选择" style="min-width: 120px" allowClear>
              <a-select-option v-for="item in yearList" :key="item.key" :value="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="月份">
            <a-select v-model="form.month" placeholder="请选择" style="min-width: 120px" allowClear>
              <a-select-option v-for="item in monthList" :key="item.key" :value="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="step" v-if="visible">
        <h5>上传文件</h5>
        <p>导入按照模板要求填写的Excel文件</p>
        <a-upload-dragger v-if="showUploadFile" name="file" :multiple="false" @change="handleChangeUpload" :customRequest="customRequest" :show-upload-list="false">
          <p class="ant-upload-drag-icon">
            <a-icon type="cloud-upload" />
          </p>
          <p class="ant-upload-text">
            点击或拖拽上传
          </p>
        </a-upload-dragger>
        <div class="file-content" v-else>
          <span>{{ fileName }}</span>
          <a-icon type="delete" class="delete" @click="handleRemove" />
        </div>
      </div>
    </a-modal>
  </a-card>
</template>
<script>
import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'
import { importTax, getTaxImportDetail, getTaxImportList } from '@/api/index'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [pagination],
  data() {
    return {
      visible: false,
      form: {
        year: undefined,
        month: undefined,
      },
      showUploadFile: true,
      file: '',
      fileName: '',

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
          title: '导入时间',
          dataIndex: 'createAt',
          customRender: (text, record) => dayjs(record.createAt).format('YYYY年MM月DD日'),
        },
        {
          title: '导入人',
          dataIndex: 'createUserName',
        },
        {
          title: '导入数据量',
          dataIndex: 'total',
        },
        {
          title: '导入失败量',
          dataIndex: 'fail',
        },
        {
          title: '操作',
          width: 150,
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  computed: {
    ...mapState('common', ['permissionList', 'yearList', 'monthList']),
    templateUrl() {
      return `http://115.238.32.56:8080/file/prod/test/2021-01-02/f27a500e-e9ae-4328-ba6a-95689d251a97.xlsx?sessionId=${localStorage.getItem('sessionId')}`
    },
  },
  activated() {
    this.getTaxImportList()
    this.getYearList()
  },
  mounted() {
    this.getTaxImportList()
    this.getYearList()
  },
  methods: {
    dayjs,
    ...mapActions('common', ['getYearList']),
    handleChangeUpload(info) {
      info.file.status = 'done'
      this.showUploadFile = false
    },
    customRequest(data) {
      this.fileName = data.file.name
      this.file = data.file
    },
    handleRemove() {
      this.showUploadFile = true
    },
    // 确定导入成功
    handleConfirmImport() {
      this.importTax()
    },
    // 上传
    handleImport() {
      this.visible = true
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
      this.getTaxImportList()
    },
    // 明细
    handleDetail(record) {
      this.getTaxImportDetail(record.id)
    },
    // 上传
    async importTax() {
      if (!this.form.year) {
        this.$message.error('请选择年度')
        return
      }
      if (!this.form.month) {
        this.$message.error('请选择月份')
        return
      }
      if (!this.file) {
        this.$message.error('请上传文件')
        return
      }
      let formdata = new FormData()
      formdata.append('file', this.file)
      formdata.append('year', this.form.year)
      formdata.append('month', this.form.month)
      const { code } = await importTax(formdata)
      if (code === 200) {
        this.$message.success('导入成功')
        // 初始化数据
        this.form.year = undefined
        this.form.month = undefined
        this.showUploadFile = true
        this.file = ''
        this.fileName = ''

        this.visible = false
        this.getTaxImportList()
      }
    },
    // 查看明细
    async getTaxImportDetail(id) {
      let result = await getTaxImportDetail({ importId: id })
      if (result) {
        this.downLoading = false
      }

      let blob = new Blob([result], {
        type: 'application/vnd.ms-excel,charset=UTF-8',
      })

      let fileName = `数据明细.xlsx`
      this.downFile(blob, fileName)
    },
    // 列表
    async getTaxImportList() {
      this.loading = true
      try {
        const { pageSize, current: pageNum } = this.pagination
        let params = {
          pageSize,
          pageNum,
        }
        const { code, rs } = await getTaxImportList(params)
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
    // 下载
    downFile(blob, fileName) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(link.href)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.import-wrapper {
  .import-header {
    margin-bottom: 30px;
  }
}
.step {
  margin-bottom: 20px;
  h5 {
    font-size: 14px;
  }
  p {
    font-size: 12px;
  }
}
.file-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .delete {
    color: red;
    cursor: pointer;
  }
}
</style>
