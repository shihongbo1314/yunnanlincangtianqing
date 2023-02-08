import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Empty from '@/components/Empty.vue'
import index from '@/views/index.vue'
import yujing from '@/views/yujing.vue'
import analyse from '@/views/analyse.vue'
import shadowjob from '@/views/shadowjob.vue'
import wxyt from '@/views/wxyt.vue'
import userSystem from '@/views/userSystem.vue'
import product from '@/views/productNEW.vue'
// import index from '../views/index.vue'

import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/common.css'
import '../assets/css/elementuicolor.css'
import Element from 'element-ui';

import * as L from 'leaflet'


Vue.config.productionTip = false;
Vue.L = Vue.prototype.$L = L
Vue.prototype.$baseIP = 'http://125.124.168.245:31081/'

Vue.use(Element, { size: 'small' });

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: '主页',
    component: Home,
    children: [
      { path: "/", component: index },
      { path: "/analyse", component: analyse },
      { path: "/shadowjob", component: shadowjob }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/yujing',
    // name: '预警统计',
    component: Home,
    children: [
      { path: "/yujing", component: yujing }
    ]
  },
  {
    path: '/empty',
    name: '空页面',
    component: Home,
    children: [
      { path: "/empty", component: () => import('@/components/Empty.vue') }
    ]
  },
  {
    path: '/wxyt',
    // name: '卫星云图',
    component: Home,
    children: [
      { path: "/wxyt", component: wxyt }
    ]
  },
  {
    path: '/workSystem',
    // name: '卫星云图',
    component: Home,
    children: [
      { path: "/workSystem",component: () => import('@/views/workSystem.vue')}
    ]
  },
  {
    path: '/userSystem',
    // name: '用户管理',
    component: Home,
    children: [
      { path: "/userSystem", component: userSystem }
    ]
  },
  // {


  //   path: '/suitability',
  //   // name: '指标管理',
  //   component: Home,
  //   children: [
  //     { path: "/suitability", component: ()=> import('@/views/suitability') }
  //   ]
  // },
{path: '/HydropowerStation',
    // name: '水电站流域',
    component: Home,
    children: [
      { path: "/HydropowerStation", component: () => import('@/views/HydropowerStation') }
    ]
  },
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: { title: "产品制作" },
    children: [
      { path: "/pdfProduct", name: "PdfProduct", component: product, meta: { title: "旬月服务专报" } },
      {
        path: "/txtProduct",
        name: "txtProduct",
        component: () => import('@/views/txtProduct.vue'),
        meta: { title: "气象服务产品" },
        children: [
          { path: "forecast24City", name: "Forecast24City", component: () => import('@/components/txtProduct/Forecast24City1'), meta: { title: "未来24小时城市天气预报" } },
          { path: "early8Forecast", name: "Early8Forecast", component: () => import('@/components/txtProduct/Early8Forecast'), meta: { title: "临沧早8点预报图" } },
          { path: "forecast24County", name: "Forecast24County", component: () => import('@/components/txtProduct/Forecast24County'), meta: { title: "未来24小时临沧市乡镇预报" } },
          { path: "forecastWeekend", name: "ForecastWeekend", component: () => import('@/components/txtProduct/txtEditorYi'), meta: { title: "周末天气预报" } },
          { path: "forecastOneWeek", name: "ForecastOneWeek", component: () => import('@/components/txtProduct/txtEditorEr'), meta: { title: "未来一周天气预报" } },
          { path: "forecast7Day", name: "Forecast7Day", component: () => import('@/components/txtProduct/txtEditorSan'), meta: { title: "未来7天天气预报" } },
          { path: "liveNotification", name: "LiveNotification", component: () => import('@/components/txtProduct/txtEditorSi'), meta: { title: "实况通报信息" } },
          {path:"supporterManuscripts",name:"SupporterManuscripts",component: ()=> import('@/components/txtProduct/txtEditorWu'),meta:{title:"主持人稿件"}},
          { path: "forecast7DayStation", name: "Forecast7DayStation", component: () => import('@/components/txtProduct/txtEditorStation'), meta: { title: "小水电站流域“未来一周天气预报”" } },
        ]
      },
    ]
  },
  {
    path: '/txtProductSend',
    name: 'TxtProductSend',
    component: Home,
    children: [
      { path: "/txtProductSend", component: () => import('@/views/txtProductSend'), name: "文本服务产品" }
    ]
  },
  {
    path: '/msgGroup',
    name: 'MsgGroup',
    component: Home,
    children: [
      { path: "/msgGroup", component: () => import('@/views/msgGroup.vue'), name: "短信群组管理" }
    ]
  },
  {
    path: '/workPoint',
    name: 'workPoint',
    component: Home,
    children: [
      { path: "/workPoint", component: () => import('@/components/workPoint/config.vue'), name: "作业点管理" }
    ]
  },
  {
    path: '/dataQueryStatistics',
    name: '数据查询与统计',
    component: Home,
    children: [
      { path: "/rainRate", component: () => import('@/views/rainRate'), name: "降雨概率统计" },
      { path: "/compare", component: () => import('@/views/HistoryCompare'), name: "历年对比" },
      { path: "/stationExtremum", component: () => import('@/views/StationExtremum'), name: "站点历史极值" },
      { path: "/windRose", component: () => import('@/views/windRose'), name: "风向风速玫瑰图" },
      { path: "/geoHazard", component: () => import('@/views/geoHazard'), name: "地质灾害预报图" },
      /* { path: "/guideProduct", component: () => import('@/views/guideProduct'), name: "指导预报产品" }, */
      { path: "/suitabilityModel", component: () => import('@/components/suitability/allSuitability'), name: "适宜度模型" },
      { path: "/radarHistory", component: () => import('@/views/Radarhistory'), name: "雷达历史数据" },
    ]
  }
]

const router = new VueRouter({
  routes
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router