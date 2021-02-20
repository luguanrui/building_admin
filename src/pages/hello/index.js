import { getImgWelcomeList, getNoticeWelcomeList, getMsgList } from '@/api/index'
import dayjs from 'dayjs'
import { mapState, mapActions, mapGetters } from 'vuex'
import BuildInfo from '@/pages/system-manage/building/add/index.vue'

export default {
  components: { BuildInfo },
  data() {
    return {
      current: 0,
      carouselList: [],
      showInfo: undefined,
      msgList: [],
      announcementList: [],
      msgPagination: {
        total: 0,
        pageSize: 10,
        current: 1
      },
      actPagination: {
        total: 0,
        pageSize: 10,
        current: 1
      }
    }
  },
  activated() {
    this.getImgWelcomeList()
    this.getNoticeWelcomeList()
    this.getMsgList()
    this.getBuildAllList()
  },
  mounted() {
    this.getImgWelcomeList()
    this.getNoticeWelcomeList()
    this.getMsgList()
    this.getBuildAllList()
  },
  computed: {
    ...mapGetters('account', ['user']),
    ...mapState('common', ['permissionList', 'buildingAllList', 'noticeTypeList']),
    sessionId() {
      return `?sessionId=${localStorage.getItem('buildSessionId')}`
    },
  },
  methods: {
    dayjs,
    ...mapActions('common', ['getBuildAllList']),
    afterChange(current) {
      this.current = current
    },
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
    getUrl(item) {
      return JSON.parse(item.buildingPic)[0].url + `?sessionId=${localStorage.getItem('buildSessionId')}`
    },
    handleToDetail(item) {
      if (this.user.roleLevel < 3) {
        this.$refs.buildingAdd.handleVisible(item.id, 'detail')
      }else {
        this.$Message.info("您暂无查看此楼宇信息的权限")
      }
    },
    handleChangeMsgPagination(current) {
      this.msgPagination.current = current
      this.getMsgList()
    },
    handleChangActPagination(current) {
      this.actPagination.current = current
      this.getNoticeWelcomeList()
    },
    // 消息
    async getMsgList() {
      const params = {
        pageNum: this.msgPagination.current,
        pageSize: this.msgPagination.pageSize
      }
      const { code, rs } = await getMsgList(params)
      if (code === 200) {
        this.msgList = rs.data || []
        this.msgPagination.current = rs.current
        this.msgPagination.total = rs.total
      }
    },
    // 图片
    async getImgWelcomeList() {
      const { code, rs } = await getImgWelcomeList()
      if (code === 200) {
        const list = []
        if (rs.data) {
          rs.data.forEach(img => {
            list.push({
              title: img.title,
              imgSrc: JSON.parse(img.fileList)[0].url,
              text: img.content,
            })
          })
        }
        this.carouselList = list
        if (this.carouselList.length === 1) {
          this.current = 0
        }
      }
    },
    // 通知公告
    async getNoticeWelcomeList() {
      const params = {
        pageNum: this.actPagination.current,
        pageSize: this.actPagination.pageSize
      }
      const { code, rs } = await getNoticeWelcomeList(params)
      if (code === 200) {
        this.announcementList = rs.data || []
        this.actPagination.current = rs.current
        this.actPagination.total = rs.total
      }
    },
  },
}
