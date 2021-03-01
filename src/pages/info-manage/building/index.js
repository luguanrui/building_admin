import { getBuildHome, getBuildFloor } from '@/api/index'
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
      form: {},
      buildHomeList: [],
    }
  },
  activated() {
    this.getBuildHomeAndFloor()
  },
  mounted() {
    this.getBuildHomeAndFloor()
  },
  methods: {
    imageParese(urlString) {
      return `${JSON.parse(urlString)[0].url}?sessionId=${localStorage.getItem('buildSessionId')}`
    },
    handleClickFloor(buildFloor) {
      const { buildId, buildType, floor } = buildFloor
      this.$refs.infoDialog.handleVisible({ buildId, buildType, floor })
    },
    async getBuildHomeAndFloor() {
      const buildList = await this.getBuildHome()
      for (const build of buildList) {
        const floor = await this.getBuildFloor({ buildId: build.id })
        build.buildFloor = floor
      }
      this.buildHomeList = buildList
    },
    // 列表
    async getBuildHome() {
      const { code, rs } = await getBuildHome()
      if (code === 200) {
        return rs
      }
    },
    // 获取楼宇的楼层列表
    async getBuildFloor(params) {
      const { code, rs } = await getBuildFloor(params)
      if (code === 200) {
        return rs.sort((a,b)=> a.floor - b.floor)
      }
    },
  },
}
