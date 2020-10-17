import { axios, baseApi, qs } from "./request";

// 新增线索信息
export function addCase(params) {
  return axios.post(`${baseApi}case/add`, qs.stringify(params));
}

// 编辑线索信息
export function updateCase(params) {
  return axios.post(`${baseApi}case/edit`, qs.stringify(params));
}
