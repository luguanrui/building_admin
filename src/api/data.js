import { axios, baseApi } from "./request";

// 全县项目产业占比
export function allAreaIndustry(params) {
  return axios.get(`${baseApi}data/allAreaIndustry`, { params });
}

// 全县项目产业占比导出
export function allAreaIndustryExport(params) {
  const url = `${baseApi}data/allAreaIndustry/export`;
  return axios.get(url, { params, responseType: "blob" });
}

// 全县项目产业占比
export function columnar(params) {
  return axios.get(`${baseApi}data/columnar`, { params });
}

// 全县本年度项目信息汇总表
export function sumAggr(params) {
  return axios.get(`${baseApi}data/sumAggr`, { params });
}

// 全县本年度项目信息汇总表导出
export function sumAggrExport(params) {
  const url = `${baseApi}data/sumAggr/export`;
  return axios.get(url, { params, responseType: "blob" });
}
// 四率表
export function getPercent(params) {
  return axios.get(`${baseApi}data/tonglu/percent4`, { params });
}

// 四率表导出
export function percentExport(params) {
  return axios.get(`${baseApi}data/tonglu/percent4/export`, {
    params,
    responseType: "blob",
  });
}

// 汇总表
export function getDataQuery(params) {
  return axios.get(`${baseApi}data/query`, { params });
}
// 汇总表导出
export function queryExport(params) {
  const url = `${baseApi}data/query/export`;
  return axios.get(url, { params, responseType: "blob" });
}
