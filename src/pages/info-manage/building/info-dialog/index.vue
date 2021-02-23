<template>
  <a-modal v-model="visible" title="信息" :width="900" @cancel="handleClose">
    <a-descriptions size="small" :column="2" v-for="(item, index) in list" :key="index" style="margin-bottom: 20px">
      <a-descriptions-item label="房号">
        {{ item.roomNum }}
      </a-descriptions-item>
      <a-descriptions-item label="企业名称/住户名称"> {{ item.name }}({{ item.ownerType }}) </a-descriptions-item>
      <a-descriptions-item label="联系人">
        {{ item.contactName }}
      </a-descriptions-item>
      <a-descriptions-item label="联系电话">
        <a>{{ item.contactPhone }}</a>
      </a-descriptions-item>
      <a-descriptions-item label="房屋性质">
        {{ item.roomTypeName }}
      </a-descriptions-item>
    </a-descriptions>
    <template slot="footer">
      <a-button key="back" type="primary" @click="handleClose">
        关闭
      </a-button>
    </template>
  </a-modal>
</template>
<script src="./index.js"></script>
