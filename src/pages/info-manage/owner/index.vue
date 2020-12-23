<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
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
        <a-form-model-item label="联系人">
          <a-input v-model="form.ownerName" placeholder="请输入" allowClear style="width: 180px" />
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
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" @change="handleChange" :pagination="pagination" :loading="loading">
        <a slot="name" slot-scope="text,record" @click="handleDetail(record)">{{ text }}</a>
        <template slot="operation" slot-scope="record">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)">修改</a-button>
          <!-- <a-button type="danger" size="small" style="margin-right: 10px" @click="handleDel(record)">删除</a-button> -->
        </template>
      </a-table>
    </div>
    <!-- 新增，编辑，查看 -->
    <AddUpdate ref="addUpdate" @handleSuccess="handleSuccess"/>
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
