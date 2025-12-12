import { ORPCError } from '@orpc/server'
import * as z from 'zod'
import { NewPlanetSchema, PlanetSchema, UpdatePlanetSchema, UserSchema } from './schemas'
import { authed, pub } from './orpc'

// Authentication routes
export const signup = pub
  .route({ method: 'POST', path: '/auth/signup', summary: 'Sign up a new user', tags: ['Authentication'] })
  .input(z.object({ name: z.string(), email: z.string().email(), password: z.string() }))
  .output(UserSchema)
  .handler(async ({ input }) => {
    return {
      id: crypto.randomUUID(),
      email: input.email,
      name: input.name,
    }
  })

export const signin = pub
  .route({ method: 'POST', path: '/auth/signin', summary: 'Sign in a user', tags: ['Authentication'] })
  .input(z.object({ email: z.string().email(), password: z.string() }))
  .output(z.object({ token: z.string() }))
  .handler(async () => {
    return { token: 'token' }
  })

export const me = authed
  .route({ method: 'GET', path: '/auth/me', summary: 'Get the current user', tags: ['Authentication'] })
  .output(UserSchema)
  .handler(async ({ context }) => {
    return context.user!
  })

// Planet routes
export const listPlanets = pub
  .route({ method: 'GET', path: '/planets', summary: 'List all planets', tags: ['Planets'] })
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).default(10),
      cursor: z.number().int().min(0).default(0),
    }).default({ limit: 10, cursor: 0 }),
  )
  .output(z.array(PlanetSchema))
  .handler(async ({ input, context }) => {
    return context.db.planets.list(input.limit, input.cursor)
  })

export const findPlanet = pub
  .route({ method: 'GET', path: '/planets/find', summary: 'Find a planet', tags: ['Planets'] })
  .input(z.object({ id: z.number().int().min(1) }))
  .output(PlanetSchema)
  .handler(async ({ input, context }) => {
    const planet = await context.db.planets.find(input.id)
    if (!planet)
      throw new ORPCError('NOT_FOUND', { message: 'Planet not found' })
    return planet
  })

export const createPlanet = authed
  .route({ method: 'POST', path: '/planets', summary: 'Create a planet', tags: ['Planets'] })
  .input(NewPlanetSchema)
  .output(PlanetSchema)
  .handler(async ({ input, context }) => {
    return context.db.planets.create(input, context.user!)
  })

export const updatePlanet = authed
  .route({ method: 'POST', path: '/planets/update', summary: 'Update a planet', tags: ['Planets'] })
  .input(UpdatePlanetSchema)
  .output(PlanetSchema)
  .handler(async ({ input, context }) => {
    const planet = await context.db.planets.find(input.id)
    if (!planet)
      throw new ORPCError('NOT_FOUND', { message: 'Planet not found' })
    return context.db.planets.update(input)
  })

// Export the router as a function (required for contract generation)
export function appRouter() {
  return {
    auth: { signup, signin, me },
    planet: { list: listPlanets, create: createPlanet, find: findPlanet, update: updatePlanet },
  }
}

// THIS IS CRITICAL - Export the TypeScript type for frontend
export type AppRouter = ReturnType<typeof appRouter>

// Export router instance for server
export const router = appRouter()

