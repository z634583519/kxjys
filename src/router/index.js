/*
 * @Author: zhao.hu
 * @LastEditors: xuwang.bao
 * @Description: 路由总入口
 * @Props:
 * @Emit:
 * @Date: 2019-02-20 10:21:40
 * @LastEditTime: 2019-05-07 10:10:05
 */

import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/test/HelloWorld'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {/* 主页 */
      path: '/',
      component: () => import('@/views/home/home')
    },
    {/* 登录页 */
      path: '/login',
      component: () => import('@/views/login/login')
    },
    {/* 用户信息 */
      name: 'userInfo',
      path: '/userInfo',
      component: () => import('@/views/user/userInfo')
    },
    {/* 用户订单 */
      path: '/userOrder',
      component: () => import('@/views/user/userOrder')
    },
    {/* 项目详情 */
      name: 'project',
      path: '/project',
      component: () => import('@/views/project/projectDetails'),
      props: true
    },
    {/* 邀请主页 */
      path: '/invitationIndex',
      component: () => import('@/views/user/invitationIndex')
    },
    {/* 邀请链接 */
      path: '/shareLink',
      component: () => import('@/views/user/ShareLink')
    },
    {/* 邀请海报 */
      path: '/invitationPoster',
      component: () => import('@/views/user/InvitationPoster')
    },
    {/* 加入社群 */
      path: '/community',
      component: () => import('@/views/user/Community')
    }
  ]
})
