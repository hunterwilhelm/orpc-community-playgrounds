import type { RouteRecordRaw } from 'vue-router'

export default [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/planets', component: () => import('./views/Planets.vue') },
  { path: '/planets/:id', component: () => import('./views/PlanetDetail.vue') },
  { path: '/create', component: () => import('./views/CreatePlanet.vue') },
  { path: '/signin', component: () => import('./views/SignIn.vue') },
  { path: '/me', component: () => import('./views/Me.vue') },
  { path: '/sse', component: () => import('./views/SSE.vue') },
] as RouteRecordRaw[]
