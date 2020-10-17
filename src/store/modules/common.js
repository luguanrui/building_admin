// import {
//   getIndustryList,
//   getConstructionList,
//   getShelveReason,
//   getAllOrgList,
//   getRoleList,
//   getPermissionAreaList,
// } from "@/api/index";
export default {
  namespaced: true,
  state: {
    // 是否
    whetherList: [
      { key: 1, value: "是" },
      { key: 0, value: "否" },
    ],
    // 审核意见列表
    resultList: [
      { key: 1, value: "通过" },
      { key: 0, value: "不通过" },
    ],
    // 万元/美元列表
    moneyTypeList: [
      { key: 0, value: "万元" },
      { key: 1, value: "美元" },
    ],
    // 项目类别列表
    cooperateList: [
      { key: 0, value: "自建" },
      { key: 1, value: "共享" },
    ],
    // 总投资
    investMoneyTypeList: [
      { key: 1, value: "1亿元以下" },
      { key: 2, value: "1亿元及以上" },
      { key: 3, value: "10亿元及以上" },
    ],
    // 备案列表
    beiAnTypeList: [
      { key: 1, value: "经信备案" },
      { key: 2, value: "发改备案" },
    ],
    // 月度
    monthList: [
      { key: 1, value: "1月" },
      { key: 2, value: "2月" },
      { key: 3, value: "3月" },
      { key: 4, value: "4月" },
      { key: 5, value: "5月" },
      { key: 6, value: "6月" },
      { key: 7, value: "7月" },
      { key: 8, value: "8月" },
      { key: 9, value: "9月" },
      { key: 10, value: "10月" },
      { key: 11, value: "11月" },
      { key: 12, value: "12月" },
    ],
    // 季度
    quarterList: [
      { key: 1, value: "第一季度" },
      { key: 2, value: "第二季度" },
      { key: 3, value: "第三季度" },
      { key: 4, value: "第四季度" },
    ],
    industryList: [], // 产业类别
    constructionList: [], // 建设性质
    shelveReasonList: [], // 搁置原因
    allOriginList: [], // 机构街道
    roleList: [], // 角色
    projectStatusList: [
      { key: 1, value: "线索项目" },
      { key: 2, value: "在谈项目" },
      { key: 3, value: "签约项目" },
      { key: 4, value: "落地项目" },
      { key: 5, value: "开工项目" },
      { key: 6, value: "投产项目" },
      { key: 7, value: "搁置项目" },
    ],
    permissionAreaList: [], // 机构街道权限
  },
  getters: {
    // 年度
    yearList() {
      // 近四年
      let year = new Date().getFullYear();
      let yearList = [];
      for (let index = 0; index < 4; index++) {
        let nowYear = year--;
        yearList.push({
          key: nowYear,
          value: nowYear,
        });
      }
      return yearList;
    },
  },
  mutations: {
    SET_INDUSTRI_LIST(state, val) {
      state.industryList = val;
    },
    SET_CONSTRUCTION_LIST(state, val) {
      state.constructionList = val;
    },
    SET_SHELVE_REASON_LIST(state, val) {
      state.shelveReasonList = val;
    },
    SET_ALL_ORIGIN_LIST(state, val) {
      state.allOriginList = val;
    },
    SET_ROLE_LIST(state, val) {
      state.roleList = val;
    },
    SET_PERMISSION_AREA_LIST(state, val) {
      state.permissionAreaList = val;
    },
  },
  actions: {
    // 产业类别
    // async getIndustryList({ commit }) {
    //   const { code, rs } = await getIndustryList();
    //   if (code === 200) {
    //     commit("SET_INDUSTRI_LIST", rs);
    //   }
    // },
    // // 建设性质
    // async getConstructionList({ commit }) {
    //   const { code, rs } = await getConstructionList();
    //   if (code === 200) {
    //     commit("SET_CONSTRUCTION_LIST", rs);
    //   }
    // },
    // // 搁置原因
    // async getShelveReason({ commit }) {
    //   const { code, rs } = await getShelveReason();
    //   if (code === 200) {
    //     commit("SET_SHELVE_REASON_LIST", rs);
    //   }
    // },
    // // 机构街道
    // async getAllOrgList({ commit }) {
    //   const { code, rs } = await getAllOrgList();
    //   if (code === 200) {
    //     commit("SET_ALL_ORIGIN_LIST", rs);
    //   }
    // },
    // // 角色
    // async getRoleList({ commit }) {
    //   const { code, rs } = await getRoleList();
    //   if (code === 200) {
    //     commit("SET_ROLE_LIST", rs);
    //   }
    // },
    // // 机构街道权限
    // async getPermissionAreaList({ commit }) {
    //   const { code, rs } = await getPermissionAreaList();
    //   if (code === 200) {
    //     commit("SET_PERMISSION_AREA_LIST", rs);
    //   }
    // },
  },
};
