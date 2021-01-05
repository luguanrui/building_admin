import { getBuildHome } from '@/api/index'

export default {
  data() {
    return {
      loading: false,
      data: [
        {
          id: 1,
          address: '11',
          company: '11',
          time: '11',
        },
      ],
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
    // 列表
    async getBuildHome() {
      const { code, rs } = await getBuildHome()
      if (code === 200) {
        this.buildHomeList = rs || []
      }
    },
  },
}
