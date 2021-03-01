import { getBuildFloorOwnerList } from '@/api/index'
import AddUpdate from '@/pages/info-manage/enterprise/add-update/index.vue'

export default {
  components: { AddUpdate },
  data() {
    return {
      visible: false,
      list: [],
    }
  },
  methods: {
    handleVisible(obj) {
      // Object.assign(this.$data, this.$options.data())
      this.visible = true
      this.getBuildFloorOwnerList(obj)
    },
    // 关闭
    handleClose() {
      Object.assign(this.$data, this.$options.data())
    },
    handleDetail(item) {
      this.$refs.addUpdate.handleVisible(item.bizId, 'detail')
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
