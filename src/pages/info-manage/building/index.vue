<template>
  <a-card>
    <div class="building-wrapper">
      <div class="building-item" v-for="build in buildHomeList" :key="build.id">
        <div class="left-wrapper">
          <!-- image -->
          <img :src="imageParese(build.buildingPic)" alt="" />
          <!-- <img :src="image"/> -->
        </div>
        <div class="right-wrapper">
          <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
            <h3 class="title">楼宇信息</h3>
            <a-form-model-item label="楼宇名称">
              <span class="detail-text">{{ build.name }}</span>
            </a-form-model-item>
            <a-form-model-item label="建设单位">
              <span class="detail-text">{{ build.constructCompany }}</span>
            </a-form-model-item>
            <a-form-model-item label="地址">
              <span class="detail-text">{{ build.address }}</span>
            </a-form-model-item>
            <a-form-model-item label="负责人">
              <span class="detail-text">{{ build.contactName }}</span>
            </a-form-model-item>
            <a-form-model-item label="联系电话">
              <span class="detail-text">{{ build.contactPhone }}</span>
            </a-form-model-item>
            <h3 class="title">建筑面积</h3>
            <a-form-model-item label="主楼">
              <span class="detail-text">{{ build.mainArea }}&nbsp;&nbsp;平方米</span>
            </a-form-model-item>
            <a-form-model-item label="企业">
              <span class="detail-text">{{ build.mainCompanyArea }}&nbsp;&nbsp;平方米</span>
            </a-form-model-item>
            <a-form-model-item label="单身公寓">
              <span class="detail-text">{{ build.singleApartmentArea }}&nbsp;&nbsp;平方米</span>
            </a-form-model-item>
            <a-form-model-item label="空置">
              <span class="detail-text">{{ build.mainAreaLeft }}&nbsp;&nbsp;平方米</span>
            </a-form-model-item>
            <a-form-model-item label="副楼">
              <span class="detail-text">{{ build.viceArea }}&nbsp;&nbsp;平方米</span>
            </a-form-model-item>
            <a-form-model-item label="企业">
              <span class="detail-text">{{ build.viceCompanyArea }}&nbsp;&nbsp;平方米</span>
            </a-form-model-item>
            <a-form-model-item label="空置">
              <span class="detail-text">{{ build.viceAreaLeft }}&nbsp;&nbsp;平方米</span>
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script src="./index"></script>
<style lang="less" scoped>
.building-wrapper {
  .building-item {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    .left-wrapper {
      padding: 0 20px;
    }
    .right-wrapper {
      flex: 1;
      padding: 0 20px;
      .title {
        color: #000;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
