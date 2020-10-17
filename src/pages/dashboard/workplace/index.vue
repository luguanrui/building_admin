<template>
  <div class="wrapper">
    <div class="left">
      <div
        class="item"
        v-for="(item, index) in prol"
        :key="index"
        @click="handleToUrl(item.link)"
      >
        <div class="item-name">
          <div class="item-name-title">{{ item.name }}</div>
          <div v-if="index < 5">
            <a-icon type="arrow-down" style="color: #fff" />
          </div>
        </div>
        <div class="item-chart" style="width: 100px;height: 100px">
          <ProgressItem :name="item.name" :value="item.value" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-content" v-if="todoList.length">
        <h2 class="title">待办中心</h2>
        <div
          v-for="(item, index) in todoList"
          :key="index"
          @click="handleDetail(item)"
        >
          <a-row class="wait-do">
            <a-col :span="1" class="index">
              {{ index + 1 }}
            </a-col>
            <a-col :span="10" class="content">
              {{ item.showName }} {{ item.projectStatusDesc }}
            </a-col>
            <a-col :span="6" class="name">
              {{ item.createUserName }}
            </a-col>
            <a-col :span="6" class="time">
              {{ dayjs(item.createTime).format("YYYY-MM-DD") }}
            </a-col>
          </a-row>
        </div>
        <div style="text-align: right;">
          <a-pagination v-bind="pagination" size="small" :item-render="itemRender" @change="handlePagination"/>
        </div>
      </div>
      <div class="right-content">
        <h2 class="title">线索项目排行榜-各乡镇</h2>
        <!-- <caseCountByArea :data="caseCountByArea" /> -->
        <ProjectRank :data="caseCountByArea" />
      </div>
      <div class="right-content">
        <h2 class="title">线索项目排行榜-各驻点分队</h2>
        <!-- <caseCountByOutTeam :data="caseCountByOutTeam" /> -->
        <ProjectRank :data="caseCountByOutTeam" />
      </div>
      <div class="right-content">
        <h2 class="title">签约项目排行榜</h2>
        <ProjectRank :data="signRankList" />
      </div>
      <div class="right-content">
        <h2 class="title">落地项目排行榜</h2>
        <ProjectRank :data="downRankList" />
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less" scoped>
.wrapper {
  background-color: #000e31;
  background-repeat: no-repeat;
  background-position: 100% bottom;
  background-image: url(./bg.png);
  padding: 20px 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  // align-items: center;
  justify-content: center;
  .left {
    // float: left;
    // width: 250px;
    // height: 100%;
    flex: 1;
    padding: 0 10px;
    border-right: 1px solid #ccc;
    .item {
      display: flex;
      text-align: center;
      cursor: pointer;
      .item-name {
        flex: 1;
      }
      .item-chart {
        flex: 1;
      }
      .item-name-title {
        // width: 100px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        height: 80px;
        line-height: 80px;
        padding: 0 10px;
      }
    }
  }
  .right {
    flex: 1;
    // height: 100%;
    // margin-left: 250px;
    padding: 0 20px;
    // overflow: auto;
    .right-content {
      margin-bottom: 30px;
      .title {
        color: #fff;
        margin-bottom: 20px;
      }
      .wait-do {
        display: block;
        color: #fff;
        cursor: pointer;
        margin-bottom: 10px;
        .content {
          padding: 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .name,
        .time {
          text-align: right;
        }
      }
      /deep/ .ant-pagination-item a {
        color: #fff;
      }
      /deep/ .ant-pagination-item-active {
        color: #fff;
        background: none;
        border-color: none;
      }
    }
  }
}
/deep/ .ant-pagination-prev a,
.ant-pagination-next a {
  color: #fff;
}
</style>
