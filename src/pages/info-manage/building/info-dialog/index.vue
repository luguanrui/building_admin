<template>
  <a-modal v-model="visible" title="信息" :width="900" @cancel="handleClose" :maskClosable="false">
    <div v-if="list.length">
      <a-descriptions size="small" :column="2" v-for="(item, index) in list" :key="index" style="margin-bottom: 20px">
        <a-descriptions-item label="房号">
          {{ item.roomNum }}
        </a-descriptions-item>
        <a-descriptions-item label="企业名称" v-if="item.ownerType == '企业'">
          <a @click="handleDetail(item)">{{ item.name }}({{ item.ownerType }}) </a>
        </a-descriptions-item>
        <a-descriptions-item label="住户名称" v-else> {{ item.name }}({{ item.ownerType }}) </a-descriptions-item>
        <a-descriptions-item label="联系人">
          {{ item.contactName }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{ item.contactPhone }}
        </a-descriptions-item>
        <a-descriptions-item label="房屋性质">
          {{ item.roomTypeName }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div v-else style="text-align: center"><a-empty /></div>
    <template slot="footer">
      <a-button key="back" type="primary" @click="handleClose">
        关闭
      </a-button>
    </template>
    <AddUpdate ref="addUpdate" />
  </a-modal>
</template>
<script src="./index.js"></script>
