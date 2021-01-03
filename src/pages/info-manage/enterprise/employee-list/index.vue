<template>
  <a-drawer title="员工列表" :width="800" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
      <a-row>
        <a-col :span="24">
          <h3 class="title">
            <span style="margin-right: 50px">入驻企业员工信息列表</span>
            <a-button type="primary" @click="handleAddEmployee">增加员工</a-button>
          </h3>
        </a-col>
        <a-col :span="24">
          <a-table :columns="columns" :data-source="employeeList" :rowKey="(record, index) => index" :pagination="false">
            <template slot="operation" slot-scope="text, record">
              <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)">修改</a-button>
              <a-button type="danger" size="small" style="margin-right: 10px" @click="handleDel(record)">删除</a-button>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        关闭
      </a-button>
    </div>
    <!-- 员工 -->
    <EmployeeAdd ref="employeeAdd" @handleSuccess="handleSuccess" />
  </a-drawer>
</template>
<script src="./index"></script>
<style lang="less" scoped>
.title {
  border-left: 3px solid #1890ff;
  padding-left: 10px;
  margin: 20px 0;
}
/deep/ .ant-form-item {
  display: flex;
  .ant-form-explain {
    display: none;
  }
}

/deep/ .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
