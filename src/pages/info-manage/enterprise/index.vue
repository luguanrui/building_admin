<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
        <a-form-model-item label="企业名称" prop="">
          <a-input v-model="form.aa" placeholder="请输入" allowClear style="width: 120px" />
        </a-form-model-item>
        <a-form-model-item label="房产地址" prop="">
          <a-input v-model="form.aa" placeholder="请输入" allowClear style="width: 120px" />
          <!-- <a-select
            v-model="form.bb"
            placeholder="请选择"
            style="min-width: 120px"
            allowClear
          >
            <a-select-option
              v-for="item in allOriginList"
              :key="item.key"
              :value="item.key"
            >
              {{ item.value }}
            </a-select-option>
          </a-select> -->
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleSearch" icon="search">查询</a-button>
          <a-button style="margin-left: 10px;" @click="handleReset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="opreation-wrapper">
      <div>
        <a-button type="primary" @click="handleAdd">新增</a-button>
        <a-button type="primary" @click="handleExport">导出</a-button>
      </div>
      <!-- <a-popover v-model="columnsVisible" trigger="click" placement="bottomRight">
        <template slot="content">
          <a-checkbox-group v-model="checkedColumn">
            <a-row v-for="item in columnList" :key="item.value">
              <a-col :span="24">
                <a-checkbox :value="item.value">
                  {{ item.key }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
          <div style="display: flex; align-items: center; justify-content: space-between;margin-top: 10px;">
            <a-button @click="hideColumns" size="small">取消</a-button>
            <a-button type="primary" @click="handleAutoSearch" size="small">确定</a-button>
          </div>
        </template>
        <a-button type="primary">自定义列</a-button>
      </a-popover> -->
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" @change="handleChange" :pagination="pagination" :loading="loading">
        <template slot="operation" slot-scope="record">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)">修改</a-button>
          <a-button type="danger" size="small" style="margin-right: 10px" @click="handleDel(record)">删除</a-button>
        </template>
      </a-table>
    </div>
    <!-- 新增，编辑，查看 -->
    <AddUpdate ref="addUpdate" />
  </a-card>
</template>

<script src="./index"></script>

<style lang="less" scoped>
.search-wrapper {
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 20px;
}
.opreation-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-btn {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
