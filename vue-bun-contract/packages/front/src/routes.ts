import type { RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'
import Planets from './views/Planets.vue'
import PlanetDetail from './views/PlanetDetail.vue'
import CreatePlanet from './views/CreatePlanet.vue'
import SignIn from './views/SignIn.vue'
import Me from './views/Me.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/planets', name: 'Planets', component: Planets },
  { path: '/planets/new', name: 'CreatePlanet', component: CreatePlanet },
  { path: '/planets/:id', name: 'PlanetDetail', component: PlanetDetail },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/me', name: 'Me', component: Me },
]

export default routes

