import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [{ path: '/', component: () => import('../views/home.vue') }]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
