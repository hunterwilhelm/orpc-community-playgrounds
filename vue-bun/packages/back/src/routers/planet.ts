import { ORPCError } from '@orpc/server'
import * as z from 'zod'
import { authed, pub } from '../orpc'
import { NewPlanetSchema, PlanetSchema, UpdatePlanetSchema } from '../schemas/planet'

export const listPlanets = pub
  .route({ method: 'GET', path: '/planets', summary: 'List all planets', tags: ['Planets'] })
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).default(10),
      cursor: z.number().int().min(0).default(0),
    }).default({ limit: 10, cursor: 0 }),
  )
  .output(z.array(PlanetSchema))
  .handler(async ({ input, context }) => context.db.planets.list(input.limit, input.cursor))

export const createPlanet = authed
  .route({ method: 'POST', path: '/planets', summary: 'Create a planet', tags: ['Planets'] })
  .input(NewPlanetSchema)
  .output(PlanetSchema)
  .handler(async ({ input, context }) => context.db.planets.create(input, context.user))

export const findPlanet = pub
  .route({ method: 'GET', path: '/planets/{id}', summary: 'Find a planet', tags: ['Planets'] })
  .input(z.object({ id: z.number().int().min(1) }))
  .output(PlanetSchema)
  .handler(async ({ input, context }) => {
    const planet = await context.db.planets.find(input.id)
    if (!planet)
      throw new ORPCError('NOT_FOUND', { message: 'Planet not found' })
    return planet
  })

export const updatePlanet = authed
  .route({ method: 'PUT', path: '/planets/{id}', summary: 'Update a planet', tags: ['Planets'] })
  .errors({ NOT_FOUND: { message: 'Planet not found', data: z.object({ id: UpdatePlanetSchema.shape.id }) } })
  .input(UpdatePlanetSchema)
  .output(PlanetSchema)
  .handler(async ({ input, context, errors }) => {
    const planet = await context.db.planets.find(input.id)
    if (!planet)
      throw errors.NOT_FOUND({ data: { id: input.id } })
    return context.db.planets.update(input)
  })
