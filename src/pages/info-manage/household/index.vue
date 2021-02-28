<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
        <a-form-model-item label="姓名">
          <a-input v-model="form.houseUserName" placeholder="请输入" allowClear style="width: 180px" />
        </a-form-model-item>
        <a-form-model-item label="联系电话">
          <a-input v-model="form.houseUserPhone" placeholder="请输入" allowClear style="width: 175px" />
        </a-form-model-item>
        <a-form-model-item label="性别">
          <a-select v-model="form.houseUserSex" placeholder="请选择" style="width: 175px" allowClear>
            <a-select-option v-for="item in genderList" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="年龄">
          <a-input-number v-model="form.minAge" :min="1" :max="100" placeholder="请输入" />&nbsp;&nbsp;-
          <a-input-number v-model="form.maxAge" :min="1" :max="100" placeholder="请输入" />
        </a-form-model-item>
        <a-form-model-item label="籍贯">
          <a-cascader
            placeholder="请选择"
            allowClear
            v-model="form.houseUserProvinceCityArea"
            :options="regionList"
            :field-names="{ label: 'name', value: 'id', children: 'childList' }"
          />
        </a-form-model-item>
        <a-form-model-item label="民族">
          <a-select v-model="form.houseUserNation" placeholder="请选择" allowClear style="width: 180px">
            <a-select-option v-for="item in nationList" :value="item.key" :key="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="身份证">
          <a-input v-model="form.houseUserIdNum" placeholder="请输入" allowClear style="width: 180px" />
        </a-form-model-item>
        <a-form-model-item label="地址">
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
        <a-button type="primary" @click="handleAdd" :disabled="!permissionList.includes('100032')">新增</a-button>
        <a-button type="primary" @click="handleExport" :loading="downLoading" :disabled="!permissionList.includes('100033')">导出</a-button>
      </div>
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => record.houseUserId" @change="handleChange" :pagination="pagination" :loading="loading">
        <a slot="buildAddress" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
        <template slot="operation" slot-scope="record">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)" :disabled="!permissionList.includes('100032')">修改</a-button>
          <!-- <a-button type="danger" size="small" style="margin-right: 10px" @click="handleDel(record)">删除</a-button> -->
        </template>
      </a-table>
    </div>
    <!-- 新增，编辑，查看 -->
    <AddUpdate ref="addUpdate" @handleSuccess="handleSuccess" />
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
