export function clueData() {
  return [
    {
      type: 'input',
      props: {
        title: '初建项目名称',
        key: 'showName',
        value: '',
        placeholder: '请输入',
        allowClear: true,
      },
      labelCol: {
        span: 8,
      },
    },
    {
      type: 'select',
      listKey: 'industryList',
      props: {
        title: '产业类别',
        key: 'industryTypeList',
        value: undefined,
        placeholder: '请选择',
        allowClear: true,
      },
      labelCol: {
        span: 8,
      },
    },
    {
      type: 'input',
      props: {
        title: '投资方名称',
        key: 'investName',
        value: '',
        placeholder: '请输入',
        allowClear: true,
      },
      labelCol: {
        span: 8,
      },
    },
    {
      type: 'input',
      props: {
        title: '责任单位',
        key: 'areaIdList',
        value: '',
        placeholder: '请输入',
        allowClear: true,
      },
      labelCol: {
        span: 8,
      },
    },
    {
      type: 'select',
      listKey: 'cooperateList',
      props: {
        title: '项目类别',
        key: 'cooperate',
        value: undefined,
        placeholder: '请选择',
        allowClear: true,
      },
      labelCol: {
        span: 8,
      },
    },
    {
      type: 'select',
      listKey: 'investMoneyTypeList',
      props: {
        title: '总投资',
        key: 'investMoneyType',
        value: undefined,
        placeholder: '请选择',
        allowClear: true,
      },
      labelCol: {
        span: 8,
      },
    },
    {
      type: 'time',
      props: {
        title: '创建时间',
        key: 'createTime',
        value: [],
        placeholder: '请选择',
        allowClear: true,
      },
      labelCol: {
        span: 8,
      },
    },
    {
      type: 'select',
      listKey: 'whetherList',
      props: {
        title: '是否有引荐人',
        key: 'hasRec',
        value: undefined,
        placeholder: '请选择',
        allowClear: true,
      },
      labelCol: {
        span: 8,
      },
    },
    {
      type: 'input',
      props: {
        title: '引荐人',
        key: 'recName',
        value: '',
        placeholder: '请输入',
        allowClear: true,
      },
      labelCol: {
        span: 8,
      },
    },
  ]
}
