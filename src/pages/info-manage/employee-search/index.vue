<template>
  <a-card>
    <div class="search-wrapper">
      <a-form-model :model="form" :layout="'inline'">
        <a-form-model-item label="企业">
          <a-select v-model="form.companyIdList" placeholder="请选择" style="width: 175px" allowClear mode="multiple" :maxTagCount="1">
            <a-select-option v-for="item in companyAllList" :key="item.id" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="楼宇">
          <a-select v-model="form.buildId" placeholder="请选择" style="width: 175px" allowClear>
            <a-select-option v-for="item in buildingAllList" :key="item.id" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="人才类别">
          <a-select v-model="form.abilityTypeList" placeholder="请选择" allowClear mode="multiple" :maxTagCount="1" style="width: 175px">
            <a-select-option v-for="item in abilityList" :value="item.key" :key="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="国籍">
          <a-select ref="country" v-model="form.countryList" placeholder="请选择" allowClear mode="multiple" :maxTagCount="1" :show-search="true" style="width: 175px">
            <a-select-option v-for="item in countryList" :value="item.key" :key="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="学历">
          <a-select v-model="form.educationList" placeholder="请选择" allowClear mode="multiple" :maxTagCount="1" style="width: 175px">
            <a-select-option v-for="item in educationList" :value="item.key" :key="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="性别">
          <a-select v-model="form.sex" placeholder="请选择" style="width: 175px" allowClear>
            <a-select-option v-for="item in genderList" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="是否党员">
          <a-select v-model="form.dy" placeholder="请选择" style="width: 175px" allowClear>
            <a-select-option v-for="item in whetherList" :key="item.key" :value="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="电话">
          <a-input v-model="form.phone" placeholder="请输入" allowClear style="width: 175px" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleSearch" icon="search">查询</a-button>
          <a-button style="margin-left: 10px;" @click="handleReset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => record.id" @change="handleChange" :pagination="pagination" :loading="loading">
        <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
      </a-table>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-btn {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
