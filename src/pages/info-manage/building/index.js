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
      form: {}
    }
  },
  methods: {
    // 列表
    // async getCaseList() {
    //   this.data = []
    //   this.loading = true
    //   try {
    //     const { pageSize, current } = this.pagination
    //     const params = { ...this.form, pageSize, pageNum: current }
    //     const { code, rs } = await getCaseList(params)
    //     if (code === 200) {
    //       this.data = rs.data
    //       this.loading = false
    //       const { pageSize, current, total } = rs
    //       if (total > pageSize) {
    //         const pageObject = { pageSize, current, total }
    //         this.pagination = _.cloneDeep(pageObject)
    //       }
    //     }
    //   } catch (error) {
    //     this.loading = false
    //     console.log(error)
    //   }
    // },
  },
}
