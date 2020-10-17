<template>
  <a-modal
    :visible="visible"
    title="项目搁置"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item label="搁置原因" prop="shelveType">
        <a-select v-model="ruleForm.shelveType" placeholder="请选择">
          <a-select-option
            v-for="item in shelveReasonList"
            :value="item.key"
            :key="item.key"
            >{{ item.value }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="具体原因" prop="remark">
        <a-input
          v-model="ruleForm.remark"
          type="textarea"
          placeholder="请输入"
          :rows="8"
        />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" :loading="loading" @click="handleOk"
        >确定</a-button
      >
    </template>
  </a-modal>
</template>
<script>
import { shelveProject } from "@/api/project";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      visible: false,
      ruleForm: {
        remark: "",
        shelveType: undefined,
      },
      rules: {
        remark: [{ required: true, message: "必填", trigger: "change" }],
      },
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      loading: false,
      projectId: "",
    };
  },
  computed: {
    ...mapState("common", ["shelveReasonList"]),
  },
  methods: {
    ...mapActions("common", ["getShelveReason"]),
    handleVisible(id) {
      this.getShelveReason();
      this.projectId = id;
      this.visible = true;
    },
    handleCancel() {
      this.$refs.ruleForm.resetFields();
      this.visible = false;
    },
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.shelveProject();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 搁置
    async shelveProject() {
      this.loading = true;
      const params = {
        projectId: this.projectId,
        ...this.ruleForm,
      };
      try {
        const { code } = await shelveProject(params);
        if (code === 200) {
          this.$message.success("项目搁置成功！");
        }
        this.loading = false;
        this.handleCancel();
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="less" scoped></style>
