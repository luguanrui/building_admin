<template>
  <a-card>
    <div class="wrapper">
      <a-row>
        <a-col :span="12">
          <h3 class="title">楼宇中心</h3>
          <div class="building-list-content">
            <a-row :gutter="[24, 8]">
              <a-col :span="8" v-for="(item, index) in buildingAllList" :key="index">
                <div style="position:relative">
                  <img :src="getUrl(item)" alt="" width="100%" height="100%" />
                  <div class="modal" @click="handleToDetail(item)">{{ item.name }}</div>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="msg-wrapper">
            <div class="announcement-content">
              <h3 class="title">通知公告</h3>
              <li v-for="(item, index) in announcementList" :key="index" class="announcement-content-item">
                <div class="content" @click="handleToAnnouncement(item)">{{ item.title }}</div>
                <div class="type">{{ noticeTypeListText(item.noticeType) }}</div>
                <div class="time">{{ item.publishTime && dayjs(item.publishTime).format('YYYY年MM月DD日') }}</div>
              </li>
              <div style="text-align: right;padding-right: 10px;" v-if="announcementList.length > 10">
                <a-button type="link">更多</a-button>
              </div>
            </div>
            <div class="msg-content">
              <h3 class="title">消息中心</h3>
              <li v-for="(item, index) in msgList" :key="index" class="msg-content-item">
                <div class="number">{{ index + 1 }}</div>
                <div class="content">{{ item.title }}</div>
                <div class="name">{{ item.createUserName }}</div>
                <div class="time">{{ item.updateAt && dayjs(item.updateAt).format('YYYY年MM月DD日') }}</div>
              </li>
              <div style="text-align: right;padding-right: 35px;" v-if="msgList.length && msgList.length > 10">
                <a-button type="link" @click="handleToMsg">更多</a-button>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- 详情 -->
    <BuildInfo  ref="buildingAdd"/>
  </a-card>
</template>

<script src="./index.js"></script>
<style lang="less" scoped>
.wrapper {
  .building-list-content {
    .modal {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .msg-wrapper {
    .msg-content {
      .title {
        padding: 8px 16px;
      }
      .msg-content-item {
        display: flex;
        align-content: center;
        justify-content: center;
        padding: 4px 16px;
      }
      .number {
        width: 30px;
      }
      .content {
        cursor: pointer;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        width: 80px;
        padding-left: 20px;
      }
      .time {
        width: 150px;
      }
    }
    .announcement-content {
      .title {
        padding: 8px 16px;
      }
      .announcement-content-item {
        display: flex;
        align-content: center;
        justify-content: center;
        padding: 4px 16px;
      }
      .content {
        cursor: pointer;
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .type {
        padding-left: 20px;
        width: 80px;
      }
      .time {
        width: 150px;
      }
    }
  }
}
</style>
