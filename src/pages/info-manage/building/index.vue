<template>
  <a-card>
    <a-list item-layout="vertical" size="large" :pagination="false" :data-source="buildHomeList">
      <a-list-item slot="renderItem" :key="item.id" slot-scope="item">
        <img slot="extra" width="272" alt="logo" :src="imageParese(item.buildingPic)" />
        <h3 class="title">楼宇信息</h3>
        <a-row type="flex" justify="start" style="margin-bottom: 20px">
          <a-col :span="12">楼宇名称：{{item.name}}</a-col>
          <a-col :span="12">建设单位：{{item.constructCompany}}</a-col>
          <a-col :span="12">地址：{{item.address}}</a-col>
          <a-col :span="12">负责人：{{item.contactName}}</a-col>
          <a-col :span="12">联系电话：{{item.contactPhone}}</a-col>
          <!-- <a-space :size="16">
            <a-statistic title="楼宇名称：" :value="item.name" />
            <a-statistic title="建设单位：" :value="item.constructCompany" />
            <a-statistic title="地址：" :value="item.address" />
            <a-statistic title="负责人：" :value="item.contactName" />
            <a-statistic title="联系电话：" :value="item.contactPhone" />
          </a-space> -->
        </a-row>
        <h3 class="title">建筑面积</h3>
        <a-row type="flex" justify="start" style="margin-bottom: 20px">
          <a-col :span="6">
            <a-statistic title="主楼：" :value="item.mainArea">
              <template #suffix>
                <span>平方米</span>
              </template>
            </a-statistic>
          </a-col>
          <a-col :span="6">
            <a-statistic title="企业：" :value="item.mainCompanyArea">
              <template #suffix>
                <span>平方米</span>
              </template>
            </a-statistic>
          </a-col>
          <a-col :span="6">
            <a-statistic title="单身公寓：" :value="item.singleApartmentArea">
              <template #suffix>
                <span>平方米</span>
              </template>
            </a-statistic>
          </a-col>
          <a-col :span="6">
            <a-statistic title="空置：" :value="item.mainAreaLeft">
              <template #suffix>
                <span>平方米</span>
              </template>
            </a-statistic>
          </a-col>
        </a-row>
        <a-row type="flex" justify="start">
          <a-col :span="6">
            <a-statistic title="副楼：" :value="item.viceArea">
              <template #suffix>
                <span>平方米</span>
              </template>
            </a-statistic>
          </a-col>
          <a-col :span="6">
            <a-statistic title="企业：" :value="item.viceCompanyArea">
              <template #suffix>
                <span>平方米</span>
              </template>
            </a-statistic>
          </a-col>
          <a-col :span="6">
            <a-statistic title="空置：" :value="item.viceAreaLeft">
              <template #suffix>
                <span>平方米</span>
              </template>
            </a-statistic>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script src="./index"></script>
<style lang="less" scoped></style>
