import BarItem from '../components/barItem.vue'
import AreaLine from '../components/area-line.vue'
export default {
  components: { AreaLine,BarItem },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        a: undefined,
        b: undefined,
        c: undefined,
      },
      list: [
        {
          key: 1,
          value: '政策',
        },
        {
          key: 2,
          value: '通知',
        },
      ],
      data: [
        {
          a: 100,
          b: 100,
          c: 100,
          d: 100,
        },
      ],
      loading: false,
      columns: [
        {
          title: '2017年',
          dataIndex: 'a',
          ellipsis: true,
        },
        {
          title: '2018年',
          dataIndex: 'b',
          ellipsis: true,
        },
        {
          title: '2018年',
          dataIndex: 'c',
          ellipsis: true,
        },
        {
          title: '2020年',
          dataIndex: 'd',
          ellipsis: true,
        },
      ],
      columns2: [
        {
          title: '1月',
          dataIndex: 'a',
          ellipsis: true,
        },
        {
          title: '2月',
          dataIndex: 'b',
          ellipsis: true,
        },
        {
          title: '3月',
          dataIndex: 'c',
          ellipsis: true,
        },
        {
          title: '4月',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '5月',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '6月',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '7月',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '8月',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '9月',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '10月',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '11月',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '12月',
          dataIndex: 'd',
          ellipsis: true,
        },
      ],
      columns3: [
        {
          title: '服务业（生命健康）',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）2',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）3',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）4',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）5',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）6',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）7',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）8',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）',
          dataIndex: 'd',
          ellipsis: true,
        },
        {
          title: '服务业（生命健康）',
          dataIndex: 'd',
          ellipsis: true,
        },
      ],
      columnarData: [
        { type: '2017年', value: 2 },
        { type: '2018年', value: 2 },
        { type: '2019年', value: 3 },
        { type: '2020年', value: 2 },
      ],
      columnarData2: [
        { type: '1月', value: 2 },
        { type: '2月', value: 2 },
        { type: '3月', value: 3 },
        { type: '4月', value: 2 },
        { type: '5月', value: 2 },
        { type: '6月', value: 3 },
        { type: '7月', value: 2 },
        { type: '8月', value: 2 },
        { type: '9月', value: 3 },
        { type: '10月', value: 2 },
        { type: '11月', value: 2 },
        { type: '12月', value: 3 },
      ],
      columnarData3: [
        { type: '服务业（生命健康）', value: 2 },
        { type: '服务业（生命健康）2', value: 2 },
        { type: '服务业（生命健康）3', value: 2 },
        { type: '服务业（生命健康）4', value: 2 },
        { type: '服务业（生命健康）5', value: 2 },
        { type: '服务业（生命健康）6', value: 2 },
        { type: '服务业（生命健康）7', value: 2 },
        { type: '服务业（生命健康）8', value: 2 },
        { type: '服务业（生命健康）9', value: 2 },
        { type: '服务业（生命健康）10', value: 2 },
        { type: '服务业（生命健康）11', value: 2 },
        { type: '服务业（生命健康）12', value: 2 },
      ]
    }
  },
  mounted() {},
  computed: {
    columnsTest() {
      return this.columnarData.map(item => {
        return {
          title: item.type,
          dataIndex: 'value',
          ellipsis: true
        }
      })
    }
  },
  methods: {
    onSubmit() {
      // this.getUserList();
    },
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      // this.getUserList();
    },
    // 新增
    handleAdd() {
      this.$refs.addAnnouncement.handleVisible()
    },
    // 查看
    handleDetail(record) {
      this.$refs.addAnnouncement.handleVisible('detail', record)
    },
    // 修改
    handleUpdate(record) {
      this.$refs.addAnnouncement.handleVisible('update', record)
    },
    // 新增修改成功
    handleSuccess() {
      this.onSubmit()
    },
    // 删除
    handleDel(record) {
      console.log(record)
      // this.delUser(record.userId);
      // this.getUserList();
    },
    // 发布
    handlePublish(record) {
      console.log(record)
    },

    // 添加成功之后
    addSuccess() {
      // this.getUserList();
    },
    // 列表
    // async getUserList() {
    //   this.loading = true;
    //   try {
    //     const { code, rs } = await getUserList(this.form);
    //     if (code === 200) {
    //       this.data = rs;
    //     }
    //     this.loading = false;
    //   } catch (error) {
    //     this.loading = false;
    //   }
    // },
    // // 删除
    // async delUser(userId) {
    //   const { code } = await delUser({ userId });
    //   if (code === 200) {
    //     this.$message.success("删除成功");
    //   }
    // },
  },
}
