import { createRouter, createWebHistory } from 'vue-router'
import ApplicationFormView from '../views/ApplicationFormView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'application-form', component: ApplicationFormView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
