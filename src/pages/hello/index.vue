<template>
  <a-card>
    <div class="wrapper">
      <a-carousel arrows autoplay>
        <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
          <a-icon type="left" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
          <a-icon type="right" />
        </div>
        <div v-for="(item, index) in carouselList" :key="index">
          <div class="carousel-item" @mouseenter="handleEnter(index)" @mouseleave="handleLeave(index)">
            <img :src="item.imgSrc" alt="" />
            <div class="hover-content" v-if="showInfo === index">
              <pre>{{ item.text }}</pre>
            </div>
          </div>
        </div>
      </a-carousel>
      <div class="msg-wrapper">
        <div class="msg-content">
          <h3 class="title">消息中心</h3>
          <li v-for="(item, index) in msgList" :key="index" class="msg-content-item">
            <div class="number">{{ index + 1 }}</div>
            <div class="content">{{ item.title }}</div>
            <div class="name">{{ item.createUserName }}</div>
            <div class="time">{{ item.updateAt && dayjs(item.updateAt).format('YYYY年MM月DD日') }}</div>
          </li>
          <div style="text-align: right;padding-right: 35px;">
            <a-button type="link">更多</a-button>
          </div>
        </div>
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
      </div>
    </div>
  </a-card>
</template>

<script src="./index.js"></script>
<style lang="less" scoped>
.msg-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  .msg-content {
    flex: 1;
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
    flex: 1;
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

.ant-carousel /deep/ .custom-slick-arrow {
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel /deep/ .custom-slick-arrow:before {
  display: none;
}
.ant-carousel /deep/ .custom-slick-arrow:hover {
  opacity: 0.5;
}
.carousel-item {
  height: 350px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hover-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    padding: 10px 50px;
  }
}
</style>
