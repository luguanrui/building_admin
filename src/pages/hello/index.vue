<template>
  <a-card>
    <div class="wrapper">
      <a-carousel arrows>
        <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
          <a-icon type="right-circle" />
        </div>
        <div v-for="(item, index) in carouselList" :key="index">
          <div style="height: 300px"><img :src="item.imgSrc" alt="" style="width: 100%;height: 100%"/></div>
        </div>
      </a-carousel>
      <div class="msg-wrapper">
        <div class="msg-content">
          <h3 class="title">消息中心</h3>
          <table>
            <tbody>
              <tr v-for="(item, index) in msgList" :key="index">
                <td class="number">{{ index + 1 }}</td>
                <td class="content">{{ item.content }}</td>
                <td class="name">{{ item.name }}</td>
                <td class="time">{{ item.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="announcement-content">
          <h3 class="title">通知公告</h3>
          <table>
            <tbody>
              <tr v-for="(item, index) in announcementList" :key="index">
                <td class="content">{{ item.content }}</td>
                <td class="type">{{ item.type }}</td>
                <td class="time">{{ item.time }}</td>
              </tr>
            </tbody>
          </table>
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
    td {
      padding: 6px 16px;
    }
    .number {
      width: 30px;
    }
    .content {
      cursor: pointer;
      //   width: 50px;
    }
    .name {
      width: 80px;
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
    td {
      padding: 6px 16px;
    }
    .content {
      cursor: pointer;
      //   width: 30px;
    }
    .type {
      width: 80px;
    }
    .time {
      width: 150px;
    }
  }
}

// .ant-carousel /deep/ .slick-slide {
//   text-align: center;
//   height: 160px;
//   line-height: 160px;
//   background: #364d79;
//   overflow: hidden;
// }

// .ant-carousel /deep/ .custom-slick-arrow {
//   width: 25px;
//   height: 25px;
//   font-size: 25px;
//   color: #fff;
//   background-color: rgba(31, 45, 61, 0.11);
//   opacity: 0.3;
// }
// .ant-carousel /deep/ .custom-slick-arrow:before {
//   display: none;
// }
// .ant-carousel /deep/ .custom-slick-arrow:hover {
//   opacity: 0.5;
// }

// .ant-carousel /deep/ .slick-slide h3 {
//   color: #fff;
// }
</style>
