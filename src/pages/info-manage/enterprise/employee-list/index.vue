<template>
  <a-drawer title="员工列表" :width="800" :visible="visible" :body-style="{ paddingBottom: '53px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
      <a-row>
        <a-col :span="24">
          <h3 class="title">
            <span style="margin-right: 50px">入驻企业员工信息列表</span>
            <a-button type="primary" @click="handleAddEmployee" :disabled="!permissionList.includes('100026')">增加员工</a-button>
          </h3>
        </a-col>
        <a-col :span="24">
          <a-table :columns="columns" :data-source="employeeList" :rowKey="(record, index) => index" :pagination="false">
            <template slot="operation" slot-scope="text, record">
              <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)" :disabled="!permissionList.includes('100026')">修改</a-button>
              <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
                <a-button type="danger" size="small" style="margin-right: 10px" :disabled="!permissionList.includes('100027')">删除</a-button>
              </a-popconfirm>
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
  margin: 2px 0;
}
/deep/ .ant-form-item {
  display: flex;
}

/deep/ .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
