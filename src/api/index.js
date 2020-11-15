import { axios, baseApi } from './request'
/***************************** 登录 *************************** */
// 登录
export function login(params) {
  return axios.post(`${baseApi}login`, params)
}

// 用户列表
export function getUserList(params) {
  return axios.post(`${baseApi}user/list`, params)
}

// 添加用户
export function addUser(params) {
  return axios.post(`${baseApi}user/save`, params)
}

// 删除用户
export function delUser(params) {
  return axios.post(`${baseApi}user/del`, params)
}

// 重置密码
export function resetPwd(params) {
  return axios.post(`${baseApi}user/resetPwd`, params)
}

/***************************** 信息管理 *************************** */
// 楼宇信息列表
export function getBuildList() {
  //   return axios.get(`${baseApi}project/caseList`, { params })
}

/***************************** 数据分析 *************************** */

/***************************** 系统管理 *************************** */

/***************************** 公告管理 *************************** */


/***************************** 通用 *************************** */
// 上传
export function upload(params) {
  return axios.post(`${baseApi}file/upload`, params);
}
// 获取省市区数据
export function getRegionList() {
  return axios.get(`${baseApi}region/list`)
}
// 获取所有角色列表
export function getRoleList() {
  return axios.get(`${baseApi}role/list`)
}
// 获取所有的机构列表
export function getAllOrgList() {
  return axios.get(`${baseApi}getAllOrgList`)
}
// 获取当前登录用户有权限的街道/镇
export function getPermissionAreaList() {
  return axios.get(`${baseApi}getPermissionAreaList`)
}
// 返回所有的产业列表枚举
export function getIndustryList() {
  return axios.get(`${baseApi}industry/list`)
}
// 
export function getConstructionList() {
  return axios.get(`${baseApi}construction/list`)
}
// 返回所有的企业属地性质枚举
export function getBelongList() {
  return axios.get(`${baseApi}belong/list`)
}
// 返回所有的证件类型枚举
export function getCardTypeList() {
  return axios.get(`${baseApi}cardType/list`)
}
// 返回所有的学历枚举
export function getEducationList() {
  return axios.get(`${baseApi}education/list`)
}
// 返回所有的政治面貌枚举
export function getPoliticalList() {
  return axios.get(`${baseApi}political/list`)
}
// 返回所有的人才类别枚举
export function getAbilityList() {
  return axios.get(`${baseApi}ability/list`)
}
// 返回所有的企业性质枚举
export function getCompanyTypeList() {
  return axios.get(`${baseApi}companyType/list`)
}
// 
export function getNationList() {
  return axios.get(`${baseApi}nation/list`)
}