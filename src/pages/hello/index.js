export default {
  data() {
    return {
      carouselList: [
        { imgSrc: require('./1.jpeg'), text: '内容:每张图片滚动，介绍楼宇、企业相关信息效果：滚动时只显示图片，当鼠标移上去显示介绍文字' }, 
        { imgSrc: require('./1.jpeg'), text: '11'  },
        { imgSrc: require('./1.jpeg'), text: '22'  }, 
        { imgSrc: require('./1.jpeg'), text: '33'  }],
      showInfo: undefined,
      msgList: [
        { content: 'XXX楼宇入住浙江华为有限公司', name: '张三', time: '2020年8月20日' },
        { content: 'XXX楼宇申通快递公司优惠政策即将到期', name: '张三', time: '2020年8月20日' },
        { content: 'XXX楼宇申通快递公司优惠政策即将到期', name: '张三', time: '2020年8月20日' },
        { content: 'XXX楼宇申通快递公司优惠政策即将到期', name: '张三', time: '2020年8月20日' },
        { content: 'XXX楼宇申通快递公司优惠政策即将到期', name: '张三', time: '2020年8月20日' },
        { content: 'XXX楼宇申通快递公司优惠政策即将到期', name: '张三', time: '2020年8月20日' },
      ],
      announcementList: [
        { content: 'XXX楼宇入住浙江华为有限公司', type: '通知', time: '2020年8月20日' },
        { content: '关于贷款利率调整的公告', type: '公告', time: '2020年8月20日' },
        { content: 'XXX楼宇入住浙江华为有限公司', type: '通知', time: '2020年8月20日' },
        { content: '关于贷款利率调整的公告', type: '公告', time: '2020年8月20日' },
        { content: 'XXX楼宇入住浙江华为有限公司', type: '通知', time: '2020年8月20日' },
        { content: '关于贷款利率调整的公告', type: '公告', time: '2020年8月20日' },
      ],
    }
  },
  methods: {
    handleEnter(index) {
      this.showInfo = index
    },
    handleLeave() {
      this.showInfo = undefined
    },

    // 消息中心
    getMessageList() {
      
    },
    // 通知公告
    getAnnouncementList() {},
  },
}
