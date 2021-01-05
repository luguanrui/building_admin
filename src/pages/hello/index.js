import { getImgWelcomeList, getNoticeWelcomeList, getMsgList } from '@/api/index'
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      carouselList: [],
      showInfo: undefined,
      msgList: [],
      announcementList: [],
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
    sessionId() {
      return `?sessionId=${localStorage.getItem('buildSessionId')}`
    }
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
    // 通知公告
    handleToAnnouncement(item) {
      this.$router.push({
        path: 'system-manage/announcement/detail',
        query: { id: item.id },
      })
    },
    // 更多消息
    handleToMsg() {
      this.$router.push({
        path: 'system-manage/msg',
      })
    },
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
