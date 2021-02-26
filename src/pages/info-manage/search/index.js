import pagination from '@/mixins/pagination'

export default {
  mixins: [pagination],
  data() {
    return {
      keyList: [
        {
          title: '企业名称',
          type: 'input',
          props: 'name',
          value: undefined,
        },
        {
          label: '房产地址',
          type: 'select',
          list: [
            { key: 1, value: 'aa' },
            { key: 2, value: 'bb' },
          ],
          props: 'age',
          value: undefined,
        },
      ],
      loading: false,
      columns: [],
      data: [],

      visible: true,
      form: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
  },
  methods: {
    handleOpenSearch() {
      this.visible = true
    },
    // 分页
    handleChange(pagination) {
      Object.assign(this.pagination, pagination)
      // this.getOwnerList()
    },
    handleSearch() {
      console.log(this.form)
    },
  },
}
