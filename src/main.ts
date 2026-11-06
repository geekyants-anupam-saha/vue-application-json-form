import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import './styles.css'

createApp(App).use(createPinia()).use(router).mount('#app')
