<template>
  <a-drawer
    :title="title"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
    :maskClosable="false"
  >
    <div class="wrapper">
      <ProjectDetail v-if="visible" ref="projectDetail" />
    </div>
    <div
      v-if="dialogStatus !== 'detail'"
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
      <a-button type="primary" @click="handleSubmit" :loading="loading">
        保存
      </a-button>
    </div>
  </a-drawer>
</template>
<script src="./index"></script>
<style lang="less" scoped>
.title {
  border-left: 3px solid #1890ff;
  padding-left: 10px;
}
</style>
