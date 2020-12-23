<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
        <a-form-model-item label="年度">
          <a-select v-model="form.year" placeholder="请选择" style="min-width: 120px" allowClear>
            <a-select-option v-for="item in yearList" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="楼宇">
          <a-select v-model="form.buildIdList" placeholder="请选择" mode="multiple" allowClear style="width: 175px">
            <a-select-option v-for="item in buildingAllList" :value="item.id" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="行业">
          <a-select v-model="form.industryIdList" placeholder="请选择" allowClear mode="multiple" style="width: 175px">
            <a-select-option v-for="item in industryList" :value="item.key" :key="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSubmit" icon="search">查询</a-button>
          <a-button style="margin-left: 10px;" @click="handleReset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="table-wrapper">
      <div class="title-content">
        <span class="title">2017年度以来整体营收情况分析</span>
        <a-button type="primary" :loading="loading">导出</a-button>
      </div>
      <div class="table-and-chart">
        <div class="table-content">
          <a-table :columns="columnsTest" :data-source="data" :rowKey="(record, index) => index" :pagination="false"> </a-table>
        </div>
        <div class="chart-content">
          <AreaLine :data="columnarData" />
        </div>
      </div>

      <div class="title-content">
        <span class="title">按照年度营收情况分析</span>
        <a-button type="primary" :loading="loading">导出</a-button>
      </div>
      <div class="table-and-chart">
        <div class="table-content">
          <a-table :columns="columns2" :data-source="data" :rowKey="(record, index) => index" :pagination="false"> </a-table>
        </div>
        <div class="chart-content">
          <BarItem :data="columnarData2" />
        </div>
      </div>

      <div class="title-content">
        <span class="title">按照行业营收情况分析</span>
        <a-button type="primary" :loading="loading">导出</a-button>
      </div>
      <div class="table-and-chart">
        <div class="table-content">
          <a-table :columns="columns3" :data-source="data" :rowKey="(record, index) => index" :pagination="false"> </a-table>
        </div>
        <div class="chart-content">
          <BarItem :data="columnarData3" />
        </div>
      </div>
    </div>
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
.title-content {
  margin-bottom: 20px;
  .title {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    margin-right: 30px;
  }
}
.table-and-chart {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .table-content,
  .chart-content {
    padding: 0 20px;
    flex: 1;
  }
}
</style>
