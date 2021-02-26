<template>
  <a-card>
    <div class="opreation-wrapper">
      <a-button type="primary" @click="handleOpenSearch">综合查询</a-button>
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" @change="handleChange" :pagination="pagination" :loading="loading">
        <!-- <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
        <template slot="operation" slot-scope="record">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)" :disabled="!permissionList.includes('100042')">修改</a-button>
        </template> -->
      </a-table>
    </div>
    <a-modal v-model="visible" title="自定义查询" ok-text="搜索" cancel-text="取消" :width="700" @ok="handleSearch">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-checkbox-group>
          <a-row v-for="(key, index) in keyList" :key="index" style="width: 100%">
            <!-- 输入框 -->
            <a-form-model-item v-if="key.type === 'input'" :label="key.label">
              <a-input v-model="key.props" />
              <a-checkbox :value="key.props"></a-checkbox>
            </a-form-model-item>
            <!-- 单选 -->
            <a-form-model-item v-if="key.type === 'select'" :label="key.label">
              <a-select v-model="key.props">
                <a-select-option v-for="item in key.list" :key="item.key" :value="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-row>
        </a-checkbox-group>
      </a-form-model>
    </a-modal>
  </a-card>
</template>
<script src="./index.js"></script>
<style lang="less" scope>
.opreation-wrapper {
  text-align: right;
  margin-bottom: 20px;
}
</style>
