import http from '@/axios/'

// 示例
export function test (data) {
  return http({
    url: '/role/list',
    method: 'post',
    data
  })
}
// 登录注册
export function login (data) {
  return http({
    url: '/kx/project/login',
    method: 'post',
    data
  })
}
// 获取用户额度
export function getUserAmount (data) {
  return http({
    url: '/kx/userCenter/myQuota',
    method: 'get',
    data
  })
}
// 获取项目列表
export function getProjectList (data) {
  return http({
    url: '/kx/project/projectList',
    method: 'post',
    data
  })
}
// 获取项目详情
export function getProjectInfo (data) {
  return http({
    url: '/kx/project/projectInfo',
    method: 'get',
    params: data
  })
}
// 获取用户邀请数
export function getUserRecommend () {
  return http({
    url: '/kx/userCenter/userRecommend',
    method: 'post'
  })
}
// 获取用户预约list
export function getUserOrder () {
  return http({
    url: '/kx/userCenter/myBuyList',
    method: 'post'
  })
}
// 用户撤单
export function getUserRevoke (data) {
  return http({
    url: '/kx/userCenter/refund',
    method: 'post',
    data
  })
}
// 用户购买预约
export function userBuy (data) {
  return http({
    url: '/kx/userCenter/userBuy',
    method: 'post',
    data
  })
}
// 获取验证码
export function getPhoneCode (data) {
  return http({
    url: '/kx/project/sendCode',
    method: 'post',
    data
  })
}
// 获取邀请链接
export function getInvitationLink () {
  return http({
    url: '/kx/userCenter/userUrl',
    method: 'post'
  })
}
