import { axios, baseApi, qs } from "./request";

// 登陆
export function login(params) {
  return axios.post(`${baseApi}login`, params);
}

// 省市区
export function getRegionList() {
  return axios.get(`${baseApi}region/list`);
}

// 当前登录用户有权限的街道/镇
export function getPermissionAreaList(params) {
  return axios.get(`${baseApi}getPermissionAreaList`, { params });
}

// 获取某个乡镇下的人员列表
export function getPermissionUserList(params) {
  return axios.get(`${baseApi}getPermissionUserList`, { params });
}

// 产业列表枚举
export function getIndustryList() {
  return axios.get(`${baseApi}industry/list`);
}

// 建设性质列表枚举
export function getConstructionList() {
  return axios.get(`${baseApi}construction/list`);
}

// 上传
export function upload(params) {
  return axios.post(`${baseApi}file/upload`, params);
}

// 新增进展记录
export function addProgress(params) {
  return axios.post(`${baseApi}progress/add`, qs.stringify(params));
}

// 获取项目进展记录
export function getProgressList(params) {
  return axios.get(`${baseApi}progress/list`, { params });
}

// 搁置原因列表枚举
export function getShelveReason() {
  return axios.get(`${baseApi}shelveReason/list`);
}

// 所有的机构列表
export function getAllOrgList() {
  return axios.get(`${baseApi}getAllOrgList`);
}

// 编辑签约项目信息
export function signEdit(params) {
  return axios.post(`${baseApi}sign/edit`, qs.stringify(params));
}

// 数据
export function getIndexStepList() {
  return axios.get(`${baseApi}index/indexStepList`);
}
// 线索项目排行榜-各乡镇
export function getCaseCountByArea() {
  return axios.get(`${baseApi}index/caseCountByArea`);
}

// 线索项目排行榜-各驻点分队
export function getCaseCountByOutTeam() {
  return axios.get(`${baseApi}index/caseCountByOutTeam`);
}

// 签约项目排行榜
export function getSignRankList() {
  return axios.get(`${baseApi}index/signRankList`);
}

// 落地项目排行榜
export function getDownRankList() {
  return axios.get(`${baseApi}index/downRankList`);
}

// 所属角色
export function getRoleList() {
  return axios.get(`${baseApi}role/list`);
}

// 查询某个项目的报表数据
export function geTaxtByProject(params) {
  return axios.get(`${baseApi}tax/getByProject`, { params });
}

// 保存/编辑每月报表
export function addTax(params) {
  return axios.post(`${baseApi}tax/add`, qs.stringify(params));
}

// 税收列表导出
export function exportTax(params) {
  let url = `${baseApi}tax/export`;
  return axios.get(url, { params, responseType: "blob" });
}

// 代办中心
export function getTodoList(params) {
  let url = `${baseApi}todoList`;
  return axios.get(url, { params });
}
