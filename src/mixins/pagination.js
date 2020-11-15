export default {
  data() {
    return {
      pagination: {
        current: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 10,
        pageSize: 10,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第${range[0]}/${total} 页`,
      },
    };
  },
};
