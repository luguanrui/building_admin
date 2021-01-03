<template>
  <a-card>
    <div class="building-wrapper">
      <a-row type="flex" class="building-item" v-for="build in buildHomeList" :key="build.id">
        <a-col flex="280px" style="margin-right: 30px;">
          <img :src="image" width="100%" />
          <!-- <img :src="imageParese(build.buildingPic)" alt="楼宇图片" width="100%" /> -->
        </a-col>
        <a-col flex="auto">
          <a-row style="margin-bottom: 50px">
            <h3 class="title">楼宇信息</h3>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 7, offset: 1 }"> 楼宇名称：{{ build.name }} </a-col>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 7, offset: 1 }"> 建设单位：{{ build.constructCompany }} </a-col>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 7, offset: 1 }"> 地址：{{ build.address }} </a-col>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 7, offset: 1 }"> 负责人：{{ build.contactName }} </a-col>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 7, offset: 1 }"> 联系电话：{{ build.contactPhone }} </a-col>
          </a-row>
          <a-row>
            <h3 class="title">建筑面积</h3>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 4, offset: 2 }"> 主楼：{{ build.mainArea }}&nbsp;&nbsp;平方米 </a-col>
            <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 4, offset: 2 }"> 企业：{{ build.mainCompanyArea }}&nbsp;&nbsp;平方米 </a-col>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 4, offset: 2 }"> 单身公寓：{{ build.singleApartmentArea }}&nbsp;&nbsp;平方米 </a-col>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 4, offset: 2 }"> 空置：{{ build.mainAreaLeft }}&nbsp;&nbsp;平方米 </a-col>
            <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 4, offset: 2 }"> 副楼：{{ build.viceArea }}&nbsp;&nbsp;平方米 </a-col>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 4, offset: 2 }"> 企业：{{ build.viceCompanyArea }}&nbsp;&nbsp;平方米 </a-col>
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 4, offset: 2 }"> 空置：{{ build.viceAreaLeft }}&nbsp;&nbsp;平方米 </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script src="./index"></script>
<style lang="less" scoped>
.building-wrapper {
  .building-item {
    width: 100%;
    margin-bottom: 30px;
    .title {
      color: #000;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
