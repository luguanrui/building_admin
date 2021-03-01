<template>
  <a-card>
    <div class="building-list-content">
      <a-row :gutter="[24, 8]">
        <a-col :span="8" v-for="(item, index) in buildPermissionList" :key="index">
          <a-card hoverable @click="handleDetail(item)">
            <img slot="cover" alt="example" :src="getUrl(item)" />
            <a-card-meta :title="item.name"></a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-modal v-model="visible" title="详情" :width="900" @cancel="handleClose" :maskClosable="false">
      <div class="building-list">
        <!-- <div class="left">
          <img alt="logo" :src="imageParese(buildHome.buildingPic)" />
        </div> -->
        <div class="right">
          <div>
            <h3 class="title">楼宇信息</h3>
            <a-row type="flex" justify="start" style="margin-bottom: 20px">
              <a-col :span="12">楼宇名称：{{ buildHome.name }}</a-col>
              <a-col :span="12">建设单位：{{ buildHome.constructCompany }}</a-col>
              <a-col :span="12">地址：{{ buildHome.address }}</a-col>
              <a-col :span="12">负责人：{{ buildHome.contactName }}</a-col>
              <a-col :span="12">联系电话：{{ buildHome.contactPhone }}</a-col>
            </a-row>
          </div>
          <div>
            <h3 class="title">建筑面积</h3>
            <a-row type="flex" justify="start" style="margin-bottom: 20px">
              <a-col :span="6">
                <a-statistic title="主楼：" :value="buildHome.mainArea">
                  <template #suffix>
                    <span>平方米</span>
                  </template>
                </a-statistic>
              </a-col>
              <a-col :span="6">
                <a-statistic title="企业：" :value="buildHome.mainCompanyArea">
                  <template #suffix>
                    <span>平方米</span>
                  </template>
                </a-statistic>
              </a-col>
              <a-col :span="6">
                <a-statistic title="单身公寓：" :value="buildHome.singleApartmentArea">
                  <template #suffix>
                    <span>平方米</span>
                  </template>
                </a-statistic>
              </a-col>
              <a-col :span="6">
                <a-statistic title="主楼空置：" :value="buildHome.mainAreaLeft">
                  <template #suffix>
                    <span>平方米</span>
                  </template>
                </a-statistic>
              </a-col>
            </a-row>
            <a-row type="flex" justify="start">
              <a-col :span="6">
                <a-statistic title="裙房：" :value="buildHome.viceArea">
                  <template #suffix>
                    <span>平方米</span>
                  </template>
                </a-statistic>
              </a-col>
              <a-col :span="6">
                <a-statistic title="企业：" :value="buildHome.viceCompanyArea">
                  <template #suffix>
                    <span>平方米</span>
                  </template>
                </a-statistic>
              </a-col>
              <a-col :span="6">
                <a-statistic title="裙房空置：" :value="buildHome.viceAreaLeft">
                  <template #suffix>
                    <span>平方米</span>
                  </template>
                </a-statistic>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6" v-for="(floor, index) in buildHome.buildFloor" :key="index" style="height: 44px;line-height: 44px">
                <a @click="handleClickFloor(floor)">第{{ floor.floor }}层（{{ floor.buildTypeName }}）</a>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" type="primary" @click="handleClose">
          关闭
        </a-button>
      </template>
    </a-modal>
    <InfoDialog ref="infoDialog" />
  </a-card>
</template>

<script src="./index"></script>
<style lang="less" scoped>
.building-list {
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
