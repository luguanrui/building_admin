<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
        <a-form-model-item label="楼宇名称">
          <a-input v-model="form.buildName" placeholder="请输入" allowClear style="width: 150px" />
        </a-form-model-item>
        <a-form-model-item label="物业公司">
          <a-input v-model="form.propertyCompany" placeholder="请输入" allowClear style="width: 150px" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSubmit" icon="search">查询</a-button>
          <a-button style="margin-left: 10px;" @click="handleReset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="opreation-wrapper">
      <a-button type="primary" @click="handleAdd" :disabled="!permissionList.includes('100012')">新增</a-button>
      <a-button type="primary" :loading="downLoading" @click="handleExport" :disabled="!permissionList.includes('100015')">导出</a-button>
      <!-- <a-button type="primary">自定义查询</a-button> -->
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" :pagination="pagination" @change="handleChange" :loading="loading">
        <a slot="name" slot-scope="text,record" @click="handleDetail(record)">{{ text }}</a>
        <template slot="operation" slot-scope="record">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)" :disabled="!permissionList.includes('100012')">修改</a-button>
          <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
            <a-button type="danger" size="small" style="margin-right: 10px" :disabled="!permissionList.includes('100014')">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <!-- 新建 -->
    <BuildingAdd ref="buildingAdd" @handleSuccess="handleSuccess"/>
  </a-card>
</template>

<script src="./index"></script>

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
