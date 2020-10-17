import { axios, baseApi, qs } from "./request";

// 用户列表
export function getUserList(params) {
  return axios.get(`${baseApi}user/list`, { params });
}
// 添加/修改用户
export function addUser(params) {
  return axios.post(`${baseApi}user/save`, qs.stringify(params));
}

// 重置密码
export function resetPwd(params) {
  return axios.get(`${baseApi}user/resetPwd`, { params });
}
// 重置密码
export function delUser(params) {
  return axios.get(`${baseApi}user/del`, { params });
}

// 修改密码
export function editPwd(params) {
  return axios.get(`${baseApi}user/editPwd`, { params });
}

// 所有权限列表
export function getPermissionList() {
  return axios.get(`${baseApi}permission/all`);
}

// 当前用户权限
export function getMyPermission(params) {
  return axios.get(`${baseApi}permission/getMyPer`, { params });
}

// 保存当前用户权限 json
export function saveMyPermission(params) {
  return axios.post(`${baseApi}permission/save`, params);
}
