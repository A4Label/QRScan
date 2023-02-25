import { createRouter, createWebHistory } from 'vue-router'
import BarcodeListView from '@/views/BarcodeListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'BarcodeList',
      component: BarcodeListView
    }
  ]
})

export default router
