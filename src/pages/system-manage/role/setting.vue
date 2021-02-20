<template>
  <a-drawer title="设置权限" :width="720" :visible="visible" :body-style="{ paddingBottom: '53px' }" @close="onClose" :maskClosable="false" :loading="drawerLoading">
    <div class="wrapper">
      <a-tree v-if="treeData.length" :tree-data="treeData" checkable v-model="checkedKeys" :default-expand-all="defaultExpandAll" :replaceFields="replaceFields"> </a-tree>
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
      <a-button type="primary" @click="handleSubmit" :loading="loading" :disabled="!permissionList.includes('100072')">
        保存
      </a-button>
    </div>
  </a-drawer>
</template>
<script>
import { mapState } from 'vuex'
import { getPermissionList, getMyPermission, saveMyPermission } from '@/api/user'

export default {
  data() {
    return {
      visible: false,
      drawerLoading: false,
      roleId: '',
      loading: false,
      defaultExpandAll: true, // 全部展开
      checkedKeys: [], // 选中
      treeData: [],
      replaceFields: {
        key: 'perCode',
        title: 'name',
        children: 'childList',
      },
    }
  },
  computed: {
    ...mapState('common', ['permissionList']),
  },
  methods: {
    handleVisible(roleId) {
      this.roleId = roleId
      this.visible = true
      this.getMyPermission()
      this.getPermissionList()
    },
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },
    handleSubmit() {
      this.saveMyPermission()
    },
    // 保存接口
    async saveMyPermission() {
      this.loading = true
      const params = {
        roleId: this.roleId,
        permissionCode: this.checkedKeys,
      }
      const { code } = await saveMyPermission(params)
      if (code === 200) {
        this.$message.success('保存成功')
        this.onClose()
      }
    },
    // 接口
    async getPermissionList() {
      this.drawerLoading = true
      const { code, rs } = await getPermissionList()
      if (code === 200) {
        this.treeData = rs || []
        this.drawerLoading = true
      }
    },
    // 获取当前用户的权限
    async getMyPermission() {
      const { code, rs } = await getMyPermission({ roleId: this.roleId })
      if (code === 200) {
        this.checkedKeys = rs || []
      }
    },
  },
}
</script>
