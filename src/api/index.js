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
// 查询企业列表
export function getCompanyList(params) {
  return axios.get(`${baseApi}company/list`, { params })
}
// 查询单个企业信息
export function getCompany(params) {
  return axios.get(`${baseApi}company/get`, { params })
}
// 删除企业
export function removeCompany(params) {
  return axios.post(`${baseApi}company/remove`, params)
}
// 保存企业信息
export function saveCompany(params) {
  return axios.post(`${baseApi}company/save`, params)
}
// 保存入驻企业其他信息
export function saveCompanyOther(params) {
  return axios.post(`${baseApi}company/other`, params)
}
// 入驻企业其他信息列表
export function getCompanyOtherList(params) {
  return axios.get(`${baseApi}company/other/list`, { params })
}

/***************************** 数据分析 *************************** */

/***************************** 系统管理 *************************** */
// 保存楼宇信息
export function saveBuild(params) {
  return axios.post(`${baseApi}build/save`, params)
}
// 楼宇列表
export function getBuildList(params) {
  return axios.get(`${baseApi}build/list`, { params })
}
// 删除楼宇
export function removeBuild(params) {
  return axios.post(`${baseApi}build/remove`, params)
}
// 楼宇主页
export function getBuildHome(params) {
  return axios.get(`${baseApi}build/home`, { params })
}
/***************************** 公告管理 *************************** */
// 保存公告
export function saveNotice(params) {
  return axios.post(`${baseApi}notice/save`, params)
}
// 公告列表查询
export function getNoticeList(params) {
  return axios.get(`${baseApi}notice/list`, { params })
}
// 删除公告
export function removeNotice(params) {
  return axios.post(`${baseApi}notice/del`, params)
}
// 查询单个公告信息
export function getNoticeDetail(params) {
  return axios.get(`${baseApi}notice/get`, { params })
}
// 发布公告
export function publishNotice(params) {
  return axios.post(`${baseApi}notice/publish`, params)
}
/***************************** 图片 *************************** */
// 保存公告
export function saveImg(params) {
  return axios.post(`${baseApi}img/save`, params)
}
// 公告列表查询
export function getImgList(params) {
  return axios.get(`${baseApi}img/list`, { params })
}
// 删除公告
export function removeImg(params) {
  return axios.post(`${baseApi}img/del`, params)
}
// 查询单个公告信息
export function getImgDetail(params) {
  return axios.get(`${baseApi}img/get`, { params })
}
// 发布图片
export function publishImg(params) {
  return axios.post(`${baseApi}img/publish`, params)
}
/***************************** 通用 *************************** */
// 上传
export function upload(params) {
  return axios.post(`${baseApi}file/upload`, params)
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
// 返回所有建设类型枚举
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
// 返回所有的民族列表枚举
export function getNationList() {
  return axios.get(`${baseApi}nation/list`)
}
// 国籍列表
export function getCountryList() {
  return axios.get(`${baseApi}country//list`)
}

// 查询所有楼宇（不分页）
export function getBuildAllList() {
  return axios.get(`${baseApi}build/all`)
}
