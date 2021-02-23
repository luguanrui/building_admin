<template>
  <a-card>
    <div class="building-list" v-for="item in buildHomeList" :key="item.id">
      <div class="left">
        <img alt="logo" :src="imageParese(item.buildingPic)" />
      </div>
      <div class="right">
        <div>
          <h3 class="title">楼宇信息</h3>
          <a-row type="flex" justify="start" style="margin-bottom: 20px">
            <a-col :span="12">楼宇名称：{{ item.name }}</a-col>
            <a-col :span="12">建设单位：{{ item.constructCompany }}</a-col>
            <a-col :span="12">地址：{{ item.address }}</a-col>
            <a-col :span="12">负责人：{{ item.contactName }}</a-col>
            <a-col :span="12">联系电话：{{ item.contactPhone }}</a-col>
          </a-row>
        </div>
        <div>
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
              <a-statistic title="主楼空置：" :value="item.mainAreaLeft">
                <template #suffix>
                  <span>平方米</span>
                </template>
              </a-statistic>
            </a-col>
          </a-row>
          <a-row type="flex" justify="start">
            <a-col :span="6">
              <a-statistic title="裙房：" :value="item.viceArea">
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
              <a-statistic title="裙房空置：" :value="item.viceAreaLeft">
                <template #suffix>
                  <span>平方米</span>
                </template>
              </a-statistic>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" v-for="(floor, index) in item.buildFloor" :key="index" style="height: 44px;line-height: 44px">
              <a @click="handleClickFloor(floor)">第{{ floor.floor }}层（{{ floor.buildTypeName }}）</a>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <InfoDialog ref="infoDialog"/>
  </a-card>
</template>

<script src="./index"></script>
<style lang="less" scoped>
.building-list {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 20px;
  padding: 10px 0;
  .left {
    width: 300px;
    flex: 0 0 300px;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    padding: 0 20px;
  }
}
</style>
