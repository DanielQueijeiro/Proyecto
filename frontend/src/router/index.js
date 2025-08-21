import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import { URL } from '@/api.js'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: () => import('../views/EmpresasView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/empresas/:id/administrar',
      name: 'empresa-admin',
      component: () => import('../views/EmpresaAdminView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: () => import('../views/EmpleadosView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: () => import('../views/ReportesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/404',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    try {
      const resp = await axios.get(`${URL}sesion/estado`)
      if (resp.data.usuario) {
        auth.login(resp.data.usuario)
        return next()
      }
    } catch (e) {
      // ignorar
    }
    return next({ name: 'login' })
  }
  next()
})

export default router
