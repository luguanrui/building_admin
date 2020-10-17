<template>
  <a-modal
    :visible="visible"
    :width="600"
    title="项目进展情况"
    @ok="handleOk"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <div class="add-process">
      <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="项目进展情况" prop="remark">
          <a-input
            v-model="form.remark"
            placeholder="请输入"
            type="textarea"
            :rows="6"
          />
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="content-list">
      <a-table
        :columns="columns"
        :data-source="data"
        :rowKey="(record, index) => index"
        :loading="loading"
        :pagination="pagination"
        @change="handleChange"
      >
      </a-table>
    </div>
  </a-modal>
</template>
<script>
import { addProgress, getProgressList } from "@/api/common";
import _ from "lodash";

export default {
  data() {
    return {
      visible: false,
      form: {
        remark: "",
      },
      rules: {
        remark: [{ required: true, message: "必填", trigger: "change" }],
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      loading: false,
      columns: [
        {
          title: "序号",
          width: 70,
          customRender: (text, record, index) => index + 1,
        },
        {
          title: "时间",
          dataIndex: "createAt",
          key: "createAt",
          width: 190,
          ellipsis: true,
        },
        {
          title: "操作人",
          dataIndex: "createUserName",
          key: "createUserName",
          ellipsis: true,
        },
        {
          title: "项目跟进记录",
          dataIndex: "remark",
          key: "remark",
          ellipsis: true,
        },
      ],
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      },
      projectId: "",
    };
  },
  methods: {
    handleVisible(projectId) {
      this.visible = true;
      this.projectId = projectId;
      this.getProgressList();
    },
    handleCancel() {
      this.$refs.form.resetFields();
      this.visible = false;
      this.projectId = "";
    },
    handleOk() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.projectId) {
            this.addProgress();
          }else{
            this.$emit("handleAddProgress", this.form.remark);
            this.handleCancel()
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(pagination) {
      Object.assign(this.pagination, pagination);
      this.getProgressList();
    },

    // 新增
    async addProgress() {
      let params = {
        projectId: this.projectId,
        remark: this.form.remark,
      };
      const { code } = await addProgress(params);
      if (code === 200) {
        this.$message.success("进度更新成功");
        this.$emit("handleAddProgress", this.form.remark);
        this.handleCancel();
      }
    },
    // 列表
    async getProgressList() {
      this.data = [];
      this.loading = true;
      try {
        const { pageSize, current } = this.pagination;
        const params = {
          pageSize,
          pageNum: current,
          projectId: this.projectId,
        };
        const { code, rs } = await getProgressList(params);
        if (code === 200) {
          this.data = rs.data;
          this.loading = false;
          const { pageSize, current, total } = rs;
          if (total > pageSize) {
            const pageObject = { pageSize, current, total };
            this.pagination = _.cloneDeep(pageObject);
          }
          /**
           * pageSize: 10,
        current: 1,
        total: 1,
           */
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.add-process {
  border-bottom: 1px solid #dcdfe6;
}
/deep/ .ant-modal-body {
  max-height: 400px;
  overflow: auto;
}
</style>
