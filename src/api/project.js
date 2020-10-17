import { axios, baseApi, qs } from "./request";

// 线索项目列表
export function getCaseList(params) {
  return axios.get(`${baseApi}project/caseList`, { params });
}

// 单个线索项目信息
export function getCase(params) {
  return axios.get(`${baseApi}project/getById`, { params });
}

// 谈项目列表
export function getTalkList(params) {
  return axios.get(`${baseApi}project/talkList`, { params });
}

// 申请在谈
export function applyTalking(params) {
  return axios.post(`${baseApi}project/applyTalking`, qs.stringify(params));
}

// 转在谈审核
export function handleApplyTalking(params) {
  return axios.post(
    `${baseApi}project/handleApplyTalking`,
    qs.stringify(params)
  );
}

// 签约项目列表
export function getSignList(params) {
  return axios.get(`${baseApi}project/signList`, { params });
}

// 申请签约
export function applySign(params) {
  return axios.post(`${baseApi}project/applySign`, qs.stringify(params));
}

// 审核处理「申请签约」
export function handleApplySign(params) {
  return axios.post(`${baseApi}project/handleApplySign`, qs.stringify(params));
}

// 落地项目列表
export function getDownList(params) {
  return axios.get(`${baseApi}project/downList`, { params });
}

// 开工项目列表
export function getOpenList(params) {
  return axios.get(`${baseApi}project/openList`, { params });
}

// 投产项目列表
export function getPutInList(params) {
  return axios.get(`${baseApi}project/putInList`, { params });
}

// 转投产
export function applyPutIn(params) {
  return axios.post(`${baseApi}project/applyPutIn`, qs.stringify(params));
}

// 转投产审核
export function handleApplyPutIn(params) {
  return axios.post(`${baseApi}project/handleApplyPutIn`, qs.stringify(params));
}

// 搁置项目列表
export function getShelveList(params) {
  return axios.get(`${baseApi}project/shelveList`, { params });
}

// 搁置项目导出
export function shelveListExport(params) {
  let url = `${baseApi}project/shelveListExport`;
  return axios.get(url, { params, responseType: "blob" });
}

// 取消项目列表
export function getCancelList(params) {
  return axios.get(`${baseApi}project/cancelList`, { params });
}

// 警示项目列表
export function getWarnList(params) {
  return axios.get(`${baseApi}project/warnList`, { params });
}

// 警示项目导出
export function warnListExport(params) {
  let url = `${baseApi}project/warnListExport`;
  return axios.get(url, { params, responseType: "blob" });
}

// 项目状态变更记录
export function getStateChangeList(params) {
  return axios.get(`${baseApi}project/stateChangeList`, { params });
}

// 项目阶段变更记录
export function getProgressChangeList(params) {
  return axios.get(`${baseApi}project/progressChangeList`, { params });
}

// 取消项目
export function cancalProject(params) {
  return axios.post(`${baseApi}project/cancel`, qs.stringify(params));
}

// 复活项目
export function reviveProject(params) {
  return axios.post(`${baseApi}project/revive`, qs.stringify(params));
}

// 复活审核
export function handleRevive(params) {
  return axios.post(`${baseApi}project/handleRevive`, qs.stringify(params));
}

// 搁置项目
export function shelveProject(params) {
  return axios.post(`${baseApi}project/shelve`, qs.stringify(params));
}

// 项目认领
export function pileUpProject(params) {
  return axios.post(`${baseApi}project/pileUp`, qs.stringify(params));
}

// 认领列表
export function getPileUpList(params) {
  return axios.get(`${baseApi}project/pileUpList?`, { params });
}

// 认领审核与指派
export function handleApplyPileUp(params) {
  return axios.post(
    `${baseApi}project/handleApplyPileUp`,
    qs.stringify(params)
  );
}

// 获取单个项目信息
export function getProject(params) {
  return axios.get(`${baseApi}project/get`, { params });
}

// 申请落地
export function applyDown(params) {
  return axios.post(`${baseApi}project/applyDown`, qs.stringify(params));
}

// 审核处理
export function handleApplyDown(params) {
  return axios.post(`${baseApi}project/handleApplyDown`, qs.stringify(params));
}

// 申请开工
export function applyOpenWork(params) {
  return axios.post(`${baseApi}project/applyOpenWork`, qs.stringify(params));
}

// 审核处理「申请开工
export function handleApplyOpenWork(params) {
  return axios.post(
    `${baseApi}project/handleApplyOpenWork`,
    qs.stringify(params)
  );
}

// 导出
export function caseListExport(params) {
  return axios.get(`${baseApi}project/caseList/export`,{params, responseType: "blob",});
}
