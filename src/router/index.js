import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    perms: ['GET /aaa','POST /bbb']     will control the page perms (you can set multiple perms)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 首页中相应的路由配置项
export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'userManage',
    meta: {
      title: '用户管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/user'),
        name: 'user',
        meta: {
          perms: ['GET /admin/user/list'],
          title: '会员管理',
          noCache: true
        }
      },
      {
        path: 'address',
        component: () => import('@/views/user/address'),
        name: 'address',
        meta: {
          perms: ['GET /admin/address/list'],
          title: '收货地址',
          noCache: true
        }
      },
      {
        path: 'collect',
        component: () => import('@/views/user/collect'),
        name: 'collect',
        meta: {
          perms: ['GET /admin/collect/list'],
          title: '会员收藏',
          noCache: true
        }
      },
      {
        path: 'footprint',
        component: () => import('@/views/user/footprint'),
        name: 'footprint',
        meta: {
          perms: ['GET /admin/footprint/list'],
          title: '会员足迹',
          noCache: true
        }
      },
      {
        path: 'history',
        component: () => import('@/views/user/history'),
        name: 'history',
        meta: {
          perms: ['GET /admin/history/list'],
          title: '搜索历史',
          noCache: true
        }
      },
      {
        path: 'feedback',
        component: () => import('@/views/user/feedback'),
        name: 'feedback',
        meta: {
          perms: ['GET /admin/feedback/list'],
          title: '意见反馈',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/mall',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'mallManage',
    meta: {
      title: '商场管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'region',
        component: () => import('@/views/mall/region'),
        name: 'region',
        meta: {
          title: '行政区域',
          noCache: true
        }
      },
      {
        path: 'brand',
        component: () => import('@/views/mall/brand'),
        name: 'brand',
        meta: {
          perms: ['GET /admin/brand/list', 'POST /admin/brand/create', 'GET /admin/brand/read', 'POST /admin/brand/update', 'POST /admin/brand/delete'],
          title: '品牌制造商',
          noCache: true
        }
      },
      {
        path: 'category',
        component: () => import('@/views/mall/category'),
        name: 'category',
        meta: {
          perms: ['GET /admin/category/list', 'POST /admin/category/create', 'GET /admin/category/read', 'POST /admin/category/update', 'POST /admin/category/delete'],
          title: '商品类目',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/mall/order'),
        name: 'order',
        meta: {
          perms: ['GET /admin/order/list', 'GET /admin/order/detail', 'POST /admin/order/ordership', 'POST /admin/order/orderrefund', 'POST /admin/order/orderreply'],
          title: '订单管理',
          noCache: true
        }
      },
      {
        path: 'issue',
        component: () => import('@/views/mall/issue'),
        name: 'issue',
        meta: {
          perms: ['GET /admin/issue/list', 'POST /admin/issue/create', 'GET /admin/issue/read', 'POST /admin/issue/update', 'POST /admin/issue/delete'],
          title: '通用问题',
          noCache: true
        }
      },
      {
        path: 'keyword',
        component: () => import('@/views/mall/keyword'),
        name: 'keyword',
        meta: {
          perms: ['GET /admin/keyword/list', 'POST /admin/keyword/create', 'GET /admin/keyword/read', 'POST /admin/keyword/update', 'POST /admin/keyword/delete'],
          title: '关键词',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'goodsManage',
    meta: {
      title: '商品管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/goods/list'),
        name: 'goodsList',
        meta: {
          perms: ['GET /admin/goods/list', 'POST /admin/goods/delete'],
          title: '商品列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/goods/create'),
        name: 'goodsCreate',
        meta: {
          perms: ['POST /admin/goods/create'],
          title: '商品上架',
          noCache: true
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/goods/edit'),
        name: 'goodsEdit',
        meta: {
          perms: ['GET /admin/goods/detail', 'POST /admin/goods/update', 'POST /admin/goods/catAndBrand'],
          title: '商品编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'comment',
        component: () => import('@/views/goods/comment'),
        name: 'goodsComment',
        meta: {
          perms: ['GET /admin/comment/list', 'POST /admin/comment/delete'],
          title: '商品评论',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/pro',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'proManage',
    meta: {
      title: '项目管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/pro/list'),
        name: 'proList',
        meta: {
          perms: ['GET /admin/pro/list', 'POST /admin/pro/delete'],
          title: '项目列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/pro/create'),
        name: 'proCreate',
        meta: {
          perms: ['POST /admin/pro/create'],
          title: '项目维护',
          noCache: true
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/pro/edit'),
        name: 'proEdit',
        meta: {
          perms: ['GET /admin/pro/detail', 'POST /admin/pro/update', 'POST /admin/pro/catAndBrand'],
          title: '项目编辑',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/proUser',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'proUserManage',
    meta: {
      title: '人员管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/proUser/list'),
        name: 'proUserList',
        meta: {
          perms: ['GET /admin/proUser/list', 'POST /admin/proUser/delete'],
          title: '人员列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/proUser/create'),
        name: 'proUserCreate',
        meta: {
          perms: ['POST /admin/proUser/create'],
          title: '人员维护',
          noCache: true
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/proUser/edit'),
        name: 'proUserEdit',
        meta: {
          perms: ['GET /admin/proUser/detail', 'POST /admin/proUser/update', 'POST /admin/proUser/catAndBrand'],
          title: '人员编辑',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/proTask',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'proTaskManage',
    meta: {
      title: '任务处理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/proTask/list'),
        name: 'proTaskList',
        meta: {
          perms: ['GET /admin/proTask/list', 'GET /admin/pro/detailOnlyPro', 'POST /admin/proTask/delete'],
          title: '任务列表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'promotionManage',
    meta: {
      title: '推广管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'ad',
        component: () => import('@/views/promotion/ad'),
        name: 'ad',
        meta: {
          perms: ['GET /admin/ad/list', 'POST /admin/ad/create', 'GET /admin/ad/read', 'POST /admin/ad/update', 'POST /admin/ad/delete'],
          title: '广告管理',
          noCache: true
        }
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'coupon',
        meta: {
          perms: ['GET /admin/coupon/list', 'POST /admin/coupon/create', 'POST /admin/coupon/update', 'POST /admin/coupon/delete'],
          title: '优惠券管理',
          noCache: true
        }
      },
      {
        path: 'couponDetail',
        component: () => import('@/views/promotion/couponDetail'),
        name: 'couponDetail',
        meta: {
          perms: ['GET /admin/coupon/list', 'GET /admin/coupon/listuser'],
          title: '优惠券详情',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'topic',
        component: () => import('@/views/promotion/topic'),
        name: 'topic',
        meta: {
          perms: ['GET /admin/topic/list', 'POST /admin/topic/create', 'GET /admin/topic/read', 'POST /admin/topic/update', 'POST /admin/topic/delete'],
          title: '专题管理',
          noCache: true
        }
      },
      {
        path: 'groupon-rule',
        component: () => import('@/views/promotion/grouponRule'),
        name: 'grouponRule',
        meta: {
          perms: ['GET /admin/groupon/list', 'POST /admin/groupon/create', 'POST /admin/groupon/update', 'POST /admin/groupon/delete'],
          title: '团购规则',
          noCache: true
        }
      },
      {
        path: 'groupon-activity',
        component: () => import('@/views/promotion/grouponActivity'),
        name: 'grouponActivity',
        meta: {
          perms: ['GET /admin/groupon/listRecord'],
          title: '团购活动',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'sysManage',
    meta: {
      title: '系统管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/sys/admin'),
        name: 'admin',
        meta: {
          perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update', 'POST /admin/admin/delete'],
          title: '管理员',
          noCache: true
        }
      },
      {
        path: 'log',
        component: () => import('@/views/sys/log'),
        name: 'log',
        meta: {
          perms: ['GET /admin/log/list'],
          title: '操作日志',
          noCache: true
        }
      },
      {
        path: 'role',
        component: () => import('@/views/sys/role'),
        name: 'role',
        meta: {
          perms: ['GET /admin/role/list', 'POST /admin/role/create', 'POST /admin/role/update', 'POST /admin/role/delete', 'GET /admin/role/permissions', 'POST /admin/role/permissions'],
          title: '角色管理',
          noCache: true
        }
      },
      {
        path: 'os',
        component: () => import('@/views/sys/os'),
        name: 'os',
        meta: {
          perms: ['GET /admin/storage/list', 'POST /admin/storage/create', 'POST /admin/storage/update', 'POST /admin/storage/delete'],
          title: '对象存储',
          noCache: true
        }
      }
    ]
  },
  // --此处的path和文件夹的路径一一对应，必须保证存在相应的路径
  // -- 一级目录示例
  // -- 侧边栏已经帮助您做出判断。当您将子项路由到超过> 1个路由的声明之下时，它将自动成为嵌套模式。如果子路由完全等于1，则子路由默认显示为侧边栏中的根路由。如果您不想，可以通过设置alwaysShow: true根路由来禁用此功能。
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'admin',
        component: () => import('@/views/sys/admin'),
        name: 'admin',
        meta: {
          title: '管理员',
          icon: 'icon'
        }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'configManage',
    meta: {
      title: '配置管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'mall',
        component: () => import('@/views/config/mall'),
        name: 'configMall',
        meta: {
          perms: ['GET /admin/config/mall', 'POST /admin/config/mall'],
          title: '商场配置',
          noCache: true
        }
      },
      {
        path: 'express',
        component: () => import('@/views/config/express'),
        name: 'configExpress',
        meta: {
          perms: ['GET /admin/config/express', 'POST /admin/config/express'],
          title: '运费配置',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/config/order'),
        name: 'configOrder',
        meta: {
          perms: ['GET /admin/config/order', 'POST /admin/config/order'],
          title: '订单配置',
          noCache: true
        }
      },
      {
        path: 'wx',
        component: () => import('@/views/config/wx'),
        name: 'configWx',
        meta: {
          perms: ['GET /admin/config/wx', 'POST /admin/config/wx'],
          title: '小程序配置',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/stat',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'statManage',
    meta: {
      title: '统计报表',
      icon: 'chart'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/stat/user'),
        name: 'statUser',
        meta: {
          perms: ['GET /admin/stat/user'],
          title: '用户统计',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/stat/order'),
        name: 'statOrder',
        meta: {
          perms: ['GET /admin/stat/order'],
          title: '订单统计',
          noCache: true
        }
      },
      {
        path: 'goods',
        component: () => import('@/views/stat/goods'),
        name: 'statGoods',
        meta: {
          perms: ['GET /admin/stat/goods'],
          title: '商品统计',
          noCache: true
        }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'externalLink',
    meta: {
      title: '外链',
      icon: 'link'
    },
    children: [
      {
        path: 'https://cloud.tencent.com/product/cos',
        meta: { title: '腾讯云存储', icon: 'link' }
      },
      {
        path: 'https://cloud.tencent.com/product/sms',
        meta: { title: '腾讯云短信', icon: 'link' }
      },
      {
        path: 'https://pay.weixin.qq.com/index.php/core/home/login',
        meta: { title: '微信支付', icon: 'link' }
      },
      {
        path: 'https://mpkf.weixin.qq.com/',
        meta: { title: '小程序客服', icon: 'link' }
      },
      {
        path: 'https://www.alibabacloud.com/zh/product/oss',
        meta: { title: '阿里云存储', icon: 'link' }
      },
      {
        path: 'https://www.qiniu.com/products/kodo',
        meta: { title: '七牛云存储', icon: 'link' }
      },
      {
        path: 'http://www.kdniao.com/api-track',
        meta: { title: '快递鸟', icon: 'link' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    children: [
      {
        path: 'password',
        component: () => import('@/views/profile/password'),
        name: 'password',
        meta: { title: '修改密码', noCache: true }
      }
    ],
    hidden: true
  },

  // 最后声明 404 页面
  { path: '*', redirect: '/404', hidden: true }
]
