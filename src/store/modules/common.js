import {
  getRegionList,
  getRoleList,
  getAllOrgList,
  getPermissionAreaList,
  getIndustryList,
  getConstructionList,
  getBelongList,
  getCardTypeList,
  getEducationList,
  getPoliticalList,
  getAbilityList,
  getCompanyTypeList,
  getNationList,
  getCountryList,
  getBuildAllList,
  getBuildFloorList,
  getBuildRoomList,
  getYearList,
  getHasPermissionList,
  getRoomTypeList
} from '@/api/index'
export default {
  namespaced: true,
  state: {
    // 主楼副楼
    buildTypeList: [
      { key: 1, value: '主楼' },
      { key: 2, value: '副楼' },
    ],
    // 性别
    genderList: [
      { key: 1, value: '男' },
      { key: 2, value: '女' },
    ],
    // 所属权
    workRoomTypeList: [
      { key: 0, value: '无' },
      { key: 1, value: '自住' },
      { key: 2, value: '租赁' },
    ],
    // 房屋性质
    houseNatureList: [
      { key: 1, value: '自购' },
      { key: 2, value: '租赁' },
    ],
    // 是否
    whetherList: [
      { key: 1, value: '是' },
      { key: 0, value: '否' },
    ],
    noticeTypeList: [
      { key: 1, value: '政策' },
      { key: 2, value: '通知' },
      // { key: 3, value: '图片' },
    ],
    regionList: [], // 省市区数据
    roleList: [], // 获取所有角色列表
    allOrgList: [], // 获取所有的机构列表
    permissionAreaList: [], // 获取当前登录用户有权限的街道/镇
    industryList: [], // 返回所有的产业列表枚举
    constructionList: [], //返回所有建设类型枚举
    belongList: [], // 返回所有的企业属地性质枚举
    carTypeList: [], // 返回所有的证件类型枚举
    educationList: [], // 返回所有的学历枚举
    politicalList: [], // 返回所有的政治面貌枚举
    abilityList: [], // 返回所有的人才类别枚举
    companyTypeList: [], // 返回所有的企业性质枚举
    nationList: [], // 民族列表枚举
    countryList: [], // 国籍
    buildingAllList: [], // 楼宇列表（不分页）
    buildingFloorList: [], // 楼层
    buildingRoomList: [], // 房间号
    yearList: [],
    permissionList: [], // 权限按钮
    roomTypeList: [], // 房屋状况
    // 月度
    monthList: [
      { key: 1, value: '1月' },
      { key: 2, value: '2月' },
      { key: 3, value: '3月' },
      { key: 4, value: '4月' },
      { key: 5, value: '5月' },
      { key: 6, value: '6月' },
      { key: 7, value: '7月' },
      { key: 8, value: '8月' },
      { key: 9, value: '9月' },
      { key: 10, value: '10月' },
      { key: 11, value: '11月' },
      { key: 12, value: '12月' },
    ],
  },
  getters: {
    // 年度
    yearList() {
      // 近四年
      let year = new Date().getFullYear()
      let yearList = []
      for (let index = 0; index < 4; index++) {
        let nowYear = year--
        yearList.push({
          key: nowYear,
          value: nowYear,
        })
      }
      return yearList
    },
  },
  mutations: {
    SET_REGION_LIST(state, val) {
      state.regionList = val
    },

    SET_ROLE_LIST(state, val) {
      state.roleList = val
    },
    SET_ALLORG_LIST(state, val) {
      state.allOrgList = val
    },
    SET_PERMISSION_AREA_LIST(state, val) {
      state.permissionAreaList = val
    },
    SET_INDUSTRY_LIST(state, val) {
      state.industryList = val
    },
    SET_CONSTRUCTION_LIST(state, val) {
      state.constructionList = val
    },
    SET_BELONG_LIST(state, val) {
      state.belongList = val
    },
    SET_CAR_TYPE_LIST(state, val) {
      state.carTypeList = val
    },
    SET_EDUCATION_LIST(state, val) {
      state.educationList = val
    },
    SET_POLITICAL_LIST(state, val) {
      state.politicalList = val
    },
    SET_ABILITY_LIST(state, val) {
      state.abilityList = val
    },
    SET_COMPANY_TYPE_LIST(state, val) {
      state.companyTypeList = val
    },
    SET_NATION_LIST(state, val) {
      state.nationList = val
    },
    SET_COUNTRY_LIST(state, val) {
      state.countryList = val
    },
    SET_BUILDING_ALL_LIST(state, val) {
      state.buildingAllList = val
    },
    SET_BUILDING_FLOOR_LIST(state, val) {
      state.buildingFloorList = val
    },
    SET_BUILDING_ROOM_LIST(state, val) {
      state.buildingRoomList = val
    },
    SET_YEAR_LIST(state, val) {
      state.yearList = val
    },
    SET_PERMISSION_LIST(state, val) {
      state.permissionList = val
    },
    SET_ROOM_TYPE_LIST(state, val) {
      state.roomTypeList = val
    }
  },
  actions: {
    // 获取省市区数据
    async getRegionList({ commit }) {
      const { code, rs } = await getRegionList()
      if (code === 200) {
        commit('SET_REGION_LIST', rs)
      }
    },
    // 获取所有角色列表
    async getRoleList({ commit }) {
      const { code, rs } = await getRoleList()
      if (code === 200) {
        commit('SET_ROLE_LIST', rs)
      }
    },
    // 获取所有的机构列表
    async getAllOrgList({ commit }) {
      const { code, rs } = await getAllOrgList()
      if (code === 200) {
        commit('SET_ALLORG_LIST', rs)
      }
    },
    // 获取当前登录用户有权限的街道/镇
    async getPermissionAreaList({ commit }) {
      const { code, rs } = await getPermissionAreaList()
      if (code === 200) {
        commit('SET_PERMISSION_AREA_LIST', rs)
      }
    },
    // 返回所有的产业列表枚举
    async getIndustryList({ commit }) {
      const { code, rs } = await getIndustryList()
      if (code === 200) {
        commit('SET_INDUSTRY_LIST', rs)
      }
    },
    // 返回所有建设类型枚举
    async getConstructionList({ commit }) {
      const { code, rs } = await getConstructionList()
      if (code === 200) {
        commit('SET_CONSTRUCTION_LIST', rs)
      }
    },
    // 返回所有的企业属地性质枚举
    async getBelongList({ commit }) {
      const { code, rs } = await getBelongList()
      if (code === 200) {
        commit('SET_BELONG_LIST', rs)
      }
    },
    // 返回所有的证件类型枚举
    async getCardTypeList({ commit }) {
      const { code, rs } = await getCardTypeList()
      if (code === 200) {
        commit('SET_CAR_TYPE_LIST', rs)
      }
    },
    // 返回所有的学历枚举
    async getEducationList({ commit }) {
      const { code, rs } = await getEducationList()
      if (code === 200) {
        commit('SET_EDUCATION_LIST', rs)
      }
    },
    // 返回所有的政治面貌枚举
    async getPoliticalList({ commit }) {
      const { code, rs } = await getPoliticalList()
      if (code === 200) {
        commit('SET_POLITICAL_LIST', rs)
      }
    },
    // 返回所有的人才类别枚举
    async getAbilityList({ commit }) {
      const { code, rs } = await getAbilityList()
      if (code === 200) {
        commit('SET_ABILITY_LIST', rs)
      }
    },
    // 返回所有的企业性质枚举
    async getCompanyTypeList({ commit }) {
      const { code, rs } = await getCompanyTypeList()
      if (code === 200) {
        commit('SET_COMPANY_TYPE_LIST', rs)
      }
    },
    // 返回所有的民族列表枚举
    async getNationList({ commit }) {
      const { code, rs } = await getNationList()
      if (code === 200) {
        commit('SET_NATION_LIST', rs)
      }
    },
    // 返回所有的国籍列表
    async getCountryList({ commit }) {
      const { code, rs } = await getCountryList()
      if (code === 200) {
        commit('SET_COUNTRY_LIST', rs)
      }
    },
    //  查询所有楼宇（不分页）
    async getBuildAllList({ commit }) {
      const { code, rs } = await getBuildAllList()
      if (code === 200) {
        commit('SET_BUILDING_ALL_LIST', rs)
      }
    },
    //  查询楼层
    async getBuildFloorList({ commit }, params) {
      const { code, rs } = await getBuildFloorList(params)
      if (code === 200) {
        commit('SET_BUILDING_FLOOR_LIST', rs || [])
      }
    },
    //  查询房间号
    async getBuildRoomList({ commit }, params) {
      const { code, rs } = await getBuildRoomList(params)
      if (code === 200) {
        commit('SET_BUILDING_ROOM_LIST', rs || [])
      }
    },
    // 年份
    async getYearList({ commit }) {
      const { code, rs } = await getYearList()
      if (code === 200) {
        commit('SET_YEAR_LIST', rs || [])
      }
    },
    // 权限按钮
    async getHasPermissionList({ commit }) {
      const { code, rs } = await getHasPermissionList()
      if (code === 200) {
        commit('SET_PERMISSION_LIST', rs)
      }
    },
    // 房屋性质
    async getRoomTypeList({ commit }) {
      const { code, rs } = await getRoomTypeList()
      if (code === 200) {
        commit('SET_ROOM_TYPE_LIST', rs)
      }
    }
  },
}
