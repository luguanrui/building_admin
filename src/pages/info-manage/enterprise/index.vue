<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
        <a-form-model-item label="企业名称">
          <a-input v-model="form.companyName" placeholder="请输入" allowClear style="width: 130px" />
        </a-form-model-item>
        <a-form-model-item label="办公地址">
          <a-select v-model="form.buildId" placeholder="请选择" style="width: 120px" allowClear @change="handleChangeBuild">
            <a-select-option v-for="item in buildingAllList" :key="item.id" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <a-select v-model="form.buildType" placeholder="请选择" allowClear style="width: 90px" @change="handleChangeMain">
            <a-select-option v-for="item in buildTypeList" :value="item.key" :key="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
          <a-select v-model="form.floor" placeholder="楼层" allowClear style="width: 90px" @change="handleChangeFloor">
            <a-select-option v-for="item in buildingFloorList" :value="item" :key="item"> 第{{ item }}层 </a-select-option>
          </a-select>
          <a-select v-model="form.roomNum" placeholder="房号" allowClear style="width: 90px">
            <a-select-option v-for="item in buildingRoomList" :value="item" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleSearch" icon="search">查询</a-button>
          <a-button style="margin-left: 10px;" @click="handleReset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="opreation-wrapper">
      <div>
        <a-button type="primary" @click="handleAdd" :disabled="!permissionList.includes('100022')">新增企业基础信息</a-button>
        <a-button type="primary" @click="handleAddOther" :disabled="!permissionList.includes('100023')">新增企业其他信息</a-button>
        <a-button type="primary" @click="handleExport" :loading="downLoading" :disabled="!permissionList.includes('100025')">导出</a-button>
      </div>
    </div>
    <div class="table-wrapper">
      <a-table
        :columns="columns"
        :data-source="data"
        :rowKey="(record, index) => record.id"
        @change="handleChange"
        :pagination="pagination"
        :loading="loading"
        :row-selection="{ selectedRowKeys: selectedRowKeys,type: 'radio', onChange: onSelectChange }"
      >
        <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
        <template slot="operation" slot-scope="record">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)" :disabled="!permissionList.includes('100022')">修改</a-button>
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleOther(record)">其他信息</a-button>
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleEmployee(record)">员工列表</a-button>
          <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
            <a-button type="danger" size="small" style="margin-right: 10px" :disabled="!permissionList.includes('100024')">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <!-- 新增，编辑，查看 -->
    <AddUpdate ref="addUpdate" @handleSuccess="handleSuccess" />
    <!-- 其他信息 -->
    <OtherInfo ref="otherInfo" @handleSuccess="handleSuccess" />
    <!--员工列表 -->
    <EmployeeList ref="employeeList" @handleSuccess="handleSuccess"/>
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
