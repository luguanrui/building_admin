import { getBuildHome, getBuildFloor, getBuildFloorOwnerList } from '@/api/index'

export default {
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
    this.getBuildHome()
  },
  mounted() {
    this.getBuildHome()
  },
  methods: {
    imageParese(urlString) {
      return `${JSON.parse(urlString)[0].url}?sessionId=${localStorage.getItem('buildSessionId')}`
    },
    handleClickFloor(buildFloor) {
      console.log(buildFloor, 'buildFloor')
      // const { buildId, buildType, floor } = buildFloor
      // this.getBuildFloorOwnerList({ buildId, buildType, floor })
    },
    // 列表
    async getBuildHome() {
      const { code, rs } = await getBuildHome()
      if (code === 200) {
        // if (rs || rs.length) {
        //   rs.forEach(build => {
        //     // 获取楼宇的楼层列表
        //     this.getBuildFloor({ buildId: build.id }).then(res => {
        //       console.log(res,'res')
        //     })
        //     // build.buildFloor = buildFloor
        //     console.log('buildFloor')
        //   })
        // }
        this.buildHomeList = rs || []
        console.log(this.buildHomeList, 'this.buildHomeList')
      }
    },
    // 获取楼宇的楼层列表
    async getBuildFloor(params) {
      const { code, rs } = await getBuildFloor(params)
      if (code === 200) {
        console.log(rs, 'rs')
        return rs
        // this.buildHomeList = rs || []
      }
    },
    // 获取楼宇楼层的住户-企业列表
    async getBuildFloorOwnerList(params) {
      const { code, rs } = await getBuildFloorOwnerList(params)
      if (code === 200) {
        console.log(rs, 'rs')
        // this.buildHomeList = rs || []
      }
    },
  },
}
