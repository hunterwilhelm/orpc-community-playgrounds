import { me, signin, signup } from './routers/auth'
import { createPlanet, findPlanet, listPlanets, updatePlanet } from './routers/planet'
import { sse } from './routers/sse'

export const router = {
  auth: { signup, signin, me },
  planet: { list: listPlanets, create: createPlanet, find: findPlanet, update: updatePlanet },
  sse,
}

export type AppRouter = typeof router
