import { getBuildFloorOwnerList } from '@/api/index'

export default {
  data() {
    return {
      visible: false,
      list: []
    }
  },
  methods: {
    handleVisible(obj) {
      Object.assign(this.$data, this.$options.data())
      this.visible = true
      this.getBuildFloorOwnerList(obj)
    },
    // 关闭
    handleClose() {
      Object.assign(this.$data, this.$options.data())
    },
    // 获取楼宇楼层的住户-企业列表
    async getBuildFloorOwnerList(params) {
      const { code, rs } = await getBuildFloorOwnerList(params)
      if (code === 200) {
        this.list = rs
      }
    },
  },
}
