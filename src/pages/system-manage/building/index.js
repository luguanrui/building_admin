import dayjs from 'dayjs'
import pagination from '@/mixins/pagination'

export default {
  mixins: [pagination],
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        a: '',
        c: '',
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
      loading: false,
      data: [
        {
          a: '疫情通知',
          b: '通知',
          c: '王小三',
          d: '2020-10-22',
        },
        {
          a: '疫情通知',
          b: '通知',
          c: '王小三',
          d: '2020-10-22',
        },
      ],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: 80,
          customRender: (text, record, index) => index + 1,
        },
        {
          title: '楼宇名称',
          dataIndex: 'a',
          ellipsis: true,
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '楼宇地址',
          dataIndex: 'b',
          ellipsis: true,
        },
        {
          title: '物业名称',
          dataIndex: 'c',
          ellipsis: true,
        },
        {
          title: '发布时间',
          dataIndex: 'd',
          ellipsis: true,
          customRender: (text, record) => dayjs(record.d).format('YYYY年MM月DD日'),
        },
        {
          title: '操作',
          width: 200,
          scopedSlots: { customRender: 'operation' },
        },
      ],
      addVisible: false,
    }
  },
  mounted() {},
  methods: {
    dayjs,
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
      console.log(record)
      // this.$refs.addAnnouncement.handleVisible('detail', record)
    },
    // 修改
    handleUpdate(record) {
      console.log(record)
      // this.$refs.addAnnouncement.handleVisible('update', record)
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
