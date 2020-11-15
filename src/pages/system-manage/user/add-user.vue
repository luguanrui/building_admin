<template>
  <a-drawer
    :title="type ? '修改用户' : '新增用户'"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
    :maskClosable="false"
  >
    <div class="wrapper">
      <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="用户名" prop="userName">
          <a-input v-model="form.userName" placeholder="请输入" allowClear />
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="realName">
          <a-input v-model="form.realName" placeholder="请输入" allowClear />
        </a-form-model-item>
        <a-form-model-item label="手机号码" prop="phone">
          <a-input v-model="form.phone" placeholder="请输入" allowClear :maxLength="11"/>
        </a-form-model-item>
        <a-form-model-item label="所属机构" prop="deptId">
          <a-select v-model="form.deptId" placeholder="请选择" allowClear>
            <a-select-option
              v-for="item in allOrgList"
              :key="item.key"
              :value="item.key"
            >
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="所属角色" prop="role">
          <a-select v-model="form.role" placeholder="请选择" allowClear>
            <a-select-option
              v-for="item in roleList"
              :key="item.key"
              :value="item.key"
            >
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
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
        取消
      </a-button>
      <a-button type="primary" @click="handleSubmit">
        保存
      </a-button>
    </div>
  </a-drawer>
</template>
<script>
import { addUser } from "@/api/index";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      visible: false,
      type: "",
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: {
        userName: "",
        realName: "",
        phone: "",
        deptId: undefined,
        role: undefined,
        userId: "",
      },
      rules: {
        userName: [{ required: true, message: "必填", trigger: "blur" }],
        realName: [{ required: true, message: "必填", trigger: "blur" }],
        phone: [
          { required: true, message: "必填", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "填写正确的手机号码",
            trigger: "blur",
          },
        ],
        deptId: [{ required: true, message: "必填", trigger: "blur" }],
        role: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState("common", ["allOrgList", "roleList"]),
  },
  methods: {
    ...mapActions("common", ["getAllOrgList", "getRoleList"]),
    handleVisible(user, type) {
      this.getAllOrgList();
      this.getRoleList();
      if (user) {
        const { userName, realName, phone, deptId, role, userId } = user;
        Object.assign(this.form, {
          userName,
          realName,
          phone,
          deptId,
          role,
          userId,
        });
      }
      this.type = type;
      this.visible = true;
    },
    onClose() {
      Object.assign(this.$data, this.$options.data());
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addUser();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async addUser() {
      const params = this.form;
      const { code } = await addUser(params);
      if (code === 200) {
        this.$message.success("添加成功");
        this.onClose();
        this.$emit("addSuccess");
      }
    },
  },
};
</script>
