import { getBuildHomeBuildList, getBuildHome, getBuildFloor } from '@/api/index'
import InfoDialog from './info-dialog/index.vue'

export default {
  components: { InfoDialog },
  data() {
    return {
      loading: false,
      data: [],
      image: require('@/pages/login/images/bg_copy.png'),
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      buildPermissionList: [],
      visible: false,
      buildHome: {}
    }
  },
  activated() {
    this.getBuildHomeBuildList()
  },
  mounted() {
    this.getBuildHomeBuildList()
  },
  methods: {
    getUrl(item) {
      return JSON.parse(item.buildingPic)[0].url + `?sessionId=${localStorage.getItem('buildSessionId')}`
    },
    handleClose() {
      this.visible = false
    },
    handleDetail(item) {
      this.getBuildHomeAndFloor({id: item.id})
    },
    imageParese(urlString) {
      return `${JSON.parse(urlString)[0].url}?sessionId=${localStorage.getItem('buildSessionId')}`
    },
    handleClickFloor(buildFloor) {
      const { buildId, buildType, floor } = buildFloor
      this.$refs.infoDialog.handleVisible({ buildId, buildType, floor })
    },
    async getBuildHomeAndFloor(params) {
      const build = await this.getBuildHome(params)
      const floor = await this.getBuildFloor({ buildId: build.id })
      build.buildFloor = floor
      // for (const build of buildList) {
      //   const floor = await this.getBuildFloor({ buildId: build.id })
      //   build.buildFloor = floor
      // }
      this.buildHome = build
    },
    // 列表
    async getBuildHomeBuildList() {
      const { code, rs } = await getBuildHomeBuildList()
      if (code === 200) {
        this.buildPermissionList = rs
      }
    },
    // 详情
    async getBuildHome(params) {
      this.visible = true
      const { code, rs } = await getBuildHome(params)
      if (code === 200) {
        return rs
      }
    },
    // 获取楼宇的楼层列表
    async getBuildFloor(params) {
      const { code, rs } = await getBuildFloor(params)
      if (code === 200) {
        return rs.sort((a, b) => a.floor - b.floor)
      }
    },
  },
}
