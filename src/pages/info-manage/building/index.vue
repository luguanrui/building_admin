<template>
  <a-card>
    <div class="building-wrapper">
      <div class="left-wrapper">
        <img :src="image" alt="" />
      </div>
      <div class="right-wrapper">
        <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <h3 class="title">楼宇信息</h3>
          <a-form-model-item label="楼宇名称" prop="name">
            <span class="detail-text">物业公司</span>
          </a-form-model-item>
          <a-form-model-item label="建设单位" prop="name">
            <span class="detail-text">浙江省中天</span>
          </a-form-model-item>
          <a-form-model-item label="地址" prop="name">
            <span class="detail-text">桐庐县迎春南路28号</span>
          </a-form-model-item>
          <a-form-model-item label="负责人" prop="name">
            <span class="detail-text">王肖二</span>
          </a-form-model-item>
          <a-form-model-item label="联系电话" prop="name">
            <span class="detail-text">0571-88993456</span>
          </a-form-model-item>
          <h3 class="title">建筑面积</h3>
          <a-form-model-item label="主楼" prop="name">
            <span class="detail-text">4530.32平方米</span>
          </a-form-model-item>
          <a-form-model-item label="企业" prop="name">
            <span class="detail-text">3210平方米</span>
          </a-form-model-item>
          <a-form-model-item label="单身公寓" prop="name">
            <span class="detail-text">3210平方米</span>
          </a-form-model-item>
          <a-form-model-item label="空置" prop="name">
            <span class="detail-text">3210平方米</span>
          </a-form-model-item>
          <a-form-model-item label="副楼" prop="name">
            <span class="detail-text">3210平方米</span>
          </a-form-model-item>
          <a-form-model-item label="企业" prop="name">
            <span class="detail-text">3210平方米</span>
          </a-form-model-item>
          <a-form-model-item label="空置" prop="name">
            <span class="detail-text">3210平方米</span>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </a-card>
</template>

<script src="./index"></script>
<style lang="less" scoped>
.building-wrapper {
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
</style>
