import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import routes from './routes'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const queryClient = new QueryClient()

app.use(router)
app.use(VueQueryPlugin, { queryClient })
app.mount('#app')
