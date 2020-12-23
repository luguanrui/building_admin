import { getImgWelcomeList, getNoticeWelcomeList, getMsgList } from '@/api/index'
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      carouselList: [],
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
  activated() {
    this.getImgWelcomeList()
    this.getNoticeWelcomeList()
    this.getMsgList()
  },
  mounted() {
    this.getImgWelcomeList()
    this.getNoticeWelcomeList()
    this.getMsgList()
  },
  computed: {
    ...mapState('common', ['noticeTypeList']),
  },
  methods: {
    dayjs,
    handleEnter(index) {
      this.showInfo = index
    },
    handleLeave() {
      this.showInfo = undefined
    },
    noticeTypeListText(type) {
      let typeObj = this.noticeTypeList.find(item => item.key === type)
      if (typeObj) {
        return typeObj.value
      }
      return ''
    },
    // 消息中心
    getMessageList() {},
    // 通知公告
    getAnnouncementList() {},
    // 消息
    async getMsgList() {
      const { code, rs } = await getMsgList()
      if (code === 200) {
        console.log(rs)
        this.msgList = rs.data
      }
    },
    // 图片
    async getImgWelcomeList() {
      const { code, rs } = await getImgWelcomeList()
      if (code === 200) {
        const list = []
        rs.data.forEach(img => {
          list.push({
            imgSrc: JSON.parse(img.fileList)[0].url,
            text: img.content,
          })
        })
        this.carouselList = list
      }
    },
    // 通知公告
    async getNoticeWelcomeList() {
      const { code, rs } = await getNoticeWelcomeList()
      if (code === 200) {
        this.announcementList = rs.data
      }
    },
  },
}
