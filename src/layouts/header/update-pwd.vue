<template>
  <a-modal
    :visible="visible"
    :width="600"
    title="修改密码"
    @ok="handleOk"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="旧密码" prop="oldPwd">
        <a-input-password
          v-model="form.oldPwd"
          placeholder="请输入"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="新密码" prop="newPwd1">
        <a-input-password
          v-model="form.newPwd1"
          placeholder="请输入"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="newPwd2">
        <a-input-password
          v-model="form.newPwd2"
          placeholder="请输入"
          allowClear
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { editPwd } from "@/api/user";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value !== this.form.newPwd1) {
        callback(new Error("两次输入密码不同"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        oldPwd: undefined,
        newPwd1: undefined,
        newPwd2: undefined,
      },
      rules: {
        oldPwd: [
          { required: true, message: "必填", trigger: "blur" },
          { min: 6, message: "密码不少有6位", trigger: "blur" },
        ],
        newPwd1: [
          { required: true, message: "必填", trigger: "blur" },
          { min: 6, message: "密码不少有6位", trigger: "blur" },
        ],
        newPwd2: [
          { required: true, message: "必填", trigger: "blur" },
          { min: 6, message: "密码不少有6位", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleVisible() {
      this.visible = true;
    },
    handleCancel() {
      Object.assign(this.$data, this.$options.data());
    },
    handleOk() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.editPwd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async editPwd() {
      const { code } = await editPwd(this.form);
      if (code === 200) {
        this.$message.success("修改成功");
        this.handleCancel();
      }
    },
  },
};
</script>
