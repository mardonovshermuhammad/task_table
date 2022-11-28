import { createRouter, createWebHistory, RouteRecordRaw, } from 'vue-router'
import Menu from "@/layouts/Menu.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Menu,
    meta: {
      public: false,
    },
    children:[
      {
        path: '/',
        name: 'home',
        component: () => import('@/components/UI/Input/formMain.vue')
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('@/components/UI/Table.vue')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import("@/views/Test2.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/layouts/login.vue"),
    meta: {
      public: true,
      whenLogout: true
    }
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(route => route.meta.public);
  const whenLogout = to.matched.some(route => route.meta.whenLogout);
  const hasToken = localStorage.getItem("access")
  if (!isPublic && !hasToken) {
    next({ name: "login" })
  }

  if (whenLogout && hasToken) {
    next({name: "home"})
  }

  next();
})

export default router
